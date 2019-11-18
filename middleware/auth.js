const jwt = require("jsonwebtoken");
const {secretKey} = require("../config");

module.exports = function auth(req, res, next){
    const token = req.header("x-auth-token");
    if(!token) res.status(401).send("Access denied");

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token");
    }
}