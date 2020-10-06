const mongoose=require("mongoose");
const planModel=require("../model/planModel.js");
const userModel=require("../model/userModel.js");


mongoose.connect("mongodb+srv://admin:JAk0N40QPVMnumOu@cluster0-wuvtn.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then(function(conn){
        console.log("Review DB connected");
    }).catch(function(err){
        console.log(err)
    })

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:(true,"Review field cannot be empty"),
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdOn:{
        type:Date,
        default:Date.now()
        
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'foodplanmodel',
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'foodusermodel'
    }
})


reviewSchema.pre(/^find/,function(next){
    this.populate(user).populate(plan)
    next();
})

const reviewModel=mongoose.model("foodreviewModel",reviewSchema);
module.exports=reviewModel