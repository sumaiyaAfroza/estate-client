import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-hot-toast";

const AddProperty = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Preview images before upload
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrls([URL.createObjectURL(file)]);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD_KEY}`;
    try {
      const res = await fetch(uploadUrl, { method: "POST", body: formData });
      const data = await res.json();
      return data.success ? data.data.url : null;
    } catch (err) {
      toast.error("Image upload failed!");
      return null;
    }
  };

  const onSubmit = async (data) => {
    const mainImage = data.mainImage?.[0];
    if (!mainImage) {
      toast.error("Please upload at least one main image.");
      return;
    }

    setUploading(true);
    try {
      // Upload main image first
      const mainImageUrl = await uploadToImgBB(mainImage);
      if (!mainImageUrl) return;

      // Upload gallery images
      const galleryFiles = data.galleryImages || [];
      const uploadedGalleryUrls = [];
      for (const file of galleryFiles) {
        const url = await uploadToImgBB(file);
        if (url) uploadedGalleryUrls.push(url);
      }

      const propertyData = {
        title: data.title,
        location: data.location,
        description: data.description || "",
        type: data.type || "house",
        bedrooms: Number(data.bedrooms) || 0,
        bathrooms: Number(data.bathrooms) || 0,
        area: Number(data.area) || 0,
        mainImage: mainImageUrl,
        imageUrls: [mainImageUrl, ...uploadedGalleryUrls],
        agentName: user.displayName,
        agentEmail: user.email,
        agentImage: user.photoURL,
        price: {
          min: Number(data.price.min),
          max: Number(data.price.max),
        },
        status: "pending",
        verified: false,
        isAdvertised: false,
        createdAt: new Date(),
      };

      const result = await axiosInstance.post("/addProperty", propertyData);
      if (result.data.success) {
        toast.success("Property added successfully!");
        reset();
        setPreviewUrls([]);
      } else {
        toast.error("Failed to add property!");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Server error while adding property.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Add New Property
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Description Section */}
        <div className="md:w-1/2">
          <div className="rounded-xl overflow-hidden bg-gray-100 shadow-sm h-full">
            <div className="relative pb-[66.66%]">
              <img
                src="https://i.ibb.co/tpyMQ6Wq/download.jpg"
                alt="Property"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h1 className="text-xl font-semibold text-gray-900 underline mb-3 text-center">
                Real Estate Platform
              </h1>
              <p className="text-gray-700 text-justify text-sm md:text-base">
                As a verified agent, you can list new properties for sale on our platform. 
                Fill out the form with accurate information including the property title, 
                location, price range, and a high-quality image. All submitted listings go 
                through a quick review process before appearing live. Make your property visible 
                to hundreds of potential buyers and grow your real estate reach with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-1/2 space-y-5 border border-gray-200 p-6 rounded-xl shadow-sm"
        >
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Property Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full input input-bordered"
              placeholder="Enter property title"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              {...register("location", { required: true })}
              className="w-full input input-bordered"
              placeholder="Enter location"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block mb-1 font-medium">Property Type</label>
            <select {...register("type")} className="w-full select select-bordered">
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
              <option value="villa">Villa</option>
            </select>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Bedrooms</label>
              <input
                type="number"
                {...register("bedrooms")}
                className="w-full input input-bordered"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bathrooms</label>
              <input
                type="number"
                {...register("bathrooms")}
                className="w-full input input-bordered"
                placeholder="0"
              />
            </div>
          </div>

          {/* Area */}
          <div>
            <label className="block mb-1 font-medium">Area (sq ft)</label>
            <input
              type="number"
              {...register("area")}
              className="w-full input input-bordered"
              placeholder="Enter area in sq ft"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full textarea textarea-bordered h-24"
              placeholder="Enter property description..."
            />
          </div>

          {/* Main Image */}
          <div>
            <label className="block mb-1 font-medium">Main Image *</label>
            <input
              type="file"
              accept="image/*"
              {...register("mainImage", { required: "Main image is required" })}
              className="file-input file-input-bordered w-full"
              onChange={handleMainImageChange}
            />
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block mb-1 font-medium">Gallery Images (Optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("galleryImages")}
              className="file-input file-input-bordered w-full"
              onChange={handleGalleryChange}
            />
            {previewUrls.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {previewUrls.map((url, i) => (
                  <img key={i} src={url} alt={`preview ${i}`} className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            )}
          </div>

          {/* Agent Info */}
          <div>
            <label className="block mb-1 font-medium">Agent Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Agent Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block mb-1 font-medium">Price Range (৳)</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                {...register("price.min", { required: true, min: 0, valueAsNumber: true })}
                className="w-full input input-bordered"
                placeholder="Min Price"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                {...register("price.max", { required: true, min: 0, valueAsNumber: true })}
                className="w-full input input-bordered"
                placeholder="Max Price"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <span className="loading loading-spinner"></span> Uploading...
                </>
              ) : (
                "Add Property"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
