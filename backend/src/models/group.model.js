import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true , "Please add the name of group"],
    },
    description: {
        type : String,
        default: "This is our Super Duber Group"
    },
    host: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User'
    },

    members : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],

    numberOfMembers : {
        type : Number,
        required : [true , "Please Provide the number of members who can join the group"],
        min : [ 3 , "Minimum 5 Members Required"],
        max : [ 100 , "Maximum 100 Members allowed "]
    },

    tag : {
        type : String,
        unique : true
    },

    category : {
        type : String,
        enum: ['Finance', 'AI', 'Tech', 'Health', 'Education', 'Business', 'Fun' , 'Other'],
        required : [true , "Please select the category"]

    }

} , {
    timestamps : true
})



groupSchema.pre('save' , async function ( ) {
    if(!this.tag){
        this.tag = '#' + Math.floor(10000000 + Math.random() * 90000000);
    }
})

export const GroupModel = mongoose.model("Group" , groupSchema);