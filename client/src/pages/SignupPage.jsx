import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";
import Input from "../components/Input.jsx";
import { Eye, EyeOff, Loader, Lock, Mail, User } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 text-base-content px-4">
      <Motion.div
        className="max-w-md w-full bg-base-100/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-base-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        data-aos="fade-up"
      >
        {/* Header */}
        <div className="p-8">
          <Motion.h2
            className="text-3xl font-bold mb-2 text-center text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Create Account
          </Motion.h2>
          <p className="text-base-content/60 mb-6 text-center">
            Get started with your free account
          </p>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <Motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <Motion.div
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Input
                  icon={User}
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Motion.div>

              <Motion.div
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Input
                  icon={Mail}
                  type="text"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Motion.div>

              <Motion.div
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="relative"
              >
                <Input
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </Motion.div>
            </Motion.div>

            {/* Password Strength */}
            <PasswordStrengthMeter password={formData.password} />

            {/* Submit Button */}
            <Motion.button
              type="submit"
              disabled={isSigningUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn w-full font-bold rounded-full ${
                isSigningUp
                  ? "btn-disabled"
                  : "btn-primary hover:brightness-110 transition-all duration-300"
              }`}
            >
              {isSigningUp ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Sign Up"
              )}
            </Motion.button>
          </form>
        </div>

        {/* Footer */}
        <Motion.div
          className="px-8 py-4 bg-base-200 text-sm flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default SignUpPage;
