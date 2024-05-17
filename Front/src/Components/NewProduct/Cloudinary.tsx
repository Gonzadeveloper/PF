import axios from "axios"

export const uploadImage = async (file: File): Promise<string> => {
    const cloudinaryConfig = {
        cloudName: 'dulvunn4j',
        apiKey: '869726613913662',
        uploadPreset: 'preset_PF'
    }

    const data = new FormData();
    data.append('file', file)
    data.append('upload_preset', cloudinaryConfig.uploadPreset)

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, data)
        return response.data.secure_url
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image')
    }
}