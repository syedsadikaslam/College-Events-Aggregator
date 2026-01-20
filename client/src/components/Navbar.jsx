import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  Menu,
  X,
  Rocket,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Helper function to check active route
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
  ];

  if (user && user.role === "admin") {
    navLinks.push({
      name: "Admin Panel",
      path: "/admin",
      icon: <ShieldCheck size={18} />,
    });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-600 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
                <Rocket size={20} fill="white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                InternX <span className="text-blue-600 italic">by Sadik</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors"
                >
                  <LogIn size={18} /> Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-semibold"
                >
                  <UserPlus size={18} /> Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive("/profile")
                      ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  <UserPlus size={18} /> Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 font-semibold transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 font-medium rounded-xl"
                >
                  <LogIn size={20} /> Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-blue-600 hover:bg-blue-50 font-medium rounded-xl"
                >
                  <UserPlus size={20} /> Signup
                </Link>
              </>
            ) : (
              <>
                {/* ✅ PROFILE LINK */}
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                    isActive("/profile")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <UserPlus size={20} /> Profile
                </Link>

                {/* ✅ LOGOUT */}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-medium text-left rounded-xl"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
