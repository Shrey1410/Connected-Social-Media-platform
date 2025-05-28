const postmodel = require("../models/post.model")
exports.createcomment = async (req, res) => {
    console.log("entered")
    const postId = req.params.postId
    const { comment } = req.body
    const post = await postmodel.findById(postId)
    post.comments.push({
        user_id : req.user._id,
        description: comment
    })
    await post.save()
    const updatedPost = await postmodel.findById(postId).populate("comments.user_id", "profile_image Online")
    if(!updatedPost){
        return res.status(500).send({
            message : "Error in creating comment"
        })
    }
    return res.status(200).send({
        message : "Commented Successfully",
        post : updatedPost
    })
}

exports.getcomments = async (req, res) => {
    const postId = req.params.postId
    const post = await postmodel.findById(postId).populate("comments.user_id", "profile_image Online")
    if(!post){
        return res.status(500).send({
            message : "Error in getting comments"
        })
    }
    return res.status(200).send({
        message : "Comments fetched successfully",
        comments : post.comments
    })
}