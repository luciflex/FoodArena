// signup
//  user create
const userModel = require("../model/userModel");
const jwt=require("jsonwebtoken");
const mail=require("../utility/email")
const {JWT_SECRET}=require("../config/config")
// const JWT_SECRET="cusa##4ehdibcjkanc"
async function signup(req, res) {
  try {
    const user = await userModel.create(req.body);
    res.status(201).json({
      status: "user signed up",
      user
    })
  } catch (err) {
    res.status(400).json({ err })
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (user) {
      if (password == user.password) {
        const{_id}=user;
        const token=jwt.sign({id:_id},JWT_SECRET,{
          expiresIn:Date.now()+1000*60*30
        })
        res.cookie("jwt",token,{httpOnly:true});
        res.status(200).json({
            status: "successfull",
        })
        
      } else {
        throw new Error("user or password didn't match")
      }
    } else {
      throw new Error("user or password didn't match ");
    }
  } catch (err) {
    console.log(err);
    res.json({
      err
    })
  }
}
async function protectRoute(req, res,next) {
  let token
  try{
    if(req.headers&&req.headers.authorization){

      token=req.headers.authorization.split(" ").pop();
    }else if(req.cookies && req.cookies.jwt){
      token=req.cookies.jwt;
    }else {
      throw new Error("Please provide a token");
    }
     
     if(token){
       const decryptedData=jwt.verify(token,JWT_SECRET);
       if(decryptedData){
         const id=decryptedData.id;
         req.id=id;
         console.log(id);
         next();
       }
       else{
        throw new Error("PLease login to access");    
      }
    }else{
        throw new Error("INVALID TOKEN");
     }
   }catch(err){
     console.log(err);
     res.status(400).json({
         err:err.message
     })
   }
}

async function isLoggedIn(req,res,next){
  try{

  let token;
  if(req.headers && req.headers.authorization){
    token = req.headers.authorization.split(" ").pop();
  }else if(req.cookies && req.cookies.jwt){
    token = req.cookies.jwt;
  }
  else{
    console.log(token);
    return next();
  }
  if(token){
    const decryptedData=jwt.verify(token,JWT_SECRET);
       if(decryptedData){
         const id=decryptedData.id;
         req.id=id;
         const user = await userModel.findById(req.id);
         console.log(id);
         next();
       }
       else{
        return next();   
      }
    }else{
        return next();
     }
   }catch(err){
     console.log(err);
     res.status(400).json({
         err:err.message
     })
  }
}

async function logout(req, res) {
  res.cookie("jwt", "bgfdgcgf", { expires: new Date(Date.now() + 100) });
  res.json({
    status: "logged Out"
  })
}

function isAuthorized(roles){
  return async function(req,res,next){
    try{
      const id=req.id;
      const user= await userModel.findOne({"_id":id});
      console.log(user)
      const {role}=user;
      if(roles.includes(role)==true){
        next();
      }else{
        throw new err("You are not authorized");
      }

    }catch(err){
      res.status(400).json({
        err
      })
    }
  }
}

async function forgetPassword(req,res){
  try{
    const{email}=req.body;
    const user=await userModel.findOne({email:email});
    if(user){
      const token=user.createToken();
      // db=>save
      await user.save({validateBeforeSave:false});
      const resetPasswordLink=`http://localhost:3000/api/users/resetPassword/${token}`;
      const options={};
      options.to=email;
      options.from="support@ajsbs.com";
      options.subject="Reset password";
      options.html=`<h1>Click on the link below to reset password</h1>
      <p>${resetPasswordLink}`;
      await mail(options);
      res.status(200).json({
        resetPasswordLink,
        message:`Email sent to${email}`
      })
      
    }else{
        throw new Error("Email not found")
      }
    
    
  }catch(err){
    console.log(err);
    res.status(400).json({
      err:err.message
    })
  }
}
async function resetPassword(req,res){
    try{
       const token=req.params.token;
       const user=await userModel.findOne({resetToken:token});
       if(user){
         if(Date.now()<user.expiresIn){
           const {password,confirmPassword}=req.body;
           user.resetPasswordHelper(password,confirmPassword);
           await user.save();
           res.status(200).json({
             success:"User password updated . login with new password"
           })
         }else{
           throw new Error("Token has expired");
         }
       }else{
         throw new Error("User not found");
       }
    }catch(err){
      console.log(err);
      res.status(400).json({
        err
      })
    }
}
// login
// user verify
// protect Route 
// authorization
//forgetPassword
//resetPassword
//updatepassword

module.exports.signup = signup;
module.exports.login = login;
module.exports.protectRoute = protectRoute;
module.exports.isAuthorized=isAuthorized;
module.exports.forgetPassword=forgetPassword;
module.exports.resetPassword=resetPassword;
module.exports.isLoggedIn=isLoggedIn;
module.exports.logout=logout;