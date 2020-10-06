const express=require("express");
const reviewRouter=express.Router();
const{createReview,getallReviews}=require("../controller/reviewcontroller");

reviewRouter.route("").post(createReview).get(getallReviews);


module.exports=reviewRouter;