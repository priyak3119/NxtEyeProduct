import React, { useState } from "react";
import { User, Upload } from "lucide-react";

const Profile = ({ user, userSubscription }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Personal Information</h3>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <User className="h-10 w-10 text-gray-400" />}
            </div>
            <div>
              <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" id="profile-image-upload" />
              <label htmlFor="profile-image-upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Photo</span>
              </label>
              {profileImage && <button onClick={() => setProfileImage(null)} className="mt-2 text-red-600 text-sm">Remove Photo</button>}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input type="text" defaultValue={user?.firstName} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input type="text" defaultValue={user?.lastName} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" defaultValue={user?.email} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-colors">
              Update Profile
            </button>
          </div>
        </div>

        {/* Subscription Info */}
        {userSubscription && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Current Subscription</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-blue-100">Plan</p>
                <p className="text-xl font-bold">{userSubscription.plan.name}</p>
              </div>
              <div>
                <p className="text-blue-100">Status</p>
                <p className="font-medium capitalize">{userSubscription.status}</p>
              </div>
              <div>
                <p className="text-blue-100">Next Billing</p>
                <p className="font-medium">{new Date(userSubscription.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
