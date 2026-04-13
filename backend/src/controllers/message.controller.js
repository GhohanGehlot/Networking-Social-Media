import { Message } from "../models/message.model.js";

export const getMessages = async(req ,res , next) => {
    try {
        const { id : groupId} = req.params;

        const messages = await Message.find({groupId}).populate("sender" , "username").sort({ createdAt : 1});

        return res.json({
            success : true,
            messages
        })
    } catch (error) {
        next(error)
    }
}