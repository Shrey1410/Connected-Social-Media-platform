const postmodel = require("../models/post.model")
const utilscloudinary = require("../utils/cloudinary.utils")
const user_model = require("../models/user.model")
exports.createpost = async (req, res)=>{
    const { description } = req.body;
    const postimage = req?.files?.image?.[0]?.path || undefined
    if(!description){
        return res.status(500).send({
            message : "All fields must require!"
        })
    }
    let post_img = null
    try{
    if(postimage) post_img = await utilscloudinary.uploadoncloudinary(postimage)
    }
    catch(err){
        res.status(500).send({
            message : "Network Error Found"
        })
    }
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
    const id = req.params.id
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit
    const post = await postmodel.find({createdBy : id})
    const posts = await postmodel.find({createdBy : id}).populate("createdBy", "fullname profile_image Online").sort({createdAt : -1}).skip(skip).limit(limit)
    if(!posts){
        return res.status(500).send({
            message : "Error in getting posts"
        })
    }
    return res.status(200).send({
        message : "Posts fetched successfully",
        posts,
        pagination : {
            page,
            limit,
            totalPages : Math.ceil(post.length / limit),
            totalResults : posts.length
        }
    })
}

exports.getallposts = async (req, res)=>{
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit
    const user = await user_model.findById(req.user._id)
    const friends = user.friends
    const friendIds = friends.map(f => f.user_id);
    friendIds.push(req.user._id)
    const post = await postmodel.find({createdBy : {$in : friendIds}})
    const posts = await postmodel.find({createdBy : {$in : friendIds}}).populate("createdBy", "fullname profile_image Online").sort({createdAt : -1}).skip(skip).limit(limit)
    if(!posts){
        return res.status(500).send({
            message : "Error in getting posts"
        })
    }
    return res.status(200).send({
        message : "Posts fetched successfully",
        posts,
        pagination : {
            page,
            limit,
            totalPages : Math.ceil(post.length / limit),
            totalResults : posts.length
        }
    })
}