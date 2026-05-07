import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Student() {

  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {

    try {

      const res = await API.get("/sessions");

      setSessions(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const joinSession = async () => {

    try {

      await API.post("/sessions/join", {
        sessionId,
      });

      alert("Session Joined Successfully");

      setSessionId("");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Failed To Join Session"
      );

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 bg-gray-700 text-white px-5 py-2 rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">
        Student Dashboard
      </h1>

      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <h2 className="text-xl font-bold mb-4">
          Join Session By ID
        </h2>

        <div className="flex gap-3">

          <input
            type="number"
            placeholder="Enter Session ID"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            className="border p-3 rounded w-full"
          />

          <button
            onClick={joinSession}
            className="bg-blue-600 text-white px-5 rounded"
          >
            Join
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {sessions.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h2 className="text-2xl font-bold text-blue-700">
              {s.title}
            </h2>

            <p className="mt-3">
              Session ID: {s.id}
            </p>

            <p>
              Trainer: {s.trainer_name}
            </p>

            <p>
              Batch: {s.batch_name}
            </p>

            <p>
              Date: {s.date}
            </p>

            <button
              onClick={() => navigate(`/session/${s.id}`)}
              className="mt-4 w-full bg-green-600 text-white py-3 rounded"
            >
              Open Session
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}