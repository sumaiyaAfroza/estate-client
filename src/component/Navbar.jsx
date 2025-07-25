import React, { useContext, useState } from "react";
import { NavLink } from "react-router"; 
import { AuthContext } from "../Context/AuthProvider";
import { ThemeContext } from "../Context/Theme";
import logo from "../assets/images.png"
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // 🔥 Active link style helper
  const activeClass =
    "text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-4";
  const inactiveClass = "hover:text-indigo-500";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-800 dark:text-gray-200 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Home
            </NavLink>
          </li>
          
          {user && (
            <>
            <li>
              <NavLink
                to="/allProperties"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                All Properties
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                Dashboard
              </NavLink>
            </li>
            </>
            
          )}

          {/* Theme Toggle */}
          <li>
            <button onClick={toggleTheme}>
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </li>

          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="flex items-center gap-3">
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border"
                title={user.displayName}
              />
              <button
                onClick={logOut}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 dark:text-white">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 text-gray-800 dark:text-gray-200 font-medium">
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allProperties"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                All properties
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={toggleMenu}
                  className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <button onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark" : "🌞 Light"}
              </button>
            </li>

            {!user ? (
              <li>
                <NavLink
                  to="/login"
                  onClick={toggleMenu}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition block text-center"
                >
                  Login / Register
                </NavLink>
              </li>
            ) : (
              <li className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border"
                />
                <button
                  onClick={() => {
                    logOut();
                    toggleMenu();
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;