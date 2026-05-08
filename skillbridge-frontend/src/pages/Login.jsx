import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const signup = async () => {

    try {

      await API.post(
        "/auth/signup",
        form
      );

      alert("Signup Successful");

      setIsSignup(false);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Signup Failed"
      );

    }

  };

  const login = async () => {

    try {

      const res = await API.post(
        "/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      const role = res.data.user.role;

      if (role === "student") navigate("/student");

      if (role === "trainer") navigate("/trainer");

      if (role === "institution") navigate("/institution");

      if (role === "programme_manager") navigate("/pm");

      if (role === "monitoring_officer") navigate("/monitor");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8">

        {/* Logo / Title */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-extrabold text-blue-700">
            SkillBridge
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            {isSignup
              ? "Create your account to continue"
              : "Login to access your dashboard"}
          </p>

        </div>

        {/* Full Name */}
        {isSignup && (

          <div className="mb-4">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition duration-200"
            />

          </div>

        )}

        {/* Email */}
        <div className="mb-4">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition duration-200"
          />

        </div>

        {/* Password */}
        <div className="mb-4">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition duration-200"
          />

        </div>

        {/* Role */}
        {isSignup && (

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Role
            </label>

            <select
              name="role"
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-xl transition duration-200 bg-white"
            >

              <option value="student">
                Student
              </option>

              <option value="trainer">
                Trainer
              </option>

              <option value="institution">
                Institution
              </option>

              <option value="programme_manager">
                Programme Manager
              </option>

              <option value="monitoring_officer">
                Monitoring Officer
              </option>

            </select>

          </div>

        )}

        {/* Button */}
        {!isSignup ? (

          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Login
          </button>

        ) : (

          <button
            onClick={signup}
            className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Create Account
          </button>

        )}

        {/* Toggle */}
        <div className="text-center mt-6">

          <p
            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition duration-200"
            onClick={() => setIsSignup(!isSignup)}
          >

            {isSignup
              ? "Already have an account? Login"
              : "Create New Account"}

          </p>

        </div>

      </div>

    </div>

  );
}