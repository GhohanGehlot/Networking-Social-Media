import { GroupModel } from "../models/group.model.js";



//POST controller
export const createGroup = async ( req , res , next ) => {

    try {
        
        const { name , description , numberOfMembers , category  } = req.body;
        const { _id } = req.user;
    
        //host as a first member
        let members = [_id];
    
        const newGroup = new GroupModel({
            name,
            description,
            numberOfMembers,
            category,
            host : _id,
            members,
        })
    
       await newGroup.save();
        
        return res.json({
            success : true,
            message : "New group created"
            
        })
        
    } catch (error) {

       next(error)
    }

}


export const joinGroup = async (req , res , next) => {
    try {
        const {id : groupId} = req.params;
        const { _id } = req.user;

        const group = await GroupModel.findById(groupId);

        let members = group.members;
        

        if(members.length >= group.numberOfMembers){
            return res.json({
                success : false,
                message: "Group is full"
            })
        }

        if(members.includes(_id)){
            return res.json({
                success : false,
                message: "User is already in the group"
            })
        }

        members.push(_id);

        await group.save();
        
        return res.json({
            success: true,
            message : "User joined Successfully"
        })


    } catch (error) {
        next(error);
    }
}



export const leaveGroup = async (req , res , next) => {
    try {
        const {id : groupId} = req.params;
        const { _id } = req.user;

        const group = await GroupModel.findById(groupId);

        let members = group.members;

        if(!group){
            return res.json({
                success : false,
                message: 'Group not found'
            })
        }

        if(!members.includes(_id)){
            return res.json({
                success : false,
                message: 'User is not a member of group'
            })
        }

        members.filter(memberId => memberId.toString() !== _id.toString());

        await group.save();
        
        return res.json({
            success: true,
            message : "User left the group"
        })

    } catch (error) {
        next(error)
    }
}



//GET controller
 export const searchGroup = async (req , res , next) => {

 try {
       const {name} = req.query;
       const groups = await GroupModel.find({ name : { $regex : name , $options : 'i'}});

       return res.json({
        success : true,
        message : "group searched",
        groups
       })


 } catch (error) {
    next(error);
 }

    
    
    
    
}

export const ViewGroup = async (req , res , next) => {
 try {
       const { id: groupId } = req.params;

       const group = await GroupModel.findById(groupId);

       return res.json({
        success : true,
        message : "Group viewed",
        group
       })

 } catch (error) {
    next(error);
 }

}


export const MyGroup = async (req , res , next) => {
   try {
    
     const { _id } = req.user;
 
     const groups = await GroupModel.find({ members : _id });
 
     return res.json({
         success : true,
         message : "My groups data fetched successfully",
         groups,
     })
   } catch (error) {
    next(error)
   }

}


//DELETE controller

export const DeleteGroup = async (req , res , next) => {
    try {
        const {id : groupId} = req.params;

         await GroupModel.deleteOne({ _id : groupId});

        res.json({
            success : true,
            message : "Group got deleted"
        })

        
    } catch (error) {
       next(error) 
    }
}