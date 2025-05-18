const profile_controller = require("../controllers/profile.controller")
const auth_middleware = require("../middlewares/auth.middleware")
const multer_middleware = require("../middlewares/multer.middleware")
module.exports = (app)=>{
    app.post("/upload/profileimage", [auth_middleware.checkauth, multer_middleware.upload.fields([
        {  name : "profileimage",
           maxCount : 1 
        }
    ])], profile_controller.uploadprofileimage)

    app.post("/upload/coverimage", [auth_middleware.checkauth, multer_middleware.upload.fields([
        {  name : "coverimage",
           maxCount : 1 
        }
    ])], profile_controller.uploadcoverimage)
}