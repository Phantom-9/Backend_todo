import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    name:{
        type: "string",
        required:true,
    }, 
    email:{
        type: "string",
        unique: true,
        required:true,
    },
   password:{
       type:"string",
    //    select:false,
       required:true,
   },
   Createdat:{
     type:Date,
     default:Date.now,
   },
});
 const user=mongoose.model("users",Schema)
 export default user
