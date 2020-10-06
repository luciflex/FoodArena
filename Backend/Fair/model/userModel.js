const mongoose=require("mongoose");
const crypto=require("crypto");

mongoose.connect("mongodb+srv://admin:JAk0N40QPVMnumOu@cluster0-wuvtn.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then(function(conn){
        console.log("User DB connected");
    }).catch(function(err){
        console.log(err)
    })

    const userSchema=new mongoose.Schema({
        name:{
            type:String,
            required:[true,"Name is required"],
            trim:true,
        },
        email:{
            type:String,
            required:[true,"E-mail is required"],
            unique:true
        },
        password:{
            type:String,
            minlength:7,
            required:[true,"Password is reuired"],
            select:false          
        },
        confirmPassword:{
            type:String,
            required:[true,"Confirm password"],
            validate:{
                validator:function(){
                    return this.password==this.confirmPassword
                },
                message:"password and confirm password should be same"
            }
        },
        role:{
            type:String,
            enum:["admin","owner","Delivery boy","user"],
            default:"user"
        },
        resetToken:String,
        expiresIn:String,
        profileImage:{
            type:String,
            default:"/IMG/users/default.jpg"
        }
    })

    userSchema.pre("save",function(){
        this.confirmPassword=undefined;
    })

    userSchema.methods.createToken=function(){

        const token=crypto.randomBytes(32).toString("hex");
        this.resetToken=token;
        this.expiresIn=Date.now() + 20*1000*60;
        return token;
        
    }
    userSchema.methods.resetPasswordHelper=function(password,confirmPassword){
        this.password=password;
        this.confirmPassword=confirmPassword;
        this.resetToken=undefined;
        this.expiresIn=undefined;
    }

    const userModel=mongoose.model("foodUserModel",userSchema);
    module.exports=userModel;