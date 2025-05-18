const user_model = require("../models/user.model")

exports.getfriendsuggestions = async (req, res) => {
    try {
        const current_user = await user_model.findById(req.user._id).select("friends friend_request");

        const excluded_user_ids = new Set([
            ...current_user.friends.map(friend => friend.user_id.toString()),
            ...current_user.friend_request.map(request => request.user_id.toString()),
            req.user._id.toString()
        ]);

        const suggestions = await user_model.find({
            _id: { $nin: Array.from(excluded_user_ids) }
        }).select("-friends -friend_request -password");

        return res.status(200).send({
            message: "Friend Suggestions",
            data: suggestions
        });
    } catch (error) {
        console.error("Error fetching friend suggestions:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

exports.getfriendrequests = async (req, res)=>{
    console.log("runnn")
    const requests = await user_model.findById(req.user._id).select("friend_request").populate("friend_request.user_id", "-friends -friend_request -password")
    console.log(requests)
    return res.status(200).send({
        message: "Friend Requests",
        data: requests
    })
}

exports.createfriendrequest = async (req, res) => {
    const {friend_id} = req.params
    const friend = await user_model.findById(friend_id);
    if (!friend) {
        return res.status(404).send({
            message: "User or friend not found"
        });
    }
    friend.friend_request.push({
        user_id: req.user._id,
        status: "pending"
    });
    await friend.save();
    return res.status(200).send({
        message: "Friend request sent successfully"
    });
}