const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const token = req.header("token");
    if (!token) return res.status(404).send(["Token is Missing"]);

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send(["Invalid Token"]);
    }
}

module.exports = {verifyToken};