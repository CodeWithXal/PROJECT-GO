require("dotenv").config();
const{z} = require("zod");
const bcrypt = require("bcrypt");
const {Router} = require("express");
const {userModel} = require("../models/users");
const authRouter = Router();



async function signup(req, res){

    // fetching data 

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


    // input validation

    const requireBody = z.object({
        username : z.string().min(3,"Name must be atleeast 3 characters").max(50, "Name must be atmost 50 characters"),
        email : z.string().email("invalid email format"),
        password : z.string().min(8, "The password must be atleast 8 characters")
        .max(25, "Thhe passwoed must be atmost 25 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    });

    const parseData = requireBody.safeParse(req.body);

        if(!parseData.success){

            const errMsg = parseData.error.issues.map(issue=>({
                field : issue.path[0],
                message : issue.message
            }));

            res.status(400).json({
                message : "Incorrect Format",
                error : errMsg
            });
            return;
        }

        try{
            const hashedPassword = await bcrypt.hash(password,10);
            await userModel.create({
                username,
                email,
                password : hashedPassword   
            });

            return res.json({
                message : "You are signed up successfully"
            });
        }
        catch(error){
            return res.status(400).json({
                message : "User already exists or Database error",
                error : error.messaage
            });
        }
}

// signin function 

async function signin(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email : email
    })

    if(!user){
        res.ststus(400).json({
            message : "User not found"
        })
    }

    const password_match = await bcrypt.compare(password, user.password);

    if(password){
        res.json({
            message : "signed in successfully"
        });
    }

    else{
        res.status(403).json({
            message : "Email or Password is Incorrect"
        });
    }

    // do the jwt 
}



authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

module.exports = {
    authRouter : authRouter
}