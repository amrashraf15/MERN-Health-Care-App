import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { useDoctorStore } from '../../store/useDoctorStore.js';

const DoctorProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const {
    authDoctor,
    getDoctorProfile,
    updateDoctorProfile,
    isGettingProfile,
    isUpdatingProfile,
  } = useDoctorStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    speciality: '',
    degree: '',
    experience: '',
    address1: '',
    address2: '',
    fees: '',
    about: '',
    image: '',
    available: 'true',
  });

  useEffect(() => {
    getDoctorProfile();
  }, [getDoctorProfile]);

  useEffect(() => {
    if (authDoctor) {
      setFormData({
        name: authDoctor.name || '',
        email: authDoctor.email || '',
        phone: authDoctor.phone || '',
        speciality: authDoctor.speciality || '',
        degree: authDoctor.degree || '',
        experience: authDoctor.experience || '',
        address1: authDoctor.address?.address1 || '',
        address2: authDoctor.address?.address2 || '',
        fees: authDoctor.fees || '',
        about: authDoctor.about || '',
        image: authDoctor.image || '',
        available: authDoctor.available ? 'true' : 'false',
      });
    }
  }, [authDoctor]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size exceeds 5MB limit.');
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
    const updatedData = {
      ...formData,
      available: formData.available === 'true',
      address: {
        address1: formData.address1,
        address2: formData.address2,
      },
    };

    await updateDoctorProfile(updatedData);
    setIsEdit(false);
  };

  if (isGettingProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

return (
  <form onSubmit={(e) => e.preventDefault()} className="min-h-screen w-full md:px-10 py-10">
    <h2 className="text-xl font-semibold mb-6">My Profile</h2>

    <div className=" p-8 rounded-md border w-full">
      {/* Image Upload */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={selectedImg || formData.image || "/avatar.png"}
            alt="Doctor"
            className="w-32 h-32 rounded-full object-cover border-4 border-base-300"
          />
          {isEdit && (
            <>
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
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
        <p className="text-sm ">
          {isUpdatingProfile ? "Uploading..." : "Upload doctor picture"}
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Doctor Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            disabled={!isEdit}
            type="text"
            placeholder="Name"
            className="input input-bordered text-primary w-full"
          />
        </div>

        {/* Speciality */}
        <div>
          <label className="block text-sm mb-1">Speciality</label>
          <select
            name="speciality"
            value={formData.speciality}
            onChange={(e) => setFormData((prev) => ({ ...prev, speciality: e.target.value }))}
            disabled={!isEdit}
            className="select select-bordered text-primary w-full"
          >
            <option>General physician</option>
            <option>Gynecologist</option>
            <option>Pediatricians</option>
            <option>Dermatologist</option>
            <option>Neurologist</option>
            <option>Gastroenterologist</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            disabled
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full text-primary"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            disabled={!isEdit}
            type="tel"
            placeholder="Phone number"
            className="input input-bordered w-full text-primary"
          />
        </div>

        {/* Degree */}
        <div>
          <label className="block text-sm mb-1">Degree</label>
          <input
            name="degree"
            value={formData.degree}
            onChange={(e) => setFormData((prev) => ({ ...prev, degree: e.target.value }))}
            disabled={!isEdit}
            type="text"
            placeholder="Degree"
            className="input input-bordered w-full text-primary"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm mb-1">Experience</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
            disabled={!isEdit}
            className="select select-bordered w-full text-primary"
          >
            <option value="">Select Experience</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5-10 years</option>
            <option>10+ years</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm mb-1">Address</label>
          <input
            name="address1"
            value={formData.address1}
            onChange={(e) => setFormData((prev) => ({ ...prev, address1: e.target.value }))}
            disabled={!isEdit}
            type="text"
            placeholder="Address 1"
            className="input input-bordered w-full mb-2 text-primary"
          />
          <input
            name="address2"
            value={formData.address2}
            onChange={(e) => setFormData((prev) => ({ ...prev, address2: e.target.value }))}
            disabled={!isEdit}
            type="text"
            placeholder="Address 2"
            className="input input-bordered w-full text-primary"
          />
        </div>

        {/* Fees */}
        <div>
          <label className="block text-sm mb-1">Fees</label>
          <input
            name="fees"
            value={formData.fees}
            onChange={(e) => setFormData((prev) => ({ ...prev, fees: e.target.value }))}
            disabled={!isEdit}
            type="number"
            placeholder="Your fees"
            className="input input-bordered w-full text-primary"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm mb-1">Availability</label>
          <select
            name="available"
            value={formData.available}
            onChange={(e) => setFormData((prev) => ({ ...prev, available: e.target.value }))}
            disabled={!isEdit}
            className="select select-bordered w-full text-primary"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
      </div>

      {/* About me */}
      <div className="mt-6">
        <label className="block text-sm mb-1">About me</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={(e) => setFormData((prev) => ({ ...prev, about: e.target.value }))}
          disabled={!isEdit}
          className="textarea textarea-bordered w-full text-primary"
          placeholder="Write about yourself"
          rows={4}
        />
      </div>

      {/* Save/Edit Button */}
      <div className="mt-6">
        {isEdit ? (
          <button onClick={handleSave} className="btn ">
            {isUpdatingProfile ? "Saving..." : "Save Changes"}
          </button>
        ) : (
          <button onClick={() => setIsEdit(true)} className="btn btn-outline">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  </form>
)};

export default DoctorProfile;
