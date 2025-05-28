const user_schema = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {SALT, JWT_SECRET} = require('../configs/security.config')
const {validationResult} = require('express-validator')
exports.signup = async (req, res)=>{
    const {fullname, username, email, password} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({
            message : errors.array()[0].msg
        })
    }
    if(!fullname || !username || !email || !password){
        return res.status(400).send({
            message : "All fields are required"
        })
    }
    const check_user1 = await user_schema.findOne({email : email})
    const check_user2 = await user_schema.findOne({username : username})
    if(check_user1 || check_user2){
        return res.status(400).send({
            message : "Username or email already exists"
        })
    }
    const user = await user_schema.create({
        fullname : fullname,
        username : username,
        email : email,
        password :bcrypt.hashSync(password, SALT)
    })
    const token = jwt.sign(
        {
            id : user._id,
        },
        JWT_SECRET,
        {
            expiresIn : 86400 
        }
    )
    return res.status(200).cookie("token", token, {
        httpOnly : true,
        secure : false,
        maxAge : 24 * 60 * 60 * 1000 
    }).send({
        message : "Registered Successfully",
        user : {
            id : user._id,
            fullname : user.fullname,
            username : user.username,
            email : user.email,
            profile_image : user.profile_image,
            cover_image : user.cover_image,
            Online : user.Online
        }
    })
}

exports.login = async (req, res)=>{
    const {username, password} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({
            message : errors.array()[0].msg
        })
    }
    if(!username || !password){
        return res.status(400).send({
            message : "All fields are required"
        })
    }
    const user = await user_schema.findOne({username : username}).select("+password")
    if(!user){
        return res.status(401).send({
            message : "User Does not exists"
        })
    }
    if(!bcrypt.compareSync(password, user.password)){
        return res.status(401).send({
            message : "Invalid Credentials"
        })
    }
    const token = jwt.sign(
        {
            id : user._id,
        },
        JWT_SECRET,
        {
            expiresIn : 86400 
        }
    )
    return res.cookie("token", token, {
        httpOnly : true,
        secure : false,
        maxAge : 24 * 60 * 60 * 1000 
    }).status(200).send({
        message : "Logged in Successfully",
        user : {
            id : user._id,
            fullname : user.fullname,
            username : user.username,
            email : user.email,
            profile_image : user.profile_image,
            cover_image : user.cover_image,
            Online : user.Online
        }
    })
}

exports.automaticlogin = async (req, res)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).send({
            message : "Unauthorized",
        })
    }
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await user_schema.findById(decoded.id)
    if(!user){
        return res.status(401).send({
            message : "Unauthorized"
        })
    }
    return res.status(200).send({
        message : "Logged in Successfully",
        user : {
            id : user._id,
            fullname : user.fullname,
            username : user.username,
            email : user.email,
            profile_image : user.profile_image,
            cover_image : user.cover_image,
            Online : user.Online
        }
    })
}

exports.logout = async(req, res)=>{
    return res.status(200).clearCookie("token", {
        httpOnly : true,
        secure : false,
        maxAge : 24 * 60 * 60 * 1000 
    }).send({
        message : "Logged out Successfully"
    })
}