const express=require("express");
const planRouter=express.Router();
const {protectRoute,isAuthorized}=require("../controller/authenticationController")
const {getAllPlans,getPlan,removePlan,updatePlan,createPlan}=require("../controller/planController");

planRouter.route("")
.get(getAllPlans)
.post(protectRoute,isAuthorized(["admin","owner"]),createPlan);

planRouter.route("/:planId")
.get(getPlan)
.patch(updatePlan)
.delete(protectRoute,isAuthorized(["admin"]),removePlan);

module.exports=planRouter;