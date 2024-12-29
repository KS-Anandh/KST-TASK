import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        userMail:{
            type:String,
            required:true
        },
        userDob:{
            type:String,
            required:true
        },
        userGender:{
            type:String,
            required:true
        },
        userProfile:{
            type:String,
            required:false
        },
        userResume:{
            type:String,
            required:false
        }
    }
)

const Users=mongoose.model("users",userSchema);

export default Users;