const user_model = require("../models/user.model")

exports.getfriendsuggestions = async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;

    try {
        const current_user = await user_model.findById(req.user._id).select("friends friend_request friend_requests_sent");
        const excluded_user_ids = new Set([
            ...current_user.friends.map(friend => friend.user_id.toString()),
            ...current_user.friend_request.map(request => request.user_id.toString()),
            ...current_user.friend_requests_sent.map(request => request.user_id.toString()),
            req.user._id.toString()
        ]);

        const suggestions = await user_model.find({
            _id: { $nin: Array.from(excluded_user_ids) }
        }).select("-friends -friend_request -password").skip(skip).limit(limit);

        const totalSuggestions = await user_model.countDocuments({
            _id: { $nin: Array.from(excluded_user_ids) }
        });

        return res.status(200).send({
            message: "Friend Suggestions",
            data: suggestions,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalSuggestions / limit),
                totalResults: totalSuggestions
            }
        });
    } catch (error) {
        console.error("Error fetching friend suggestions:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

exports.getfriendrequests = async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;
    let skip = (page - 1) * limit;

    try {
        const user = await user_model.findById(req.user._id).select("friend_request");

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const totalRequests = user.friend_request.length;

        const paginatedRequests = user.friend_request.slice(skip, skip + limit);

        const populatedRequests = await user_model.populate(paginatedRequests, {
            path: "user_id",
            select: "-friends -friend_request -friend_requests_sent -password"
        });

        return res.status(200).send({
            message: "Friend Requests",
            data: populatedRequests,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalRequests / limit),
                totalResults: totalRequests
            }
        });

    } catch (error) {
        console.error("Error fetching friend requests:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

exports.createfriendrequest = async (req, res) => {
    const {friend_id} = req.params
    const friend = await user_model.findById(friend_id);
    if (!friend) {
        return res.status(404).send({
            message: "User or friend not found"
        });
    }
    const user = await user_model.findById(req.user._id)
    friend.friend_request.push({
        user_id: req.user._id,
    });
    user.friend_requests_sent.push({
        user_id : friend_id
    })
    await friend.save();
    await user.save();
    return res.status(200).send({
        message: "Friend request sent successfully",
        user : {
            id : user._id,
            fullname : user.fullname,
            username : user.username,
            email : user.email,
            profile_image : user.profile_image,
            cover_image : user.cover_image,
            Online : user.Online
        }
    });
}

exports.acceptfriendrequest = async (req, res) => {
    const {friend_id} = req.params
    const friend = await user_model.findById(friend_id);
    if (!friend) {
        return res.status(404).send({
            message: "User or friend not found"
        });
    }
    const user = await user_model.findById(req.user._id)
    friend.friend_request = friend.friend_request.filter(request => request.user_id.toString() !== req.user._id.toString());
    user.friend_requests_sent = user.friend_requests_sent.filter(request => request.user_id.toString() !== friend_id.toString());
    user.friend_request.pop({
        user_id: friend_id
    });
    friend.friend_requests_sent.pop({
        user_id : req.user._id
    })
    friend.friends.push({
        user_id: req.user._id,
    });
    user.friends.push({
        user_id : friend_id
    })
    await friend.save();
    await user.save();
    return res.status(200).send({
        message: "Friend request accepted successfully",
        user : {
            id : user._id,
            fullname : user.fullname,
            username : user.username,
            email : user.email,
            profile_image : user.profile_image,
            cover_image : user.cover_image,
            Online : user.Online
        }
    });
}

exports.getfriends = async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    try {
        // Get the user’s friends array
        const user = await user_model.findById(req.user._id).select("friends");

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const totalFriends = user.friends.length;

        // Paginate the friends array
        const paginatedFriends = user.friends.slice(skip, skip + limit);

        // Populate the selected friends' user data
        const populatedFriends = await user_model.populate(paginatedFriends, {
            path: "user_id",
            select: "-friends -friend_request -friend_requests_sent -password"
        });

        return res.status(200).send({
            message: "Friends",
            data: populatedFriends,
            pagination: {
                page,
                limit,
                totalFriends,
                totalPages: Math.ceil(totalFriends / limit)
            }
        });
    } catch (error) {
        console.error("Error fetching friends:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

exports.getpendingrequests = async (req, res)=>{
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;

    try {
        const user = await user_model.findById(req.user._id).select("friend_requests_sent");

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const totalRequests = user.friend_requests_sent.length;

        const paginatedRequests = user.friend_requests_sent.slice(skip, skip + limit);

        const populatedRequests = await user_model.populate(paginatedRequests, {
            path: "user_id",
            select: "-friends -friend_request -friend_requests_sent -password"
        });
        return res.status(200).send({
            message: "Friend Requests",
            data: populatedRequests,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalRequests / limit),
                totalResults: totalRequests
            }
        });

    } catch (error) {
        console.error("Error fetching friend requests:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
}

exports.searchFriends = async (req, res) => {
    const { query } = req.params;

    // Allow only alphabet characters (both lowercase and uppercase)
    const isValid = /^[a-zA-Z]+$/.test(query);

    if (!isValid) {
        return res.status(400).json({
            error: 'Search query must contain only letters (a-z, A-Z)',
        });
    }
    try {
        const results = await user_model.find({
            fullname: {
                $regex: query,
                $options: 'i',
            },
        });

        return res.status(200).send({ results });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};
