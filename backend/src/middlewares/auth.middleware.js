import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import { UserModel } from "../models/user.model.js";

export const authorisedUser = async (req , res , next) => {
    try {
        const {token} = req.cookies;

        if(!token){
            return res.json({
                success : false,
                message : "User is not Authorised"
            })
        }

       const tokenDecode = jwt.verify(token , JWT_SECRET);
       const userId = tokenDecode.id;

       const user = await UserModel.findById(userId);

       req.user = user;
        next()
    } catch (error) {
        next(error)
    }
}