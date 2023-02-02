const jwt = require('jsonwebtoken');

const JWT_SECRET = "Saymyname"
const fetchUser = (req, res, next) => {
    // convert back user id from jwt token and add id to req obj so that we receive it
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Token invalid" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        // console.log("Token verified");
        next();
    } catch (error) {
        res.status(401).send({ error: "Token verification failed" })
    }
}

module.exports = fetchUser;