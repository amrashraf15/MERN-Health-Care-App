import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera } from 'lucide-react';

const MyProfile = () => {
  const { isUpdatingProfile, updateProfile, authUser } = useAuthStore();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
    image: '',
  });

  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name || '',
        email: authUser.email || '',
        phone: authUser.phone || '',
        gender: authUser.gender || '',
        dob: authUser.dob || '',
        address: authUser.address || '',
        image: authUser.image || '',
      });
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size exceeds 5MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setFormData((prev) => ({ ...prev, image: base64Image }));
    };
  };

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen mt-20 rounded-2xl px-4 md:px-8 lg:px-16 max-w-4xl mx-auto w-full">
      <div className="bg-base-300 py-10 rounded-lg shadow p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser.image || "/avatar.png"}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
            {isEdit && (
              <>
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-primary hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-white" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </>
            )}
          </div>

          {isEdit ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="border px-3 py-2 rounded w-full md:w-1/2"
            />
          ) : (
            <p className="text-xl font-semibold">{authUser.name}</p>
          )}

          <div className="w-full border-t pt-6 space-y-4">
            <h2 className="uppercase text-md font-semibold text-primary">Contact Information</h2>

            <div className="flex gap-2">
              <p className="font-medium">Email:</p>
              <p>{authUser.email}</p>
            </div>

            <div className="flex gap-2 items-center">
              <p className="font-medium">Phone:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="border px-3 py-1 rounded"
                />
              ) : (
                <p>{authUser.phone}</p>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <p className="font-medium">Address:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  className="border px-3 py-1 rounded"
                />
              ) : (
                <p>{authUser.address}</p>
              )}
            </div>
          </div>

          <div className="w-full border-t pt-6 space-y-4">
            <h2 className="uppercase text-md font-semibold text-primary">Basic Information</h2>

            <div className="flex gap-2 items-center">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                  className="border px-3 py-1 rounded"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p>{authUser.gender}</p>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <p className="font-medium">Date of Birth:</p>
              {isEdit ? (
                <input
                  type="date"
                  value={formData.dob || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dob: e.target.value }))}
                  className="border px-3 py-1 rounded"
                />
              ) : (
                <p>{authUser.dob}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            {isEdit ? (
              <button
                onClick={handleSave}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
              >
                {isUpdatingProfile ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="border border-primary text-primary px-6 py-2 rounded hover:bg-primary hover:text-white transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
