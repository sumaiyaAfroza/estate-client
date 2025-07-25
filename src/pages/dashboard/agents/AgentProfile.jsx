import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AgentProfile = () => {
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
    return <div className="text-center mt-10 text-lg font-semibold">Loading Profile...</div>;
  }

  const {
    name = "Anonymous",
    image = "https://i.ibb.co/t3fD2jf/user.png",
    role,
    email,
    phone,
    createdAt,
    agencyName,
  } = profile;

  return (
    <div className="relative max-w-3xl mx-auto mt-12">
      {/* Background Banner */}
      <div
        className="h-74 w-full rounded-xl shadow-md bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1050&q=80')",
        }}
      ></div>

      {/* Profile Card */}
      <div className="bg-white p-6 shadow-lg rounded-xl -mt-20 relative z-10">
        <div className="flex items-center gap-6">
          <img
            src={image}
            alt="Agent"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-600">{email}</p>

            {role && role !== "user" && (
              <p className="mt-2 inline-flex items-center text-blue-600 text-sm font-medium">
                <FaUserTie className="mr-1" />{" "}
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </p>
            )}

            {phone && <p className="text-sm text-gray-500 mt-1">📞 {phone}</p>}
            {agencyName && <p className="text-sm text-gray-500">🏢 {agencyName}</p>}

            {createdAt && (
              <p className="text-xs mt-1 text-gray-400">
                Joined on: {new Date(createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
