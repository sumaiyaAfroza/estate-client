
import { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/profile?email=${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  if (loading || !profile) {
    return <div className="text-center mt-10">Loading Profile...</div>;
  }

  const {
    name = "Anonymous",
    image = "https://i.ibb.co/t3fD2jf/user.png",
    role,
    email,
    phone
  } = profile;
  console.log(role);



  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 shadow-lg rounded-xl bg-white">
      <div className="flex items-center space-x-6">
        <img
          src={image}
          alt="Profile"
          className="w-28 h-28 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2> 
          <p className="text-gray-600">{email}</p>

          {/* Show role only if it's not 'user' */}
          {role && role !== "user" && (
            <p className="flex items-center gap-2 mt-1 text-sm text-blue-600">
              <FaUserShield /> <span className="capitalize">{role}</span>
            </p>
          )}



          {/* Show phone if exists */}
          {phone && (
            <p className="text-sm text-gray-500 mt-1">📞 {phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
