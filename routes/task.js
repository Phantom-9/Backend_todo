import express from "express";
import {task} from "../models/task.js"
import { isauthenticated } from "../middlewares/auth.js";
import { newtask ,getmytask,updatetask,deletetask} from "../controlers/task.js";
const Router= express.Router();

Router.post("/new",isauthenticated,newtask);
Router.get("/my",isauthenticated,getmytask);
Router.route("/:id").put(isauthenticated,updatetask).delete(isauthenticated,deletetask)


export default Router;