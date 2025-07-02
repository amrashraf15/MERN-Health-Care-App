import jwt from "jsonwebtoken"
import Doctor from "../models/doctor.js";
export const authDoctor = async (req,res,next) =>{
    try {
            const token = req.cookies.doctor_token;
                if(!token){
                    return res.status(401).json({success:false,message:"Unauthorized - No Token Provided"});
                }
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                if(!decoded){
                    return res.status(401).json({success:false,message:"Unauthorized - Invalid Token "});   
                }
                const doctor = await Doctor.findById(decoded.docId).select("-password");
                if(!doctor){
                    return res.status(404).json({success:false,message:"Doctor Not Found"})
                }
                req.doctor = doctor;
                next();
    } catch (error) {
        console.log("error in authDoctor controller :",error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}