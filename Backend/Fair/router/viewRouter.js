const express=require("express");
const viewRouter=express.Router();
const {testPage,getPlansListing,getHome,getLogin,getSignup,getFp,getProfilePage,getCreatePlan}=require("../controller/viewController");
const {isLoggedIn,protectRoute,isAuthorized}=require("../controller/authenticationController");

viewRouter.use(isLoggedIn);
viewRouter.get("/test",testPage);
viewRouter.get("/plans",getPlansListing);
viewRouter.get("/",getHome);
viewRouter.get("/home",getHome);
viewRouter.get("/login",getLogin);
viewRouter.get("/signup",getSignup);
viewRouter.get("/forgetPassword",getFp)
viewRouter.get("/profile",protectRoute,getProfilePage);
viewRouter.get("/createPlan",protectRoute,isAuthorized(["admin","owner"]),getCreatePlan)

module.exports=viewRouter;