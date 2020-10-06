const userModel=require("../model/userModel");
const sharp=require("sharp");
const fs=require("fs");
const {getAllElements,createElement,getElement,updateElement,removeElement}=require("../utility/factory")


async function updateProfileHandler(req,res){
    try{

        const id=req.id;
    const user=await userModel.findById(id);
    
    let toBeSavedImagePath=`public/IMG/users/${Date.now()}.jpeg`;
    await sharp(req,file.path).toFormat("jpeg").jpeg({quality:60}).toFile(toBeSavedImagePath);
    let DBlink=toBeSavedImagePath.split("/").slice(1).join("/");
    user.profileImage=DBlink;
    await user.save({
        validateBeforeSave:false
    })
    res.status(200).json({
        success:"image uploaded"
    })
    fs.promises.unlink(req.file.path);
   }catch(err){
       console.log(err);
       res.status(200).json({
           status:"Something went wrong,image not uploaded"
       })
   }
}

module.exports.getAllUsers=getAllElements(userModel);
module.exports.createUser=createElement(userModel);
module.exports.getUser=getElement(userModel);
module.exports.updateUser=updateElement(userModel);
module.exports.removeUser=removeElement(userModel);
module.exports.updateProfileHandler=updateProfileHandler;

