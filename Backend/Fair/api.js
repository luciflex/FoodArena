const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const planRouter=require("./router/planRouter");
const userRouter=require("./router/userRouter");
const viewRouter = require("./router/viewRouter");
const reviewRouter = require("./router/reviewRouter");
const ErrorExtender=require("./utility/errorHandler")


app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
// templating engine and route
app.set("view engine","pug");
app.set("views","views")

app.use("/",viewRouter);
app.use("/api/plan",planRouter);
app.use("/api/user",userRouter);
app.use("/reviews",reviewRouter);







app.use("*",function(req,res,next){
  err=new ErrorExtender("Page not Found",404);
  next(err);
});

app.use("*",function(err,req,res,next){
  err.statusCode=err.statusCode||500;
  err.status=err.status||"unknown error";
  res.status(err.statusCode).json({
    status:err.status,
    message:err.message
  })
})


const port=process.env.PORT||3000;


app.listen(port,function(){
    console.log("Server is running at 3000");
})