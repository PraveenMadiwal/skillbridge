import { useNavigate } from "react-router-dom";

export default function Navbar({ title }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">
        {title}
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}