import { useState } from "react";
import { toast } from "react-hot-toast";

// Compress image using Canvas API before upload
const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Scale down if exceeds maxWidth
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Compression failed"));
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => reject(new Error("Image load failed"));
    };
    reader.onerror = () => reject(reader.error);
  });
};

const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const uploadImage = async (file) => {
    try {
      // Compress the image first
      const compressedBlob = await compressImage(file, 1200, 0.8);
      const compressedFile = new File([compressedBlob], file.name, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      const formData = new FormData();
      formData.append("image", compressedFile);
      const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD_KEY}`;

      setUploading(true);
      const response = await fetch(uploadUrl, { method: "POST", body: formData });
      const data = await response.json();

      if (data.success) {
        const url = data.data.url;
        setUploadedUrl(url);
        toast.success("Image uploaded successfully!");
        return url;
      } else {
        toast.error(data.error?.message || "Image upload failed!");
        return null;
      }
    } catch (err) {
      toast.error("Image upload failed!");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, uploadedUrl, setUploadedUrl };
};

export default useImageUpload;
export { compressImage };
