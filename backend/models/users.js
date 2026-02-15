const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true,
        },
        skills:{
            type:[String],
            default:[]
        },
        bio:{
            type:String,
            default:""
        },
        education:{
            type:String,
            default:""
        },
        experience:{
            type:String,
            default:""
        },
        profile_completed:{
            type:boolean,
            default:false
        }
    },{timestamps:true}
);

userModel = mongoose.model("User",userSchema);

module.exports={userModel};