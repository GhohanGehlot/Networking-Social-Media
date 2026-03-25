import express from 'express';
import { userProfile } from '../controllers/user.controller.js';
import { authorisedUser } from '../middlewares/auth.middleware';

const userRoute = express.Router();

userRoute.get("/profile" , authorisedUser ,userProfile );


export default userRoute;