import {UserModel} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import validate from "validator";
import { generateToken } from "../utils/generateToken.js";


//Register User
export const registerUser = async (req , res , next) => {
    try {
        
        const {username , email , password} = req.body;

        const user = await UserModel.findOne({email});

        if(user){
           return res.json({
                success : false,
                message : "User already Exist"
            })
        }

        if(!validate.isEmail(email) || !validate.isStrongPassword(password)){
          return res.json({
                success: false,
                message: "Your Email is invalid or your passowrd is not strong"
            })
        }

        const salt =  await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password , salt);

      

        const newUser = new UserModel({
            username,
            email,
            password : hashPassword,
        });

        
        await newUser.save();

        const token = generateToken(newUser._id);

        res.cookie("token" , token , {
            httpOnly : true,
        })

         res.json({
            success : true,
            message: "User registration successful",
            token,
        })

    } catch (error) {
      next(error);
    }
}


//Login User
export const loginUser = async (req , res , next) => {

    try {
        const {email , password} = req.body;

        const user = await UserModel.findOne({email});

        if(!user){
            return res.json({
                success: false,
                message: "User doesnt exist"
            })
        }

        const comparePassword = await bcrypt.compare( password ,user.password);

        if(comparePassword === false){
            return res.json({
                success: false,
                message: "Invalid Credentials"
            }) 
        }

        const token = generateToken(user._id);

        res.cookie("token" , token , {
            httpOnly: true
        })

        res.json({
            success : true,
            message: "User Logged In Successfully",
            token,
        })


    } catch (error) {
        next(error);
    }
}

