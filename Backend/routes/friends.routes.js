const auth_middleware = require("../middlewares/auth.middleware")
const friends_controller = require("../controllers/friends.controller")

module.exports = (app)=>{
    app.get("/friends/suggestions",[auth_middleware.checkauth], friends_controller.getfriendsuggestions)

    app.get("/friends/requests",[auth_middleware.checkauth], friends_controller.getfriendrequests)

    app.post("/friends/request/:friend_id",[auth_middleware.checkauth], friends_controller.createfriendrequest)

    app.post("/friends/accept/:friend_id",[auth_middleware.checkauth], friends_controller.acceptfriendrequest)

    app.get("/friends",[auth_middleware.checkauth], friends_controller.getfriends)

    app.get("/pending/requests", [auth_middleware.checkauth], friends_controller.getpendingrequests)

    app.get("/search/friend/:query", [auth_middleware.checkauth], friends_controller.searchFriends)
}