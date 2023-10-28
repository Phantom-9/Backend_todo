
import user from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { sendcookie } from "../utils/features.js"
import  errorhandler from "../middlewares/error.js"
import { validationResult } from "express-validator/check"

export const login= async(req,res,next)=>{
    
    const {email,password}=req.body;

    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            sucess:false,
            error:errors.array()[0].message,
        })
    }

    let user1= await user.findOne({email})
    // console.log("user1",user1)
    
    if(!user1) return res.status(404).json({
        sucess: false,
        message:"user doesn't exist",
    })

    const ismatch= await bcrypt.compare(password,user1.password)
    if(!ismatch) return res.status(404).json({
        sucess: false,
        message:"Invalid email or password",
    })
    sendcookie(user1,res,`welcome back,${user1.name}`,200)
}


 export const register = async(req,res,next)=>{

    const{name,email,password}= req.body;
    const image=req.file;


    let user1 =await user.findOne({email})
    if(!image){
        return res.status(422).json({
            sucess:false,
            message:"attached file is not an image"
        })
    }
    const imageUrl=image.path;

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            sucess:false,
            error:errors.array()[0].message,
        })
    }

    if(user1) return next(new errorhandler("user already exist",400))
   
    const hashedpass= await bcrypt.hash(password,10);

    let Newuser = await user.create({
        name,
        email,
        password : hashedpass
    })
    console.log("Newuser",Newuser);

   sendcookie(Newuser,res,"registered successfully",201)

}

export const getmydetail=async(req,res)=>{


res.status(200).json({
    sucess:true,
    userdetail:req.userdetail,
})

}


export const logout=(req,res)=>{
    res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
        sucess:true,
        
    })

}
// export default getAllUsers;
// export  {getNewUsers}; 




