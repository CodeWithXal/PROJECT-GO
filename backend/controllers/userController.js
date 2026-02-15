const {userModel} = require("../models/users");


// Complete Profile Function

async function completeProfile(req, res){
    const {bio, skills, education, experience} = req.body;

    try{
        const updatedUser = await userModel.findByIdAndUpdate(req.userId, {
            bio,
            skills,
            education,
            experience,
            profileCompleted:true
        },{ returnDocument: "after" });

        res.json({
            message : "Profile completed",
            profileCompleted: updatedUser.profileCompleted
        });
    }
    catch(err){
        res.json({
            message : "Error Updating Profile",
            error : err.message
        });
    }
}


module.exports = {completeProfile}