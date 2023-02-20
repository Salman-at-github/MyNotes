// API FOR SIGNUP AND SIGNIN

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
// bcrypt for password hashing and adding salt:
const bcrypt = require('bcryptjs');
// jsonwebtoken for secure token for each user so they receive only their info
const jwt = require('jsonwebtoken');
// fetchuser middleware to tokenise user
const fetchUser = require('../../middleware/fetchUser');


//ROUTE 1: Create a user using post and imported user schema for signup. Login not required
router.post('/signup',
    [body('email', "Enter a valid email").isEmail(),
    body('name', "Enter a valid name (min 3 chars)").isLength({ min: 2 }),
    body('password', "Password must be min 8 chars").isLength({ min: 8 })],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        // if error found in data sent, return the error with bad status code 400
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        };
        // check if user with same email already exists
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "A user with same email already exists. Please use a different one." })
            };
            // make the password secure using bcrypt and salt
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);

            // Create a new user with secure password
            user = await User.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
            });
            // send the input json data back as json response
            // res.json(user)

            // send the jwt token, sending the id from our db to user: we first create data to include id in it
            const data = {
                user: {
                    id: user.id
                }
            };

            const authtoken = jwt.sign(data, 'JWT_SECRET');
            console.log(authtoken);
            success = true
            res.json({ success, authtoken })


            // to show errors:
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Json error encountered", error.message)
        }

    });
//ROUTE 2: authenticate user for login. Login not required
router.post('/signin',
    [body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank!").exists()],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        // if error found in data sent, return the error with bad status code 400
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        };
        // compare email and password
        const { email, password } = req.body;
        try {
            // compare email
            let user = await User.findOne({ email });
            if (!user) {
                let success = false;
                return res.status(400).json({ success, error: "Please enter the right email" })
            };

            // compare password
            const passCompare = await bcrypt.compare(password, user.password);
            if (!passCompare) {
                let success = false;
                return res.status(400).json({ success, error: "Please enter the right password" })

            };
            // next send auth token
            const data = {
                user: {
                    id: user.id
                }
            };
            const JWT_SECRET = "Saymyname"
            const authtoken = jwt.sign(data, JWT_SECRET);
            console.log("successfully logged in: Token: ", authtoken);
            let success = true
            res.json({ success, authtoken })

            // next send errors if we get any
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Json error encountered", error.message)
        }

    })
// ROUTE 3: Get signed in user details using api/auth/getuser. Send them auth token and get user details (ID in this case)  from the auth token Login required
router.post('/getuser', fetchUser,
    async (req, res) => {
        try {
            var userId = req.user.id;
            console.log("user ID is ", userId)
            const user = await User.findById(userId).select("-password");
            res.send(user);
            console.log("User is", user);

        } catch (error) {
            console.error(error.message);
            res.status(400).send("Json error encountered", error.message)
        };
    })

module.exports = router;
