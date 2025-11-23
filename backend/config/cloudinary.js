// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"
// const uploadOnCloudinary=async(filePath)=>{
//     console.log(filePath)
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET 
//     });
//     try {
//         if(!filePath){
//             return null
//         }
//         const uploadResult = await cloudinary.uploader.upload(filePath)
//         fs.unlinkSync(filePath)
//         return uploadResult.secure_url
//     } catch (error) {
//         fs.unlinkSync(filePath)
//         console.log(error)
//     }
    
// }

// export default uploadOnCloudinary

// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// import dotenv from "dotenv";
// dotenv.config();

// console.log("Cloudinary ENV Vars =>", {
//   name: process.env.CLOUDINARY_NAME,
//   key: process.env.CLOUDINARY_API_KEY,
//   secret: process.env.CLOUDINARY_API_SECRET,
// });

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     const result = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "image",
//     });

//     // ✅ Only delete if file still exists
//     if (fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath);
//     }

//     return result.secure_url;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error.message);
//     return null;
//   }
// };

// export default uploadOnCloudinary;

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config()
console.log("Cloudinary env:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✓ present" : "❌ missing",
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      throw new Error("File does not exist: " + localFilePath);
    }

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: "products", // optional folder in your Cloudinary dashboard
    });

    // ✅ Delete the file after upload
    fs.unlinkSync(localFilePath);

    return result.secure_url; // return only the URL
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null; // return null to indicate failure
  }
};

export default uploadOnCloudinary;

