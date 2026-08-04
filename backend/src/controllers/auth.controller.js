import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {generateAccessToken} from "../utils/jwt.js";


async function signup(req,res){
    try{
        const{username, email, password}  = req.validatedData;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            email,
            password: hashedPassword, 
        });

        res.status(201).json({
            "success": true,
            "message": "User created successfully",
            "data":{
                username,
                email,
            }
        })

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            "success": false,
            "message": "something went wrong",
            "error": error.message
        });
    }

}


async function login(req, res){
    try{
        const {email, password} = req.validatedData;
        const user = await User.findOne({email})
        if(!user){
            return(
                res.status(401).json({
                "success": false,
                "message": "invalid email or password"
                })
        )
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            console.log("invalid password");
            return(
                res.status(401).json({
                "success": false,
                "message": "invalid email or password"
                })
            )
        }
        
        const token = generateAccessToken(user._id);

        res.cookie(
            'token',
            token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: process.env.COOKIE_MAX_AGE
            }
        )

        res.status(200).json({
                "success": true,
                "message": "Login successful"
            });


        
    }
    catch(error){
        console.error(error);
        res.statur(500).json({
            "success": false,
            "message": "Login failed"
        })
    }

    
}


function logout(req, res) {

    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        res.status(200).json({
            "success": true,
            "message": "Logged out successfully"
        }); 
    }
    catch(error){
        console.error("Logout error :",error);
        res.status(500).json({
            "success": false,
            "message": "Logout unsuccessful"
        })
    }
    
}


async function getCurrentUser(req, res){
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return(
                res.status(404).json({
                    "success": false,
                    "message": "User not found"
                })
            )
        }

        res.status(200).json({
            "success": true,
            "message": "User found",
            "data": user
        })
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({
            "success":  false,
             "message": "something went wrong"
        })
    }
}




export {signup, login, logout, getCurrentUser};