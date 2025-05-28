const usermodel = require("../models/user.model")
const utilscloudinary = require("../utils/cloudinary.utils")
exports.uploadprofileimage = async (req, res)=>{
    const profileimage = req?.files?.profileimage[0].path || undefined
    if(!profileimage){
        return res.status(500).send({
            message : "Error in uploading file"
        })
    }
    let profile_img
    try{
        profile_img = await utilscloudinary.uploadoncloudinary(profileimage)
    }
    catch(err){
        res.status(500).send({
            message : "Error while uploading"
        })
    }
    if(!profile_img){
        return res.status(401).send({
            message : "Profile not found"
        })
    }
    await usermodel.findByIdAndUpdate(req.user._id, {profile_image : profile_img.url})
    const user = await usermodel.findById(req.user._id)
    return res.status(201).send({
        message : "Profile Image uploaded successfully",
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

exports.uploadcoverimage = async (req, res)=>{
    const coverimage = req?.files?.coverimage[0].path || undefined
    if(!coverimage){
        return res.status(500).send({
            message : "Error in uploading file"
        })
    }
    let cover_img;
    try{
    cover_img = await utilscloudinary.uploadoncloudinary(coverimage)
    }
    catch(err){
        res.status(500).send({
            message : "Error while uploading"
        })
    }
    if(!cover_img){
        return res.status(401).send({
            message : "Cover not found"
        })
    }
    await usermodel.findByIdAndUpdate(req.user._id, {cover_image : cover_img.url})
    const user = await usermodel.findById(req.user._id)
    return res.status(201).send({
        message : "Cover Image uploaded successfully",
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

