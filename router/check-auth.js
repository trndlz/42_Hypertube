const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, keys.jwt);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(200).json({
            isAuthenticated: false
        });
    }
};