// student dashboard page, where students can see their profile, join sessions, and view available sessions. They can also edit their name and password from the profile page.

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import {
  FaUserCircle,
  FaBookOpen,
  FaCalendarAlt,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

export default function Student() {

  const navigate = useNavigate();

  const [sessions, setSessions] =
    useState([]);

  const [sessionId, setSessionId] =
    useState("");

  const [showProfile, setShowProfile] =
    useState(false);

  const [profile, setProfile] =
    useState(null);

  const [newName, setNewName] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [editName, setEditName] =
    useState(false);

  const [
    editPassword,
    setEditPassword,
  ] = useState(false);

  useEffect(() => {

    fetchSessions();

    fetchProfile();

  }, []);

  // ================= FETCH SESSIONS =================

  const fetchSessions = async () => {

    try {

      const res =
        await API.get("/sessions");

      setSessions(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // ================= FETCH PROFILE =================

  const fetchProfile = async () => {

    try {

      const res =
        await API.get(
          "/student/profile"
        );

      setProfile(res.data);

      setNewName(res.data.name);

    } catch (err) {

      console.log(err);

    }

  };

  // ================= JOIN SESSION =================

  const joinSession = async () => {

    try {

      await API.post(
        "/sessions/join",
        {
          sessionId,
        }
      );

      alert(
        "Session Joined Successfully"
      );

      setSessionId("");

    } catch (err) {

      alert(
        err.response?.data?.message ||
          "Failed To Join Session"
      );

    }

  };

  // ================= UPDATE NAME =================

  const updateName = async () => {

    try {

      await API.put(
        "/student/update-name",
        {
          name: newName,
        }
      );

      alert(
        "Name Updated Successfully"
      );

      setEditName(false);

      fetchProfile();

    } catch (err) {

      alert(
        err.response?.data?.message ||
          "Failed To Update Name"
      );

    }

  };

  // ================= UPDATE PASSWORD =================

  const updatePassword =
    async () => {

      try {

        await API.put(
          "/student/update-password",
          {
            password: newPassword,
          }
        );

        alert(
          "Password Updated Successfully"
        );

        setEditPassword(false);

        setNewPassword("");

      } catch (err) {

        alert(
          err.response?.data
            ?.message ||
            "Failed To Update Password"
        );

      }

    };

  return (

  <div className="min-h-screen bg-gray-100">

    {/* HEADER */}

    <div className="bg-white shadow-md px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-50">

      <div>

        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Student Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome back 👋
        </p>

      </div>

      {/* PROFILE BUTTON */}

      <button
        onClick={() => setShowProfile(true)}
        className="w-14 h-14 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center shadow-lg transition duration-300"
      >

        <FaUserCircle className="text-4xl text-green-700" />

      </button>

    </div>

    {/* ================= MAIN CONTENT ================= */}

    {!showProfile ? (

      <div className="p-4 sm:p-6 lg:p-8">

        {/* TOP CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-green-200 transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  Total Sessions
                </p>

                <h2 className="text-4xl font-bold text-black mt-2">
                  {sessions.length}
                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                <FaBookOpen className="text-3xl text-green-700" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-blue-200 transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  Joined Sessions
                </p>

                <h2 className="text-4xl font-bold text-black mt-2">
                  {profile?.attendedClasses || 0}
                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                <FaCalendarAlt className="text-3xl text-blue-700" />

              </div>

            </div>

          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-lg p-6 text-white">

            <p className="text-green-100">
              Welcome Back
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {profile?.name || "Student"}
            </h2>

            <p className="mt-3 text-green-100 text-sm">
              Continue your learning journey 🚀
            </p>

          </div>

        </div>

        {/* JOIN SESSION */}

        <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-7 mb-8 border border-gray-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <h2 className="text-3xl font-bold text-black">
                Join Session
              </h2>

              <p className="text-gray-500 mt-1">
                Enter your session ID below
              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

              <input
                type="number"
                placeholder="Enter Session ID"
                value={sessionId}
                onChange={(e) =>
                  setSessionId(e.target.value)
                }
                className="w-full sm:w-[320px] border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none p-4 rounded-2xl bg-gray-50"
              />

              <button
                onClick={joinSession}
                className="bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition duration-300"
              >

                Join Now

              </button>

            </div>

          </div>

        </div>

        {/* SESSION LIST */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {sessions.map((s) => (

            <div
              key={s.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden"
            >

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">

                <div className="flex justify-between items-center">

                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                    <FaBookOpen className="text-2xl" />

                  </div>

                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">

                    LIVE

                  </span>

                </div>

                <h2 className="text-2xl font-bold mt-5">
                  {s.title}
                </h2>

              </div>

              <div className="p-6 space-y-3 text-gray-600">

                <div className="flex justify-between">
                  <span className="font-semibold text-black">
                    Session ID
                  </span>
                  <span>{s.id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-black">
                    Trainer
                  </span>
                  <span>{s.trainer_name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-black">
                    Batch
                  </span>
                  <span>{s.batch_name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-black">
                    Date
                  </span>
                  <span>{s.date}</span>
                </div>

                <button
                  onClick={() =>
                    navigate(`/session/${s.id}`)
                  }
                  className="mt-5 w-full bg-black hover:bg-green-600 text-white py-4 rounded-2xl font-semibold transition duration-300"
                >

                  Open Session

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    ) : (

      /* ================= PROFILE PAGE ================= */

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-4 sm:p-6 lg:p-10">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden">

            {/* HEADER */}

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 sm:px-10 py-10 text-white relative">

              <button
                onClick={() => setShowProfile(false)}
                className="absolute right-5 top-5 bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition"
              >

                <FaTimes className="text-xl" />

              </button>

              <div className="flex flex-col sm:flex-row items-center gap-6">

                <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">

                  <FaUserCircle className="text-8xl" />

                </div>

                <div>

                  <h1 className="text-4xl font-bold">
                    {profile?.name}
                  </h1>

                  <p className="text-green-100 mt-2">
                    Student Account
                  </p>

                </div>

              </div>

            </div>

            {/* PROFILE BODY */}

            <div className="p-6 sm:p-10 grid lg:grid-cols-2 gap-6">

              <div className="bg-gray-50 rounded-3xl p-6">

                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <h3 className="text-xl font-bold mt-2">
                  {profile?.email}
                </h3>

              </div>

              <div className="bg-gray-50 rounded-3xl p-6">

                <p className="text-gray-500 text-sm">
                  Attended Classes
                </p>

                <h3 className="text-xl font-bold mt-2">
                  {profile?.attendedClasses || 0}
                </h3>

              </div>

              {/* EDIT NAME */}

              <div className="bg-gray-50 rounded-3xl p-6">

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-xl font-bold">
                    Edit Name
                  </h3>

                  <button
                    onClick={() =>
                      setEditName(!editName)
                    }
                  >

                    <FaEdit className="text-green-700 text-xl" />

                  </button>

                </div>

                {editName && (

                  <div className="space-y-4">

                    <input
                      type="text"
                      value={newName}
                      onChange={(e) =>
                        setNewName(e.target.value)
                      }
                      className="w-full border border-gray-300 p-4 rounded-2xl"
                    />

                    <button
                      onClick={updateName}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl"
                    >

                      Save Name

                    </button>

                  </div>

                )}

              </div>

              {/* PASSWORD */}

              <div className="bg-gray-50 rounded-3xl p-6">

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-xl font-bold">
                    Change Password
                  </h3>

                  <button
                    onClick={() =>
                      setEditPassword(!editPassword)
                    }
                  >

                    <FaLock className="text-green-700 text-xl" />

                  </button>

                </div>

                {editPassword && (

                  <div className="space-y-4">

                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 p-4 rounded-2xl"
                    />

                    <button
                      onClick={updatePassword}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl"
                    >

                      Update Password

                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    )}

  </div>

);

}