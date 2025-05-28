const mongoose = require("mongoose");
const post_schema = mongoose.Schema({
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    description : {
        type : String,
        required: true,
    },
    post_image : {
        type: String
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }],
    comments : [
        {
            user_id : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "user",
                required : true
            },
            description : {
                type : String,
                required : true
            }
        }
    ]
}, {
    timestamps : true
})

module.exports = mongoose.model("post", post_schema);