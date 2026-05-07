import { useEffect, useState } from "react";
import API from "../services/api";

export default function Institution() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const res = await API.get(
        "/institution/stats"
      );

      setStats(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Institution Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold">
            Trainers
          </h2>

          <p className="text-4xl mt-4">
            {stats.trainers}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold">
            Students
          </h2>

          <p className="text-4xl mt-4">
            {stats.students}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold">
            Batches
          </h2>

          <p className="text-4xl mt-4">
            {stats.batches}
          </p>

        </div>

      </div>

    </div>
  );
}