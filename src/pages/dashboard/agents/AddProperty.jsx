
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import useImageUpload from "../../../hooks/useImageUpload";
import { toast } from "react-hot-toast";

const AddProperty = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const { uploadImage, uploading } = useImageUpload();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    const imageUrl = await uploadImage(imageFile);
    if (!imageUrl) return;

    const propertyData = {
      title: data.title,
      location: data.location,
      imageUrl: imageUrl,
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

    try {
      const result = await axiosInstance.post("/addProperty", propertyData);
      if (result.data.success) {
        toast.success("Property added successfully!");
        reset();
      } else {
        toast.error("Failed to add property!");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Server error while adding property.");
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

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Property Image</label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full"
              accept="image/*"
            />
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
                {...register("price.min", {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
                className="w-full input input-bordered"
                placeholder="Min Price"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                {...register("price.max", {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
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
              {uploading ? "Uploading..." : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
