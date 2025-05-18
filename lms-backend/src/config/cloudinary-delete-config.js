import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        if (result.result !== 'ok' && result.result !== 'not found') {
            throw new Error(`Failed to delete ${resourceType}: ${result.result}`);
        }

        return result;
    } catch (error) {
        throw new Error(`Cloudinary ${resourceType} deletion failed: ${error.message}`);
    }
};