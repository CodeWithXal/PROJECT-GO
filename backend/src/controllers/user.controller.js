import User from "../models/user.model.js";
import bcrypt from "bcrypt";


async function createUser(req,res){
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

export {createUser};