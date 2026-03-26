

export const userProfile = async (req , res , next) => {
    try {  
        res.json({
            success : true,
            message : "User Detail fetched Successfully",
            user : req.user
        })

    } catch (error) {
        next(error);
    }
}