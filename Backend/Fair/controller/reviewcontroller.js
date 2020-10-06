const reviewModel=require("../model/reviewModel");
const {getAllElements,createElement}=require("../utility/factory")




module.exports.createReview=createElement(reviewModel);
module.exports.getallReviews=getAllElements(reviewModel);