// import jwt from "jsonwebtoken"

// const isAuth=async(req,res,next)=>{
//     try {
//         let token=req.coookies.token
//         if(!token){
//             return res.status(400).json({message:"User does not have a token"})
//         }
//         let verifyToken=jwt.verify(token,process.env.JWT_SECRET)
//         if(!verifyToken){
//             return res.status(400).json({message:"User does not have a valid token"})
//         }
//         req.userId=verifyToken.userId
//         next()
//     } catch (error) {
//         console.log("isAuth error")
//         return res.status(400).json({message:`isAuth error: ${error}`})
//     }
// }

// export default isAuth

import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ IMPORTANT: 'cookies' not 'coookies'

    if (!token) {
      return res.status(400).json({ message: "User does not have a token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId; // ✅ This will be used to fetch user
    next();
  } catch (error) {
    console.log("isAuth error:", error.message);
    return res.status(401).json({ message: "Not authorized" });
  }
};

export default isAuth;
