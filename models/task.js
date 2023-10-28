import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    title:{
        type: "string",
        require:true,
    },
    description :{
        type: "string",
        require:true,
    },
   iscompleted:{
       type:"boolean",
       default:false,
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
   },
   createdat:{
     type:Date,
     default:Date.now,
   },
});
 export const task=mongoose.model("Task",Schema)

