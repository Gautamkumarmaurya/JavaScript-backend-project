import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";


cloudinary.config({ 
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME, 
  api_key : process.env.CLOUDINARY_API_KEY, 
  api_secret : process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
            folder: "techstuff",
        });

        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        if (error.http_code === 403) {
            throw new ApiError(
                502,
                "Cloudinary rejected the upload. Give the configured API key upload/create permission."
            );
        }

        throw new ApiError(502, "Cloudinary image upload failed");
    } finally {
        await fs.promises.unlink(localFilePath).catch((unlinkError) => {
            if (unlinkError.code !== "ENOENT") {
                console.error("Temporary-file cleanup error:", unlinkError.message);
            }
        });
    }
};

export { uploadOnCloudinary };
