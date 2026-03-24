import mongoose from "mongoose";
import validate from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [ true , "Please provide your name"],
    },
    email: {
        type: String,
        required : [ true , "Please provide your email"],
        unique : true,
        lowercase : true,
        validate: [validate.isEmail , "Please enter valid Email Address"]
    },
    password: {
        type: String,
        required : [ true , "Please provide your password"],
        validate: [validate.isStrongPassword , "Please set a strong password"]
    }

}, {
    timestamps : true
})


 export const UserModel = mongoose.model( "User" ,userSchema);

 