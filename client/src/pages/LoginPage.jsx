import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";
import Input from "../components/Input.jsx";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 text-base-content px-4">
      <Motion.div
        className="max-w-md w-full bg-base-100/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-base-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        data-aos="zoom-in"
      >
        {/* Header */}
        <div className="p-8">
          <Motion.h2
            className="text-3xl font-bold mb-6 text-center text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome Back
          </Motion.h2>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>

            {/* Login Button */}
            <Motion.button
              type="submit"
              disabled={isLoggingIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn w-full font-bold rounded-full ${
                isLoggingIn
                  ? "btn-disabled"
                  : "btn-primary hover:brightness-110 transition-all duration-300"
              }`}
            >
              {isLoggingIn ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Login"
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
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default LoginPage;
