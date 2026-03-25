import { UserModel } from "../models/user.model.js";


export const userProfile = async (req , res , next) => {
    try {
        const {_id} = req.user;

        const user = await UserModel.findById(_id);

        res.json({
            success : true,
            message : "User Detail fetched Successfully",
            user
        })


    } catch (error) {
        next(error);
    }
}