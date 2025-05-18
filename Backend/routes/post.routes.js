const post_controller = require("../controllers/post.controller");
const auth_middleware = require("../middlewares/auth.middleware")
const multer_middleware = require("../middlewares/multer.middleware")
module.exports = (app)=>{
    app.post("/createpost", [auth_middleware.checkauth, multer_middleware.upload.fields([
            {  name : "image",
               maxCount : 1 
            }
        ])], post_controller.createpost)

    app.get("/getpost", [auth_middleware.checkauth], post_controller.getpostedbytheuser)
}