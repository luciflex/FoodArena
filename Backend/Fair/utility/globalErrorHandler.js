module.exports=function(err,req,res,next){
    err.statusCode=err.statusCode||500;
    err.status=err.status||"Unknown Error";
    if(process.env.NODE_ENV=="production"){
        sendProderror(err,req,res);
    }else{
        sendDevError(err,req,res);
    }
}

function sendDevError(er,req,res){
    if(req.originalURL.includes("/api")){
        return res.status(err.statusCode).json({
            message=err.message,
            stack:err.stack,
            status:err.status
        })
    }else{
        res.status(err.statusCode).render("Error.pug",{
            title:"SOmething Went Wrong",
            msg:err.message
        })
    }
}

function sendProderror(err,req,res){
    if(err.isknown){
        res.status(err.statusCode).json({
            message:err.message,
            status:err.status
        })
    }else{
        res.status(err.statusCode).json({
            message:"Something Went Wrong",
            status:"Error"
        })
    }
}