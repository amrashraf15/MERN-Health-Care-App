import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const cookieName = role === "admin" ? "admin_token" : "patient_token";

  // ✅ Only set role-specific cookie
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export const generateTokenAndSetCookieForDoctor = (res,docId) => {
    const token =jwt.sign({ docId },process.env.JWT_SECRET,{
        expiresIn:"7d",
    })
    res.cookie("doctor_token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
        maxAge: 1 * 24 * 60 * 60 *1000,   //1 day
    });
    return token;
}
