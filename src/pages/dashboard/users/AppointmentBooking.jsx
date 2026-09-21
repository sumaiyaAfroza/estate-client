import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const AppointmentBooking = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch property details
  const { data: property, isLoading } = useQuery({
    queryKey: ["property-appointment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const appointmentData = {
        propertyId: id,
        propertyName: property?.title,
        propertyLocation: property?.location,
        agentEmail: property?.agentEmail,
        agentName: property?.agentName,
        buyerName: user?.displayName,
        buyerEmail: user?.email,
        buyerPhone: data.phone,
        buyerImage: user?.photoURL,
        date: data.date,
        time: data.time,
        note: data.note || "",
        status: "pending",
        createdAt: new Date(),
      };
      const res = await axiosSecure.post("/appointments", appointmentData);
      if (res.data.insertedId) {
        setSuccess(true);
        toast.success("Appointment booked successfully! The agent will contact you soon.");
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading && !property) {
    return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {success ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">Appointment Booked!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You're all set for {property?.title} in {property?.location}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Agent {property?.agentName} ({property?.agentEmail}) will contact you shortly.
          </p>
          <Link to={`/propertyDetails/${id}`} className="btn btn-primary">
            Back to Property
          </Link>
        </div>
      ) : (
        <>
          {/* Property Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-6">
            <img
              src={property?.imageUrls?.[0] || property?.imageUrl}
              alt={property?.title}
              className="w-full md:w-48 h-32 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{property?.title}</h1>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                {property?.location}
              </p>
              <p className="text-xl font-bold text-emerald-600 mt-2">
                ৳{property?.price?.min?.toLocaleString()} – {property?.price?.max?.toLocaleString()}
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1"><User size={14} /> {property?.agentName}</span>
                <span className="flex items-center gap-1"><Mail size={14} /> {property?.agentEmail}</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-emerald-500" />
              Book an Appointment
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Calendar size={14} className="inline mr-1" /> Preferred Date *
                  </label>
                  <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    min={new Date().toISOString().split("T")[0]}
                    className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600"
                  />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Clock size={14} className="inline mr-1" /> Preferred Time *
                  </label>
                  <select
                    {...register("time", { required: "Time is required" })}
                    className="select select-bordered w-full dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">Select Time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                  </select>
                  {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Phone size={14} className="inline mr-1" /> Your Phone Number *
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone number is required" })}
                  placeholder="+880 1XXX-XXXXXX"
                  className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <MessageSquare size={14} className="inline mr-1" /> Additional Note
                </label>
                <textarea
                  {...register("note")}
                  placeholder="Any special requests or questions..."
                  className="textarea textarea-bordered w-full h-24 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Auto-filled user info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300">
                <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
                <p><strong>Email:</strong> {user?.email || "N/A"}</p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary w-full"
              >
                {submitting ? (
                  <><span className="loading loading-spinner loading-sm"></span> Booking...</>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentBooking;
