const express=require("express");
const userRouter=express.Router();
const {getAllUsers,getUser,removeUser,updateUser,createUser,updateProfileHandler}=require("../controller/userController");
const {signup,login,forgetPassword,logout,protectRoute}=require("../controller/authenticationController");
const multer=require("multer");
const multerstorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/IMG/users");
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
})

const fileFilter=function(req,file,res){
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb(new Error("Not an image!Please upload image"),false);
    }
}

const upload=multer({
    storage:multerstorage,
    fileFilter:fileFilter
});

userRouter.patch("/updateProfile",protectRoute,upload.single("user"),updateProfileHandler)

userRouter.route("")
.get(getAllUsers)
.post(createUser);

userRouter.route("/login").post(login);
userRouter.route("/signup").post(signup);
userRouter.route("/forgetPassword").post(forgetPassword);
userRouter.route("/logout").get(logout)

userRouter.route("/:userId")
.get(getUser)
.patch(updateUser)
.delete(removeUser);

module.exports=userRouter;