const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.splite(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userTokenData = decoded;
        next();
    } catch(error){
        return res.status(401).json({
            massage: 'Auth failed'
        });
    }
};