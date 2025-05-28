const Post = require('../models/post.model')

exports.toggellike = async (req, res) => {
    const { post_id } = req.params;
    const user_id = req.user._id;
    try {
        let post = await Post.findById(post_id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const likeIndex = post.likes.indexOf(user_id);
        if (likeIndex === -1) {
            post.likes.push(user_id);
        } else {
            post.likes.splice(likeIndex, 1);
        }
        await post.save();
        post = await Post.findById(post_id).populate("createdBy", "fullname profile_image Online")
        return res.status(200).send({ 
            message: "Like toggled successfully",
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" });
    }
}