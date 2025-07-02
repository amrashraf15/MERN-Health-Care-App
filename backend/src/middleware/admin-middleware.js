import jwt from "jsonwebtoken"
import User from "../models/user.js";
export const authAdmin = async (req,res,next) =>{
    try {
            const token = req.cookies.admin_token;
                if(!token){
                    return res.status(401).json({success:false,message:"Unauthorized - No Token Provided"});
                }
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                if(!decoded){
                    return res.status(401).json({success:false,message:"Unauthorized - Invalid Token "});   
                }
                const user = await User.findById(decoded.userId).select("-password");
                if(!user){
                    return res.status(404).json({success:false,message:"User Not Found"})
                }
                if( user.email !==process.env.ADMIN_EMAIL || user.role !== "admin"){
                    return res.status(400).json({success:false,message: "you are not an admin"})
                }
                req.user = user;
                next();
    } catch (error) {
        console.log("error in authAdmin controller :",error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}