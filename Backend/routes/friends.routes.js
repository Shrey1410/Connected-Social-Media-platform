const auth_middleware = require("../middlewares/auth.middleware")
const friends_controller = require("../controllers/friends.controller")
module.exports = (app)=>{
    app.get("/friends/suggestions",[auth_middleware.checkauth], friends_controller.getfriendsuggestions)

    app.get("/friends/requests",[auth_middleware.checkauth], friends_controller.getfriendrequests)

    app.post("/friends/request/:friend_id",[auth_middleware.checkauth], friends_controller.createfriendrequest)
}