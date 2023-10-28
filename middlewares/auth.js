import user from "../models/user.js";
import jwt from "jsonwebtoken";

export const isauthenticated=async(req,res,next)=>{
    const {token}=  req.cookies;
// console.log(token)

if(!token)
return res.status(404).json({
    sucess:false,
    message:"login first"
})

const decoded= jwt.verify(token,"qwertyuiop")

req.userdetail= await user.findById(decoded._id)
next();

}