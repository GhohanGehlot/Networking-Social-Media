import { GroupModel } from "../models/group.model.js";



//POST controller
export const createGroup = async ( req , res , next ) => {

    try {
        

        const { name , description , numberOfMembers , category  } = req.body;
        const { id } = req.user;
    
        //host as a first member
        let members = [id];
    
        const newGroup = new GroupModel({
            name,
            description,
            numberOfMembers,
            category,
            host : id,
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
        const { id } = req.user;

        const group = await GroupModel.findById(groupId);

        let members = group.members;
        

        if(members.length >= group.numberOfMembers){
            return res.json({
                success : false,
                message: "Group is full"
            })
        }

        if(members.includes(id)){
            return res.json({
                success : false,
                message: "User is already in the group"
            })
        }

        members.push(id);

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
        const { id } = req.user;

        const group = await GroupModel.findById(groupId);

        let members = group.members;

        if(!group){
            return res.json({
                success : false,
                message: 'Group not found'
            })
        }

        if(!members.includes(id)){
            return res.json({
                success : false,
                message: 'User is not a member of group'
            })
        }

        members.filter(memberId => memberId.toString() !== id.toString());

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
 export const SearchGroup = async (req , res , next) => {
    
}

export const ViewGroup = async (req , res , next) => {
    
}


export const MyGroup = async (req , res , next) => {
    
}


//DELETE controller

export const DeleteGroup = async (req , res , next) => {
    
}