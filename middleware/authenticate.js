const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

let authenticate = async (req, res, next) => {
    let authToken = req.cookies.authToken;
    let validToken;

    try{
        validToken = jwt.verify(authToken, process.env.JWT_SECRET);
        console.log(validToken);
        req.body.userId = mongoose.Types.ObjectId(validToken.userId);
    }catch(err){
        console.log(err);
        return res.status(401).send("Invalid Access Token");
    }

    next();
};

module.exports = {
    authenticate
}