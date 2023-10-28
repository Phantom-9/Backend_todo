import express from "express"
import User from "../models/user.js"
import { login, register,getmydetail,logout } from "../controlers/user.js";
import { isauthenticated } from "../middlewares/auth.js";
import { check } from "express-validator/check";



const router = express.Router();


// router.get("/all",getAllUsers)
router.post("/login",check('email',"please enter a valid email").isEmail().check('password','enter a min 5 char').isLength({min:5}).trim(),login)
router.get("/logout",logout)
router.post("/register",check('email',"please enter a valid email").isEmail().check('password','enter a min 5 char').isLength({min:5}).trim(),register)
router.get("/me",isauthenticated,getmydetail)

export default router;