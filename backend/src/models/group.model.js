import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
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

} , {
    timestamps : true
})



groupSchema.pre('save' , function (next) {
    if(!this.tag){
        this.tag = '#' + Math.floor(10000000 + Math.random() * 90000000);
    }
    next();
})

export const groupModel = mongoose.model("Group" , groupSchema);