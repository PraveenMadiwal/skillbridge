import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Trainer() {

  const navigate = useNavigate();

  const [batchName, setBatchName] = useState("");
  const [batchId, setBatchId] = useState("");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {

    try {

      const res = await API.get("/trainer/sessions");

      setSessions(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const createBatch = async () => {

    try {

      await API.post("/batches", {
        name: batchName,
      });

      alert("Batch Created");

      setBatchName("");

    } catch (err) {

      alert(err.response?.data?.message);

    }
  };

  const createSession = async () => {

    try {

      await API.post("/sessions", {
        batch_id: batchId,
        title,
        date,
        start_time: startTime,
        end_time: endTime,
      });

      alert("Session Created");

      fetchSessions();

    } catch (err) {

      alert(err.response?.data?.message);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar title="Trainer Dashboard" />

      <div className="p-4 md:p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">
              Create Batch
            </h2>

            <input
              type="text"
              placeholder="Batch Name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            />

            <button
              onClick={createBatch}
              className="bg-blue-600 text-white px-4 py-3 rounded w-full"
            >
              Create Batch
            </button>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">
              Create Session
            </h2>

            <input
              type="text"
              placeholder="Batch ID"
              onChange={(e) => setBatchId(e.target.value)}
              className="w-full border p-3 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Session Title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-3 rounded mb-3"
            />

            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-3 rounded mb-3"
            />

            <input
              type="time"
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border p-3 rounded mb-3"
            />

            <input
              type="time"
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            />

            <button
              onClick={createSession}
              className="bg-green-600 text-white px-4 py-3 rounded w-full"
            >
              Create Session
            </button>

          </div>

        </div>

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-4">
            My Sessions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {sessions.map((s) => (
              <div
                key={s.id}
                className="bg-white p-5 rounded-xl shadow"
              >
                <h3 className="font-bold text-lg">
                  {s.title}
                </h3>

                <p className="mt-2">
                  Session ID: {s.id}
                </p>

                <p>
                  Batch: {s.batch_name}
                </p>

                <p>
                  Date: {s.date}
                </p>

                <p>
                  Time: {s.start_time} - {s.end_time}
                </p>

                <button
                  onClick={() => navigate(`/session/${s.id}`)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                  Open Session
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}