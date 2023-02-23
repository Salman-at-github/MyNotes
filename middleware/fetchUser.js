//Middleware just decodes the user id sent in jwt, we use it for ver later and also for adding user field to notes.

const jwt = require('jsonwebtoken');

const JWT_SECRET = "Saymyname";
const fetchUser = (req, res, next) => {
    // convert back user id from jwt token during login and add id to req obj so that we receive it
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Token invalid" })
    }
    try {
        const decodeToken = jwt.verify(token, JWT_SECRET);
        req.user = decodeToken.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Token verification failed" })
    }
};

module.exports = fetchUser;