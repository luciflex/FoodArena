const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin:JAk0N40QPVMnumOu@cluster0-wuvtn.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then(function(conn){
        console.log("Plan DB connected");
    }).catch(function(err){
        console.log(err)
    })

    const planSchema=new mongoose.Schema({
        name:{
            type:String,
            required:[true,"Name is required"],
            unique:true,
            trim:true,
            minlength:[5,"A plan name must be minimum 5 letters"]
        },
        description:{
            type:String,
            required:[true,"Description is required"]
        },
        ratingsAverage:{
            type:Number,
            default:7,
            min:[1,"Rating cannot be lower than 1"],
            max:[10,"Rating cannot be more than 10"]
        },
        slug:String,
        price:{
            type:Number,
            required:true,
            min:20
        },
        discount:{
            type:Number,
            validate:{
                validator:function(){
                    return this.price>this.discount
                },
                message:"Discount must be greater than price"
            }
        }
    })

    const planModel=mongoose.model("foodPlanModel",planSchema);
    module.exports=planModel;