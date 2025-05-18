const postmodel = require("../models/post.model")
const utilscloudinary = require("../utils/cloudinary.utils")
exports.createpost = async (req, res)=>{
    console.log(req.body)
    const { description } = req.body;
    const postimage = req?.files?.image?.[0]?.path || undefined
    if(!description){
        return res.status(500).send({
            message : "All fields must require!"
        })
    }
    let post_img = null
    if(postimage) post_img = await utilscloudinary.uploadoncloudinary(postimage)
    const post = await postmodel.create({
        post_image : post_img?.url,
        description : description,
        createdBy : req.user._id
    })
    if(!post){
        return res.status(500).send({
            message : "Error in creating post"
        })
    }
    return res.status(200).send({
        message : "Posted Successfully"
    })
}

exports.getpostedbytheuser = async (req, res)=>{
    const posts = await postmodel.find({createdBy : req.user._id}).populate("createdBy", "fullname profile_image")
    if(!posts){
        return res.status(500).send({
            message : "Error in getting posts"
        })
    }
    return res.status(200).send({
        message : "Posts fetched successfully",
        posts
    })
}

// exports.deletepost = async (req, res)=>{

// }