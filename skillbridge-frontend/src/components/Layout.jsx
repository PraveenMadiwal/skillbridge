import { Link } from "react-router-dom";

export default function Layout({ children, role }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-5 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">
          SkillBridge
        </h1>

        <nav className="flex flex-col gap-4">

          <Link to="/" className="hover:text-yellow-300">
            Dashboard
          </Link>

          {role === "trainer" && (
            <>
              <Link to="/trainer" className="hover:text-yellow-300">
                Sessions
              </Link>

              <Link to="/batches" className="hover:text-yellow-300">
                Batches
              </Link>
            </>
          )}

          {role === "student" && (
            <Link to="/student" className="hover:text-yellow-300">
              My Sessions
            </Link>
          )}

          {role === "institution" && (
            <Link to="/institution" className="hover:text-yellow-300">
              Institution
            </Link>
          )}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}