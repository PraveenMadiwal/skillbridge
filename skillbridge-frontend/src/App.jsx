import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Student from "./pages/Student";
import Trainer from "./pages/Trainer";
import Institution from "./pages/Institution";
import PM from "./pages/PM";
import SessionPage from "./pages/SessionPage";
import Monitor from "./pages/Monitor";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gray-100">

        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/student" element={<Student />} />

          <Route path="/trainer" element={<Trainer />} />

          <Route path="/institution" element={<Institution />} />

          <Route path="/pm" element={<PM />} />

          <Route path="/monitor" element={<Monitor />} />

          <Route path="/session/:id" element={<SessionPage />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;