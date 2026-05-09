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
  FaLayerGroup,
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaTimes,
  FaEnvelope,
  FaEdit,
  FaLock,
} from "react-icons/fa";

export default function Trainer() {

  const navigate = useNavigate();

  const [batchName, setBatchName] =
    useState("");

  const [batchId, setBatchId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [date, setDate] =
    useState("");

  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const [sessions, setSessions] =
    useState([]);

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
      await API.get(
        "/trainer/sessions"
      );

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
          "/trainer/profile"
        );

      setProfile(res.data);

      setNewName(res.data.name);

    } catch (err) {

      console.log(err);

    }

  };

  // ================= CREATE BATCH =================

  const createBatch = async () => {

    try {

      await API.post("/batches", {
        name: batchName,
      });

      alert("Batch Created");

      setBatchName("");

    } catch (err) {

      alert(
        err.response?.data
          ?.message
      );

    }

  };

  // ================= CREATE SESSION =================

  const createSession =
    async () => {

      try {

        await API.post(
          "/sessions",
          {
            batch_id: batchId,
            title,
            date,
            start_time:
              startTime,
            end_time:
              endTime,
          }
        );

        alert(
          "Session Created"
        );

        fetchSessions();

        setBatchId("");
        setTitle("");
        setDate("");
        setStartTime("");
        setEndTime("");

      } catch (err) {

        alert(
          err.response?.data
            ?.message
        );

      }

    };

  // ================= UPDATE NAME =================

  const updateName = async () => {

    try {

      await API.put(
        "/trainer/update-name",
        {
          name: newName,
        }
      );

      alert(
        "Name Updated"
      );

      setEditName(false);

      fetchProfile();

    } catch (err) {

      alert(
        err.response?.data
          ?.message
      );

    }

  };

  // ================= UPDATE PASSWORD =================

  const updatePassword =
    async () => {

      try {

        await API.put(
          "/trainer/update-password",
          {
            password:
              newPassword,
          }
        );

        alert(
          "Password Updated"
        );

        setEditPassword(
          false
        );

        setNewPassword("");

      } catch (err) {

        alert(
          err.response?.data
            ?.message
        );

      }

    };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="bg-white shadow-md px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-50">

        <div>

          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Trainer Dashboard
          </h1>

          <p className="text-gray-500 text-sm">
            Manage your sessions 🚀
          </p>

        </div>

        <button
          onClick={() =>
            setShowProfile(true)
          }
          className="w-14 h-14 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center shadow-lg transition"
        >

          <FaUserCircle className="text-4xl text-green-700" />

        </button>

      </div>

      {/* ================= DASHBOARD ================= */}

      {!showProfile ? (

        <div className="p-4 sm:p-6 lg:p-8">

          {/* TOP CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Sessions
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {sessions.length}
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                  <FaBookOpen className="text-3xl text-green-700" />

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Batches
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {sessions.length}
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <FaLayerGroup className="text-3xl text-blue-700" />

                </div>

              </div>

            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-lg p-6 text-white">

              <p className="text-green-100">
                Welcome Back
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {profile?.name ||
                  "Trainer"}
              </h2>

              <p className="mt-3 text-green-100 text-sm">
                Keep teaching and inspiring 🎯
              </p>

            </div>

          </div>

          {/* FORMS */}

          <div className="grid lg:grid-cols-2 gap-6 mb-10">

            {/* CREATE BATCH */}

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                  <FaPlus className="text-2xl text-green-700" />

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Create Batch
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Add a new batch
                  </p>

                </div>

              </div>

              <input
                type="text"
                placeholder="Batch Name"
                value={batchName}
                onChange={(e) =>
                  setBatchName(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-4 rounded-2xl mb-5 outline-none focus:ring-4 focus:ring-green-100"
              />

              <button
                onClick={createBatch}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold transition"
              >

                Create Batch

              </button>

            </div>

            {/* CREATE SESSION */}

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Create Session
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Batch ID"
                  value={batchId}
                  onChange={(e) =>
                    setBatchId(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 p-4 rounded-2xl"
                />

                <input
                  type="text"
                  placeholder="Session Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 p-4 rounded-2xl"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 p-4 rounded-2xl"
                />

                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) =>
                      setStartTime(
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 p-4 rounded-2xl"
                  />

                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) =>
                      setEndTime(
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 p-4 rounded-2xl"
                  />

                </div>

                <button
                  onClick={
                    createSession
                  }
                  className="w-full bg-black hover:bg-green-600 text-white py-4 rounded-2xl font-semibold transition"
                >

                  Create Session

                </button>

              </div>

            </div>

          </div>

          {/* SESSIONS */}

          <div>

            <h2 className="text-3xl font-bold mb-6">
              My Sessions
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {sessions.map((s) => (

                <div
                  key={s.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >

                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">

                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">

                      <FaBookOpen className="text-2xl" />

                    </div>

                    <h2 className="text-2xl font-bold">
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
                        Batch
                      </span>
                      <span>
                        {s.batch_name}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-black">
                        Date
                      </span>
                      <span>{s.date}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold text-black">
                        Time
                      </span>
                      <span>
                        {s.start_time} -
                        {s.end_time}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/session/${s.id}`
                        )
                      }
                      className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold transition"
                    >

                      Open Session

                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      ) : (

        /* ================= PROFILE ================= */

        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-4 sm:p-6 lg:p-10">

          <div className="max-w-5xl mx-auto">

            <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden">

              {/* HEADER */}

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 sm:px-10 py-10 text-white relative">

                <button
                  onClick={() =>
                    setShowProfile(
                      false
                    )
                  }
                  className="absolute right-5 top-5 bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center"
                >

                  <FaTimes />

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
                      Trainer Account
                    </p>

                  </div>

                </div>

              </div>

              {/* BODY */}

              <div className="p-6 sm:p-10 grid lg:grid-cols-2 gap-6">

                <div className="bg-gray-50 rounded-3xl p-6">

                  <div className="flex items-center gap-4">

                    <FaEnvelope className="text-green-700 text-2xl" />

                    <div>

                      <p className="text-gray-500 text-sm">
                        Email
                      </p>

                      <h3 className="text-xl font-bold">
                        {profile?.email}
                      </h3>

                    </div>

                  </div>

                </div>

                <div className="bg-gray-50 rounded-3xl p-6">

                  <div className="flex items-center gap-4">

                    <FaBookOpen className="text-blue-700 text-2xl" />

                    <div>

                      <p className="text-gray-500 text-sm">
                        Sessions
                      </p>

                      <h3 className="text-xl font-bold">
                        {
                          sessions.length
                        }
                      </h3>

                    </div>

                  </div>

                </div>

                {/* EDIT NAME */}

                <div className="bg-gray-50 rounded-3xl p-6">

                  <div className="flex justify-between items-center mb-5">

                    <h3 className="text-xl font-bold">
                      Edit Name
                    </h3>

                    <button
                      onClick={() =>
                        setEditName(
                          !editName
                        )
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
                          setNewName(
                            e.target
                              .value
                          )
                        }
                        className="w-full border border-gray-300 p-4 rounded-2xl"
                      />

                      <button
                        onClick={
                          updateName
                        }
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl"
                      >

                        Save Name

                      </button>

                    </div>

                  )}

                </div>

                {/* PASSWORD */}

                <div className="bg-gray-50 rounded-3xl p-6">

                  <div className="flex justify-between items-center mb-5">

                    <h3 className="text-xl font-bold">
                      Change Password
                    </h3>

                    <button
                      onClick={() =>
                        setEditPassword(
                          !editPassword
                        )
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
                        value={
                          newPassword
                        }
                        onChange={(e) =>
                          setNewPassword(
                            e.target
                              .value
                          )
                        }
                        className="w-full border border-gray-300 p-4 rounded-2xl"
                      />

                      <button
                        onClick={
                          updatePassword
                        }
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