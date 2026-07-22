import User from "../models/user.model.js";
import bcrypt from "bcrypt";


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
            console.log("user not found");
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
        res.status(200).json({
                "success": true,
                "message": "Login successful"
            });
    }
    catch(error){
        console.error(error);
    }
}




export {signup, login};