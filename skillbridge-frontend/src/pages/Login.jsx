import { useState } from "react";
import axios from "axios";
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
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );

      alert("Signup Successful");
      setIsSignup(false);

    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      const role = res.data.user.role;

      if (role === "student") navigate("/student");
      if (role === "trainer") navigate("/trainer");
      if (role === "institution") navigate("/institution");
      if (role === "programme_manager") navigate("/pm");
      if (role === "monitoring_officer") navigate("/monitor");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center mb-6">
          SkillBridge
        </h1>

        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        {isSignup && (
          <select
            name="role"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          >
            <option value="student">Student</option>
            <option value="trainer">Trainer</option>
            <option value="institution">Institution</option>
            <option value="programme_manager">
              Programme Manager
            </option>
            <option value="monitoring_officer">
              Monitoring Officer
            </option>
          </select>
        )}

        {!isSignup ? (
          <button
            onClick={login}
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Login
          </button>
        ) : (
          <button
            onClick={signup}
            className="w-full bg-green-600 text-white p-3 rounded"
          >
            Signup
          </button>
        )}

        <p
          className="text-center mt-4 cursor-pointer text-blue-600"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have account? Login"
            : "Create New Account"}
        </p>

      </div>
    </div>
  );
}