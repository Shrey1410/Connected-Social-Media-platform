const comments_controller = require("../controllers/comments.controller");
const auth_middleware = require("../middlewares/auth.middleware");
module.exports = (app)=>{
    app.post("/createcomments/:postId",[auth_middleware.checkauth] , comments_controller.createcomment)

    app.get("/comment/getcomments/:postId", [auth_middleware.checkauth], comments_controller.getcomments)
}