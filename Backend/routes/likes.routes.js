const auth_middleware = require("../middlewares/auth.middleware");
const likes_controller = require("../controllers/likes.controller");
module.exports = (app)=>{
    app.post("/like/post/:post_id", [auth_middleware.checkauth], likes_controller.toggellike);
}