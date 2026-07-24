import jwt from "jsonwebtoken";

function generateAccessToken(userId){
        const token = jwt.sign(
            {
                userId
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
                algorithm: "HS256"   
            }
        )
    console.log( "token: ", token);
    return token ;
}

export default generateAccessToken;