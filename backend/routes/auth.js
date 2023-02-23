// API FOR SIGNUP AND SIGNIN

const express = require('express');
const router = express.Router();
const userModel = require('../models/User');
const { body, validationResult } = require('express-validator');
// bcrypt for password hashing and adding salt:
const bcrypt = require('bcryptjs');
// jsonwebtoken for secure token for each user so they receive only their info
const jwt = require('jsonwebtoken');
// fetchuser middleware to tokenise user
const fetchUser = require('../../middleware/fetchUser');


//ROUTE 1: Create a user using post and imported user schema for signup, AND CREATE THEIR AUTH TOKENc for signup. Login not required
router.post('/signup',
    [ body('email', "Enter a valid email").isEmail(),
    body('name', "Enter a valid name (min 3 chars)").isLength({ min: 2 }),
    body('password', "Password must be min 8 chars").isLength({ min: 8 }) ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        // if error found in data sent, return the error with bad status code 400
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        };
        // check if user with same email already exists
        try {
            let match = await userModel.findOne({ email: req.body.email });
            if (match) {
                return res.status(400).json({ success, error: "A user with same email already exists. Please use a different one." })
            };
            // make the password secure using bcrypt and salt
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);

            // Create a new user with secure password
            const userCreated = await userModel.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
            });

            // create Payload from id of createdUser for inclusion in authoken
            const userIDPayload = {
                user: {
                    id: userCreated.id
                }
            };
            const authtoken = jwt.sign(userIDPayload, 'JWT_SECRET');
            success = true;
            res.status(200).json({ success, authtoken });


            // to show errors:
        } catch (error) {
            console.error(error.message);
        }
    });
    
//ROUTE 2: authenticate user for login. Login not required. Create Auth token for login here
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
            let foundUser = await userModel.findOne({ email });
            if (!foundUser) {
                let success = false;
                return res.status(400).json({ success, error: "Please enter the right email as no person with entered email was found" })
            };
            // compare password
            const passCompare = await bcrypt.compare(password, foundUser.password);
            if (!passCompare) {
                let success = false;
                return res.status(400).json({ success, error: "Please enter the right password" })
            };
            // next create and send new auth token after login
            const userIDPayload = {
                user: { //we create a user key schema that saves the login id n gives it to notes created by member
                    id: foundUser.id //Note: this use.id will be sent to fetchUser and fetchUser will be called by notesApis as save the note with title,desc,tag and user where user = req.user.id
                }
            };
            const JWT_SECRET = "Saymyname"
            const authtoken = jwt.sign(userIDPayload, JWT_SECRET);
            console.log("successfully logged in: Token: ", authtoken);
            let success = true
            res.status(200).json({ success, authtoken })

            // next send errors if we get any
        } catch (error) {
            console.error(error.message);
            }

    });

    //(NOT NEEDED)
// ROUTE 3: Get signed in user details using api/auth/getuser. Send them auth token and get user details (ID in this case)  from the auth token .Login required
router.post('/getuser', fetchUser,
    async (req, res) => {
        try {
            var userId = req.user.id; //req.user.id is from fetchUser middleware
            console.log("user ID is ", userId)
            const user = await userModel.findById(userId).select("-password");
            res.status(200).json(user);

        } catch (error) {
            console.error(error.message);
        };
    })

module.exports = router;
