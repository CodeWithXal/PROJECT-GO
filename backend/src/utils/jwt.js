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
        //console.log( "token: ", token);
        return token ;
}


function verifyAccessToken(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
}
export {generateAccessToken, verifyAccessToken};