import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // TODO: Ganti dengan cloudname-mu
  api_key: process.env.CLOUDINARY_API_KEY, // TODO: Ganti dengan API Key-mu
  api_secret: process.env.CLOUDINARY_API_SECRET, // TODO: Ganti dengan API Secret-mu
  secure: process.env.CLOUDINARY_IS_SECURE === "true",
});

export default cloudinary;
