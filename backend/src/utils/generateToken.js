import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";

export const generateToken =  (id) => {
    const token = jwt.sign( {id} , JWT_SECRET , {expiresIn : '7d'} );
    return token;
}