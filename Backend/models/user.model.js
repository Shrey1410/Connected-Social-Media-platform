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
        required : true,
        unique : true
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
        required : true,
        unique : true
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
        }
    ],
    friends : [
        {
            user_id : {
                type: mongoose.Schema.Types.ObjectId,
                ref : "user"
            }
        }
    ],
    friend_requests_sent : [
        {
            user_id : {
                type: mongoose.Schema.Types.ObjectId,
                ref : "user"
            }
        }
    ],
    Online : {
        type: Boolean,
        default : false
    },
})

module.exports = mongoose.model("user",user_schema)