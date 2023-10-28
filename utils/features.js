import jwt from "jsonwebtoken"

export const  sendcookie=(user1,res,message,statuscode=200)=>{
    const token = jwt.sign({_id:user1._id},"qwertyuiop")

    res.status(statuscode).cookie("token",token,{
        httpOnly:true,
        maxAge: 15*60*1000,
    }).json({
        sucess:true,
        message
    })
}