import { GroupModel } from "../models/group.model.js";


export const hostVerification = async (req , res, next ) => {

    try {
        
        const { _id } = req.user;

        const {id : groupId} = req.params;

        const group = await GroupModel.findById(groupId);

        if(_id.toString() !== group.host.toString()){
            return res.json({
                success : false,
                message : "User is not Host"
            })
        }

        next();
    } catch (error) {
       next(error) 
    }
}