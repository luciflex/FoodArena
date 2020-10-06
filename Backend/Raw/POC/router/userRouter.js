const express=require("express");
const userRouter=express.Router();
const {getAllUsers,getUser,removeUser,updateUser,createUser}=require("../controller/userController");

userRouter.route("")
.get(getAllUsers)
.post(createUser);

userRouter.route("/:userId")
.get(getUser)
.patch(updateUser)
.delete(removeUser);

module.exports=UserRouter;