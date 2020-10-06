const express=require("express");
const app=express();
// const plans=require("./data/plan.json");
// const fs=require("fs");
app.use(express.json());

const planRouter=require("../POC/router/planRouter");
const userRouter=require("../POC/router/userRouter");

app.use("/api/plans",planRouter);
app.use("/api/users",userRouter);
// wild card
app.use("*",function(res,req){
    res.status(404).json({
        Status:"Resource not found"
    })
})

app.listen(3000,function(){
    console.log("Server is listening at port 3000");
})