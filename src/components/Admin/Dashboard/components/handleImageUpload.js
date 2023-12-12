import axios from "axios";

// Hàm xử lý upload ảnh
const handleImageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "ovbags68");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dite4bta9/upload",
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    throw new Error("Error uploading image: " + error.message);
  }
};
export default handleImageUpload;
