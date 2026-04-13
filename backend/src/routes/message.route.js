import express from 'express';
import { authorisedUser } from '../middlewares/auth.middleware.js';
import { getMessages } from '../controllers/message.controller.js';


const messageRoute = express.Router();

messageRoute.get("/:id" , authorisedUser , getMessages )

export default messageRoute;

