import { v2 as cloudinary } from "cloudinary";
import { env } from "./environment";

cloudinary.config({
  cloud_name: env.CLOUD_IMG_NAME,
  api_key: env.CLOUD_IMG_API_KEY,
  api_secret: env.CLOUD_IMG_SECRET,
});

export default cloudinary;
