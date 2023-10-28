import express from "express"
import mongoose from "mongoose"
import router from "./routes/user.js"
import taskrouter from "./routes/task.js"
import cookieParser from "cookie-parser";
import {errormiddleware} from "./middlewares/error.js"
import cors from "cors";
import multer from "multer";
const app = express();

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString() +'-'+file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
// using middleware
app.use(multer({Storage:fileStorage, fileFilter:fileFilter}).single('image'))
app.use(express.json())
app.use(cookieParser())
app.use(cors());

//using routers
app.use("/users",router);
app.use("/task",taskrouter);

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbname:"backendAPI"
})
.then(()=>{console.log("database connected")})
.catch((e)=>{console.log("e")})


app.use(errormiddleware);





app.listen(4000,()=>{
    console.log("server is working")
} );