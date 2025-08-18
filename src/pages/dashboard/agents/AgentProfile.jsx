
import React, { useEffect, useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit3, 
  Camera,
  Save,
  X,
  Building,
  Globe
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/profile?email=${user.email}`)
        .then((res) => {
          setProfile(res.data);
          setEditData(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  // const handleEditToggle = () => {
  //   if (isEditing) {
  //     setEditData(profile); // Reset to original data
  //   }
  //   setIsEditing(!isEditing);
  // };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // const handleSave = async () => {
  //   setIsLoading(true);
  //   try {
  //     await axiosSecure.put(`/profile?email=${user.email}`, editData);
  //     setProfile(editData);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  //   setIsLoading(false);
  // };





  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-lg">Loading Profile...</span>
      </div>
    );
  }

  const {
    name = "Anonymous",
    image = "https://i.ibb.co/t3fD2jf/user.png",
    role = "user",
    email,
    phone ,
    address,
    joinDate,
    // bio,
    company,
    website,
    properties = 0,
    totalSales = 0
  } = profile;

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'agent': return 'bg-blue-100 text-blue-800';
      case 'moderator': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Background Banner */}
      <div
        className="h-74 w-full mb-6 rounded-xl shadow-md bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1050&q=80')",
        }}
      ></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 space-y-4 md:space-y-0">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={isEditing ? editData.image : image}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-2 right-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white p-2 rounded-full">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Basic Info */}
            <div className="flex-1 md:ml-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-3xl font-bold border-b-2 border-blue-500 bg-transparent focus:outline-none"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold  text-gray-800">{name}</h1>
                  )}
                  <p className="text-gray-600 text-lg">{email}</p>
                  
                  {/* Role Badge */}
                  {role && role !== "user" && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(role)}`}>
                        <Shield className="w-4 h-4" />
                        <span className="capitalize">{role}</span>
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Edit Button */}
                {/* <div className="flex gap-2 mt-4 md:mt-0">
                  {!isEditing ? (
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {isLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleEditToggle}
                        className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-gray-800">{phone || "+88 0123456789"}</p>
                )}
              </div>
            </div>

            {/* Email (Read-only) */}
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <p className="text-gray-800">{email}</p>
                <span className="text-xs text-gray-500">Email cannot be changed</span>
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <textarea
                    value={editData.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="text-gray-800">{address || "Dhaka, Bangladesh"}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  value={editData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Tell us about yourself"
                />
              ) : (
                <p className="text-gray-700">{bio || "No bio added yet"}</p>
              )}
            </div> */}

          </div>
        </div>

        {/* Stats and Additional Info */}
        <div className="space-y-6">
          {/* Stats Card (for agents) */}
          {role === 'agent' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Properties</span>
                  <span className="font-bold text-blue-600">{properties}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Sales</span>
                  <span className="font-bold text-green-600">{totalSales}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-bold text-purple-600">95%</span>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Additional Information</h3>
            <div className="space-y-4">
              {/* Join Date */}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{formatDate(joinDate)}</p>
                </div>
              </div>

              {/* Company (for agents) */}
              {role === 'agent' && (
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Company</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.company || ''}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Company name"
                      />
                    ) : (
                      <p className="font-medium">{company || "Not specified"}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Website (for agents) */}
              {role === 'agent' && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Website</p>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editData.website || ''}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://your-website.com"
                      />
                    ) : (
                      website ? (
                        <a href={website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                          {website}
                        </a>
                      ) : (
                        <p className="font-medium">Not specified</p>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;