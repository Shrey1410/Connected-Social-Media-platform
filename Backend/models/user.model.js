const mongoose = require('mongoose')
const user_schema = mongoose.Schema({
    fullname : {
        type: String,
        minlength : 3,
        required : true
    },
    username : {
        type: String,
        minlength : 4,
        required : true
    },
    password : {
        type: String,
        minlength : 8,
        required : true,
        select : false
    },
    email : {
        type: String,
        minlength : 8,
        required : true
    },
    cover_image :{
        type:String //uri
    },
    profile_image :{
        type:String //uri 
    },
    friend_request : [
        {
            user_id : {
                type: mongoose.Schema.Types.ObjectId,
                ref : "user"
            },
            status : {
                type: String,
                enum : ["pending", "accepted"],
                default : "pending"
            }
        }
    ],
    friends : [
        {
            user_id : {
                type: mongoose.Schema.Types.ObjectId,
                ref : "user"
            }
        }
    ]
})

module.exports = mongoose.model("user",user_schema)