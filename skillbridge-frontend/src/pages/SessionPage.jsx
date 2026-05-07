import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function SessionPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [students, setStudents] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchSession();
    fetchStudents();
  }, []);

  const fetchSession = async () => {

    try {

      const res = await API.get(`/sessions/${id}`);

      setSession(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const fetchStudents = async () => {

    try {

      if (role === "trainer") {

        const res = await API.get(`/sessions/${id}/students`);

        setStudents(res.data);

      }

    } catch (err) {

      console.log(err);

    }
  };

  const startSession = () => {

    alert("Session Started Successfully");

  };

  if (!session) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 bg-gray-700 text-white px-5 py-2 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-blue-700">
          {session.title}
        </h1>

        <div className="mt-5 space-y-2">

          <p>
            <b>Session ID:</b> {session.id}
          </p>

          <p>
            <b>Trainer:</b> {session.trainer_name}
          </p>

          <p>
            <b>Batch:</b> {session.batch_name}
          </p>

          <p>
            <b>Date:</b> {session.date}
          </p>

          <p>
            <b>Time:</b> {session.start_time} - {session.end_time}
          </p>

        </div>

        {/* Trainer Only Button */}
        {role === "trainer" && (

          <button
            onClick={startSession}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Let's Start Session
          </button>

        )}

      </div>

      {role === "trainer" && (

        <div className="bg-white p-6 rounded-xl shadow mt-6">

          <h2 className="text-2xl font-bold mb-4">
            Joined Students
          </h2>

          <div className="space-y-3">

            {students.length > 0 ? (

              students.map((s) => (
                <div
                  key={s.id}
                  className="border p-4 rounded-lg"
                >
                  <p>
                    <b>Name:</b> {s.name}
                  </p>

                  <p>
                    <b>Email:</b> {s.email}
                  </p>

                </div>
              ))

            ) : (

              <p>No Students Joined Yet</p>

            )}

          </div>

        </div>

      )}

    </div>
  );
}