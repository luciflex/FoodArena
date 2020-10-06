const userModel=require("../model/userModel")
const planModel=require("../model/planModel");

function testPage(req,res){
    res.render("test.pug",{
        title:"Test page"
    })

}
async function getPlansListing(req,res){
    const plans=await planModel.find();
    res.render("plansListing.pug",{title:"Plans",plans,})
}
async function getHome(req,res){
    const id=req.id;
    const user=await userModel.findById(id);
    res.render("homePage.pug",{title:"HOME",user})
}
function getLogin(req,res){
    const user=req.user;
    console.log(user);
    res.render("login.pug",{title:"Login",user})
}
function getSignup(req,res){
    res.render("signUp.pug",{title:"SignUp"})
}
function getFp(req,res){
    
    res.render("forgetPassword.pug",{title:"Forgot password?"})
}
async function getProfilePage(req,res){
    const id=req.id;
      const user= await userModel.findOne({"_id":id});
    console.log(user);
    res.render("profilePage.pug",{title:"Your profile",user})
}

function getCreatePlan(req,res){
    res.render("createPlan.pug",{title:"Create New Plan"})
}

module.exports.getHome=getHome;
module.exports.testPage=testPage;
module.exports.getPlansListing=getPlansListing;
module.exports.getLogin=getLogin;
module.exports.getSignup=getSignup;
module.exports.getFp=getFp;
module.exports.getProfilePage=getProfilePage;
module.exports.getCreatePlan=getCreatePlan;