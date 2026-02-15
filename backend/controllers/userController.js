const {Router} = require("express");
const userRouter = Router();
const jwt_secret = process.env.JWT_AUTH_SECRET;
const {authMiddleware} = require("../middleware/auth_Middleware");
const userAuth = authMiddleware(jwt_secret);


// Complete Profile Function

async function completeProfile(req, res){
    const {bio, skills, education, experience} = req.body;

    try{
        await userModel.findByIdAndUpdate(req.userId, {
            bio,
            skills,
            education,
            experience,
            profile_completed:true
        });

        res.json({
            message : "Profile completed"
        });
    }
    catch(err){
        res.json({
            message : "Error Updating Profile",
            error : err
        });
    }
}

userRouter.put("/complete-profile", userAuth, completeProfile);