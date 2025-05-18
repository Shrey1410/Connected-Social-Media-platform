const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../configs/security.config")
const user_model = require("../models/user.model")
exports.checkauth = async (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).send({
            message : "Unauthorized!"
        })
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await user_model.findOne({_id : decoded.id})
        req.user = user
        next()
    }
    catch(err){
        return res.status(400).send({
            message : "Error while authorization"
        })
    }
}
