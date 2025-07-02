import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore.js';
import { Camera } from "lucide-react";

const AddDoctor = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const { isAddingDoctor, addDoctor } = useAdminStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    speciality: 'General physician',
    degree: '',
    experience: '',
    address: {
      address1: '',
      address2: '',
    },
    fees: '',
    about: '',
    image: '',
    available: true,
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size exceeds 5MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setFormData((prev) => ({ ...prev, image: base64Image }));
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'address1' || name === 'address2') {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else if (name === 'available') {
      setFormData((prev) => ({
        ...prev,
        available: value === 'true',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen w-full md:px-10 py-10">
      <h2 className="text-xl font-semibold mb-6">Add Doctor</h2>

      <div className="bg-white p-8 rounded-md border w-full">
        {/* Image Upload */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={selectedImg || "/avatar.png"}
              alt="Doctor"
              className="w-32 h-32 rounded-full object-cover border-4 border-base-300"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                isAddingDoctor ? "animate-pulse pointer-events-none" : ""
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
          </div>
          <p className="text-sm text-gray-500">
            {isAddingDoctor ? "Uploading..." : "Upload doctor picture"}
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Doctor name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Speciality</label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Pediatricians</option>
              <option>Dermatologist</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Doctor Email</label>
            <input
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone number"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Degree</label>
            <input
              name="degree"
              required
              value={formData.degree}
              onChange={handleChange}
              type="text"
              placeholder="Degree"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Doctor Password</label>
            <input
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Address</label>
            <input
              name="address1"
              value={formData.address.address1}
              onChange={handleChange}
              type="text"
              placeholder="Address 1"
              className="input input-bordered w-full mb-2"
            />
            <input
              name="address2"
              value={formData.address.address2}
              onChange={handleChange}
              type="text"
              placeholder="Address 2"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Experience</label>
            <select
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Experience</option>
              <option>1-3 years</option>
              <option>3-5 years</option>
              <option>5-10 years</option>
              <option>10+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Fees</label>
            <input
              name="fees"
              required
              value={formData.fees}
              onChange={handleChange}
              type="number"
              placeholder="Your fees"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Available</label>
            <select
              name="available"
              value={formData.available}
              onChange={handleChange}
              className="select select-bordered w-full"
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
            required
            value={formData.about}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Write about yourself"
            rows={4}
          />
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button type="submit" className="btn btn-primary">
            Add doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
