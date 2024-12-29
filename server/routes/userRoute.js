import express from 'express'
import Users from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const userRoutes = express.Router()

userRoutes.post("/register",async (req, res) => {
    const { userName, userMail, userDob, userGender,userResume,userProfile } = req.body;
    try {
        if (!userName || !userMail ||!userDob || !userGender || !userResume || !userProfile) {
            return res.status(200).json({ msg: "All Fields Required." })
        }
        const exists = await Users.findOne({ userMail: userMail })
        if (!exists) {
            const data = await new Users(req.body)
            const result = await data.save();
            if (result) {
                return res.status(200).json({ msg: "Registration Success" })
            }
            return res.status(400).json({ msg: "internal server error" })
        }
        res.status(200).json({ msg: "Mail already exists" });
    }
    catch (error) {
        res.status(400).json({ msg: error })
    }
})

userRoutes.post("/login",async(req,res)=>{
    const {userMail,userPassword}=req.body;
    try{
        const user=await Users.findOne({userMail,userDob:userPassword})
        if(!user){
            return res.status(200).json({msg:"invalid credentials"})
        }
        const payload={
            userMail:user.userMail,
            userDob:user.userDob,
            userGender:user.userGender,
            userProfile:user.userProfile,
            userResume:user.userResume,
            userName:user.userName
        }
        const token=jwt.sign(payload,process.env.SECRET_KEY);
        token ?res.status(200).json({token:token,msg:"Login Success"}) :res.status(400).json({msg:"token not created"})
    }
    catch(error){
        res.status(200).json({msg:error})
    }
})

userRoutes.post("/VerifyToken", async (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(200).json({ msg: "JWT must be provided" });
    }
    try {
      const userInfo = jwt.verify(token,process.env.SECRET_KEY);
      return res.status(200).json(userInfo);
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  });

export default userRoutes;