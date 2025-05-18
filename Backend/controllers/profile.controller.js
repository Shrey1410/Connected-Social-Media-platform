const usermodel = require("../models/user.model")
const utilscloudinary = require("../utils/cloudinary.utils")
exports.uploadprofileimage = async (req, res)=>{
    const profileimage = req?.files?.profileimage[0].path || undefined
    console.log(profileimage)
    if(!profileimage){
        return res.status(500).send({
            message : "Error in uploading file"
        })
    }
    const profile_img = await utilscloudinary.uploadoncloudinary(profileimage)
    if(!profile_img){
        return res.status(401).send({
            message : "Profile not found"
        })
    }
    console.log(req.user)
    await usermodel.findByIdAndUpdate(req.user._id, {profile_image : profile_img.url})
    return res.status(201).send({
        message : "Profile Image uploaded successfully"
    })
}

exports.uploadcoverimage = async (req, res)=>{
    const coverimage = req?.files?.coverimage[0].path || undefined
    console.log(coverimage)
    if(!coverimage){
        return res.status(500).send({
            message : "Error in uploading file"
        })
    }
    const cover_img = await utilscloudinary.uploadoncloudinary(coverimage)
    if(!cover_img){
        return res.status(401).send({
            message : "Cover not found"
        })
    }
    console.log(req.user)
    await usermodel.findByIdAndUpdate(req.user._id, {cover_image : cover_img.url})
    return res.status(201).send({
        message : "Cover Image uploaded successfully"
    })
}

