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

      await API.post("/auth/signup", form);

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

    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-900 to-cyan-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)] rounded-[30px] p-6 sm:p-8 lg:p-10">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg mb-4">

            <h1 className="text-3xl font-black text-white">
              SB
            </h1>

          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            SkillBridge
          </h1>

          <p className="text-gray-200 mt-3 text-sm sm:text-base leading-relaxed">

            {isSignup
              ? "Create your account and start your learning journey."
              : "Login to continue to your personalized dashboard."}

          </p>

        </div>

        {/* Full Name */}
        {isSignup && (

          <div className="mb-5">

            <label className="block text-sm font-semibold text-gray-100 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 px-4 py-3 rounded-2xl outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300"
            />

          </div>

        )}

        {/* Email */}
        <div className="mb-5">

          <label className="block text-sm font-semibold text-gray-100 mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 px-4 py-3 rounded-2xl outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300"
          />

        </div>

        {/* Password */}
        <div className="mb-5">

          <label className="block text-sm font-semibold text-gray-100 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 px-4 py-3 rounded-2xl outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all duration-300"
          />

        </div>

        {/* Role */}
        {isSignup && (

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-100 mb-2">
              Select Role
            </label>

            <select
              name="role"
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-2xl outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300"
            >

              <option className="text-black" value="student">
                Student
              </option>

              <option className="text-black" value="trainer">
                Trainer
              </option>

              <option className="text-black" value="institution">
                Institution
              </option>

              <option className="text-black" value="programme_manager">
                Programme Manager
              </option>

              <option className="text-black" value="monitoring_officer">
                Monitoring Officer
              </option>

            </select>

          </div>

        )}

        {/* Button */}
        {!isSignup ? (

          <button
            onClick={login}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-cyan-500/40 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
          >

            <span className="relative z-10">
              Login
            </span>

            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          </button>

        ) : (

          <button
            onClick={signup}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-pink-500/40 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
          >

            <span className="relative z-10">
              Create Account
            </span>

            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          </button>

        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-[1px] bg-white/20"></div>

          <span className="text-xs text-gray-300">
            OR
          </span>

          <div className="flex-1 h-[1px] bg-white/20"></div>

        </div>

        {/* Toggle */}
        <div className="text-center">

          <p
            className="inline-block text-sm sm:text-base text-cyan-300 hover:text-pink-300 font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
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