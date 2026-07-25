import { verifyAccessToken } from "../utils/jwt.js";


async function authMiddleware(req, res, next ){
    try{
        const token =  req.cookies.token;
        if(!token){
            return(
                res.status(401).json({
                    "success": false,
                    "message": "Unauthorized"
                })
            )
        }
        
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        
        next();
        
    }
    catch(error){
        console.error(error.message);
        return(
                res.status(401).json({
                    "success": false,
                    "message": "Unauthorized"
                })
            )
        
    }
}

export default authMiddleware;