import {task} from "../models/task.js"

export const newtask=async(req,res,next)=>{

    const {title , description}= req.body;

    await task.create({
        title,
        description,
        user:req.userdetail,
    })
    res.status(201).json({
        sucess:true,
        message:"task added successfully"

    })


}

export const getmytask=async(req,res,next)=>{
    const userid=req.userdetail._id;

    const tasklist = await task.find({user: userid})
    res.status(200).json({
        sucess:true,
        tasklist,
    })


}

export const updatetask=async(req,res,next)=>{
   
   const {id}= req.params;

   const task1= await task.findById(id);

   task1.iscompleted= !task1.iscompleted;

   await task1.save();

    res.status(200).json({
        sucess:true,
        message:"task updated!"


})
}

export const deletetask=async(req,res,next)=>{
    const {id}= req.params;

   const task2= await task.findById(id);
   if(!task2)return res.status(404).json({
    sucess:false,
    message:"Invalid id"
   })
   await task2.deleteOne();
    
    res.status(200).json({
        sucess:true,
       message:"task deleted"
    })


}