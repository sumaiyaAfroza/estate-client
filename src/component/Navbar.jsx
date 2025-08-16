import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom"; // Updated to react-router-dom
import { AuthContext } from "../Context/AuthProvider";
import { ThemeContext } from "../Context/Theme";
import useUserRole from "../hooks/useUserRole";
import logo from "../assets/images.png";
import { Moon, Sun, Menu, X, LogOut, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { role, roleLoading } = useUserRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const dashboardRef = useRef(null);
  const profileRef = useRef(null);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowNavbar(true);
      } else if (window.scrollY > lastScrollY.current) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset dropdown states when user changes
  useEffect(() => {
    setDropdownOpen(false);
    setProfileDropdownOpen(false);
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
  }, [user]);

  // Handle clicks outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dashboardRef.current &&
        !dashboardRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = () => {
    setDropdownOpen(false);
    setProfileDropdownOpen(false);
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    logOut();
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150); // 150ms delay before closing
  };

  // Profile dropdown handlers
  const handleProfileEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setProfileDropdownOpen(true);
  };

  const handleProfileLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setProfileDropdownOpen(false);
    }, 150);
  };

  const activeClass =
    "text-emerald-500 dark:text-emerald-400 font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-blue-500 after:rounded-full";
  const inactiveClass =
    "hover:text-emerald-500 dark:hover:text-emerald-400 relative group transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-blue-500 after:rounded-full after:transition-all after:duration-300 hover:after:w-full";

  const getDashboardMenuItems = () => {
    if (roleLoading) return [];

    if (role === "agent") {
      return [
        { path: "/dashboard/agentProfile", label: "Agent Profile" },
        { path: "/dashboard/addProperty", label: "Add Property" },
        { path: "/dashboard/myAddedProperties", label: "My Added Properties" },
        { path: "/dashboard/mySoldProperty", label: "My Sold Properties" },
        { path: "/dashboard/requestedProperty", label: "Requested Properties" },
      ];
    }

    if (role === "user") {
      return [
        { path: "/dashboard/myProfile", label: "My Profile" },
        { path: "/dashboard/wishLists", label: "Wish List" },
        { path: "/dashboard/propertyBought", label: "Property Bought" },
        { path: "/dashboard/myReviews", label: "My Reviews" },
      ];
    }

    if (role === "admin") {
      return [
        { path: "/dashboard/adminProfile", label: "Admin Profile" },
        { path: "/dashboard/manageProperties", label: "Manage Properties" },
        { path: "/dashboard/manageUsers", label: "Manage Users" },
        { path: "/dashboard/manageReviews", label: "Manage Reviews" },
        { path: "/dashboard/advertise-property", label: "Advertise Property" },
      ];
    }

    return [];
  };

  const dashboardMenuItems = getDashboardMenuItems();

  return (
    <nav
      className={`backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20 sticky top-0 z-50 transition-all duration-500 ${
        showNavbar ? "translate-y-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <NavLink to="/" className="group">
          <div className="relative">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-full ring-2 ring-emerald-500/30 group-hover:ring-emerald-500/60 transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-200 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allProperties"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              All properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Contact
            </NavLink>
          </li>

          {user && (
            <li 
              className="relative" 
              ref={dashboardRef}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                <div className="flex items-center gap-2 py-2">
                  Dashboard
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </NavLink>
              
              {/* Dropdown with improved positioning and padding */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 pt-2 pb-2">
                  <ul className="bg-white dark:bg-gray-800 border border-gray-200/20 dark:border-gray-700/20 rounded-lg shadow-xl w-56 py-2 backdrop-blur-xl bg-white/95 dark:bg-gray-800/95">
                    {dashboardMenuItems.map(({ path, label }) => (
                      <li key={path}>
                        <NavLink
                          to={path}
                          className={({ isActive }) =>
                            `block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 ${
                              isActive ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-semibold" : ""
                            }`
                          }
                          onClick={() => setDropdownOpen(false)}
                        >
                          {label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          )}

          {/* Theme Toggle */}
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition线索
              transition-all duration-300 hover:scale-110"
            >
              {theme === "light" ? (
                <Moon size={20} className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Sun size={20} className="text-amber-500" />
              )}
            </button>
          </li>

          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 px-6 py-2 rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li 
              className="relative" 
              ref={profileRef}
              onMouseEnter={handleProfileEnter}
              onMouseLeave={handleProfileLeave}
            >
              <div className="flex items-center gap-3 py-2">
                <button className="flex items-center">
                  <div className="relative group">
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-emerald-500/30 group-hover:border-emerald-500 transition-all duration-300 group-hover:scale-105"
                      title={user.displayName}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </button>
                
                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute top-full right-0 pt-2 pb-2">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200/20 dark:border-gray-700/20 rounded-lg shadow-xl w-40 py-2 backdrop-blur-xl bg-white/95 dark:bg-gray-800/95">
                      <div className="px-4 py-2 border-b border-gray-200/20 dark:border-gray-700/20">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 hover:text-red-600 dark:hover:text-red-400 w-full text-left transition-all duration-200"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-white p-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-300"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-t border-gray-200/20 dark:border-gray-700/20">
          <div className="px-4 pb-4 pt-2">
            <ul className="flex flex-col gap-3 text-gray-700 dark:text-gray-200 font-medium">
              <li>
                <NavLink
                  to="/"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allProperties"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`
                  }
                >
                  ALL Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                            : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={toggleDropdown}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 transition-all duration-300 flex items-center justify-between"
                    >
                      Dashboard Menu
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {dropdownOpen && (
                      <ul className="pl-4 space-y-2 mt-2">
                        {dashboardMenuItems.map(({ path, label }) => (
                          <li key={path}>
                            <NavLink
                              to={path}
                              onClick={() => {
                                toggleMenu();
                                setDropdownOpen(false);
                              }}
                              className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                                  isActive
                                    ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                                    : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
                                }`
                              }
                            >
                              {label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={toggleTheme}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 transition-all duration-300 flex items-center gap-3"
                >
                  {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
                </button>
              </li>

              {!user ? (
                <li>
                  <NavLink
                    to="/login"
                    onClick={toggleMenu}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 block text-center shadow-lg hover:shadow-emerald-500/25 font-semibold"
                  >
                    Login / Register
                  </NavLink>
                </li>
              ) : (
                <li className="relative">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <div className="relative">
                      <img
                        src={user.photoURL}
                        alt="user"
                        className="w-10 h-10 rounded-full border-2 border-emerald-500/30"
                      />
                    </div>
                    <span className="flex-1 font-medium text-sm">{user.displayName}</span>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



// import React, { useContext, useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import { AuthContext } from "../Context/AuthProvider";
// import { ThemeContext } from "../Context/Theme";
// import useUserRole from "../hooks/useUserRole";
// import logo from "../assets/images.png";
// import { Moon, Sun, Menu, X, LogOut, ChevronDown } from "lucide-react";

// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const { theme, setTheme } = useContext(ThemeContext);
//   const { role, roleLoading } = useUserRole();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true);
//   const lastScrollY = useRef(window.scrollY);
//   const dashboardRef = useRef(null);
//   const profileRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY < 50) {
//         setShowNavbar(true);
//       } else if (window.scrollY > lastScrollY.current) {
//         setShowNavbar(false); // scrolling down
//       } else {
//         setShowNavbar(true); // scrolling up
//       }
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handle clicks outside to close dropdowns
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dashboardRef.current &&
//         !dashboardRef.current.contains(event.target) &&
//         profileRef.current &&
//         !profileRef.current.contains(event.target)
//       ) {
//         setDropdownOpen(false);
//         setProfileDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);
//   const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

//   const activeClass =
//     "text-emerald-500 dark:text-emerald-400 font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-blue-500 after:rounded-full";
//   const inactiveClass =
//     "hover:text-emerald-500 dark:hover:text-emerald-400 relative group transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-blue-500 after:rounded-full after:transition-all after:duration-300 hover:after:w-full";

//   const getDashboardMenuItems = () => {
//     if (roleLoading) return [];

//     if (role === "agent") {
//       return [
//         { path: "/dashboard/agentProfile", label: "Agent Profile" },
//         { path: "/dashboard/addProperty", label: "Add Property" },
//         { path: "/dashboard/myAddedProperties", label: "My Added Properties" },
//         { path: "/dashboard/mySoldProperty", label: "My Sold Properties" },
//         { path: "/dashboard/requestedProperty", label: "Requested Properties" },
//       ];
//     }

//     if (role === "user") {
//       return [
//         { path: "/dashboard/myProfile", label: "My Profile" },
//         { path: "/dashboard/wishLists", label: "Wish List" },
//         { path: "/dashboard/propertyBought", label: "Property Bought" },
//         { path: "/dashboard/myReviews", label: "My Reviews" },
//       ];
//     }

//     if (role === "admin") {
//       return [
//         { path: "/dashboard/adminProfile", label: "Admin Profile" },
//         { path: "/dashboard/manageProperties", label: "Manage Properties" },
//         { path: "/dashboard/manageUsers", label: "Manage Users" },
//         { path: "/dashboard/manageReviews", label: "Manage Reviews" },
//         { path: "/dashboard/advertise-property", label: "Advertise Property" },
//       ];
//     }

//     return [];
//   };

//   const dashboardMenuItems = getDashboardMenuItems();

//   return (
//     <nav
//       className={`backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20 sticky top-0 z-50 transition-all duration-500 ${
//         showNavbar ? "translate-y-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50" : "-translate-y-full"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//         {/* Logo */}
//         <NavLink to="/" className="group">
//           <div className="relative">
//             <img
//               src={logo}
//               alt="Logo"
//               className="w-12 h-12 rounded-full ring-2 ring-emerald-500/30 group-hover:ring-emerald-500/60 transition-all duration-300 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </div>
//         </NavLink>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-200 font-medium">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/about"
//               className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//             >
//               About
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/contact"
//               className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//             >
//               Contact
//             </NavLink>
//           </li>

//           {user && (
//             <li className="relative" ref={dashboardRef}>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//                 onMouseEnter={() => setDropdownOpen(true)}
//                 onMouseLeave={() => setDropdownOpen(false)}
//               >
//                 <div className="flex items-center gap-2">
//                   Dashboard
//                   <ChevronDown
//                     size={20}
//                     className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
//                   />
//                 </div>
//               </NavLink>
//               {dropdownOpen && (
//                 <ul className="absolute top-10 left-0 bg-white dark:bg-gray-800 border border-gray-200/20 dark:border-gray-700/20 rounded-lg shadow-lg w-48 py-2 z-50">
//                   {dashboardMenuItems.map(({ path, label }) => (
//                     <li key={path}>
//                       <NavLink
//                         to={path}
//                         className={({ isActive }) =>
//                           `block px-4 py-2 text-gray-700 dark:text-gray-200 ${
//                             isActive ? activeClass : inactiveClass
//                           }`
//                         }
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         {label}
//                       </NavLink>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           )}

//           {/* Theme Toggle */}
//           <li>
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-300 hover:scale-110"
//             >
//               {theme === "light" ? (
//                 <Moon size={20} className="text-emerald-600 dark:text-emerald-400" />
//               ) : (
//                 <Sun size={20} className="text-amber-500" />
//               )}
//             </button>
//           </li>

//           {!user ? (
//             <>
//               <li>
//                 <NavLink
//                   to="/login"
//                   className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
//                 >
//                   Login
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/register"
//                   className="border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 px-6 py-2 rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-105"
//                 >
//                   Register
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <li className="relative" ref={profileRef}>
//               <div
//                 onMouseEnter={() => setProfileDropdownOpen(true)}
//                 onMouseLeave={() => setProfileDropdownOpen(false)}
//                 className="flex items-center gap-3"
//               >
//                 <button
//                   onClick={toggleProfileDropdown}
//                   className="flex items-center"
//                 >
//                   <div className="relative group">
//                     <img
//                       src={user.photoURL}
//                       alt="User"
//                       className="w-10 h-10 rounded-full border-2 border-emerald-500/30 group-hover:border-emerald-500 transition-all duration-300 group-hover:scale-105"
//                       title={user.displayName}
//                     />
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>
//                 </button>
//                 {profileDropdownOpen && (
//                   <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 border border-gray-200/20 dark:border-gray-700/20 rounded-lg shadow-lg w-32 py-2 z-50">
//                     <button
//                       onClick={logOut}
//                       className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 w-full text-left"
//                     >
//                       <LogOut size={20} />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </li>
//           )}
//         </ul>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button
//             onClick={toggleMenu}
//             className="text-gray-800 dark:text-white p-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-300"
//           >
//             {menuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-t border-gray-200/20 dark:border-gray-700/20">
//           <div className="px-4 pb-4 pt-2">
//             <ul className="flex flex-col gap-3 text-gray-700 dark:text-gray-200 font-medium">
//               <li>
//                 <NavLink
//                   to="/"
//                   onClick={toggleMenu}
//                   className={({ isActive }) =>
//                     `block px-4 py-3 rounded-xl transition-all duration-300 ${
//                       isActive
//                         ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
//                         : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
//                     }`
//                   }
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   onClick={toggleMenu}
//                   className={({ isActive }) =>
//                     `block px-4 py-3 rounded-xl transition-all duration-300 ${
//                       isActive
//                         ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
//                         : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
//                     }`
//                   }
//                 >
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   onClick={toggleMenu}
//                   className={({ isActive }) =>
//                     `block px-4 py-3 rounded-xl transition-all duration-300 ${
//                       isActive
//                         ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
//                         : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
//                     }`
//                   }
//                 >
//                   Contact
//                 </NavLink>
//               </li>
//               {user && (
//                 <>
//                   <li>
//                     <NavLink
//                       to="/dashboard"
//                       onClick={toggleMenu}
//                       className={({ isActive }) =>
//                         `block px-4 py-3 rounded-xl transition-all duration-300 ${
//                           isActive
//                             ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
//                             : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
//                         }`
//                       }
//                     >
//                       Dashboard
//                     </NavLink>
//                   </li>
//                   <li>
//                     <button
//                       onClick={toggleDropdown}
//                       className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 transition-all duration-300 flex items-center justify-between"
//                     >
//                       Dashboard Submenu
//                       <ChevronDown
//                         size={20}
//                         className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
//                       />
//                     </button>
//                     {dropdownOpen && (
//                       <ul className="pl-4 space-y-2">
//                         {dashboardMenuItems.map(({ path, label }) => (
//                           <li key={path}>
//                             <NavLink
//                               to={path}
//                               onClick={() => {
//                                 toggleMenu();
//                                 setDropdownOpen(false);
//                               }}
//                               className={({ isActive }) =>
//                                 `block px-4 py-3 rounded-xl transition-all duration-300 ${
//                                   isActive
//                                     ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
//                                     : "hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
//                                 }`
//                               }
//                             >
//                               {label}
//                             </NavLink>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 </>
//               )}
//               <li>
//                 <button
//                   onClick={toggleTheme}
//                   className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 transition-all duration-300 flex items-center gap-3"
//                 >
//                   {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
//                 </button>
//               </li>

//               {!user ? (
//                 <li>
//                   <NavLink
//                     to="/login"
//                     onClick={toggleMenu}
//                     className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 block text-center shadow-lg hover:shadow-emerald-500/25 font-semibold"
//                   >
//                     Login / Register
//                   </NavLink>
//                 </li>
//               ) : (
//                 <li className="relative">
//                   <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
//                     <div className="relative">
//                       <img
//                         src={user.photoURL}
//                         alt="user"
//                         className="w-10 h-10 rounded-full border-2 border-emerald-500/30"
//                       />
//                     </div>
//                     <span className="flex-1 font-medium">{user.displayName}</span>
//                     <button
//                       onClick={toggleProfileDropdown}
//                       className="flex items-center"
//                     >
//                       <ChevronDown
//                         size={20}
//                         className={`transition-transform duration-300 ${profileDropdownOpen ? "rotate-180" : ""}`}
//                       />
//                     </button>
//                   </div>
//                   {profileDropdownOpen && (
//                     <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 border border-gray-200/20 dark:border-gray-700/20 rounded-lg shadow-lg w-32 py-2 z-50">
//                       <button
//                         onClick={() => {
//                           logOut();
//                           toggleMenu();
//                         }}
//                         className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 w-full text-left"
//                       >
//                         <LogOut size={20} />
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;




// import React, { useContext, useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router"; 
// import { AuthContext } from "../Context/AuthProvider";
// import { ThemeContext } from "../Context/Theme";
// import logo from "../assets/images.png"
// import { Moon, Sun, Menu, X } from "lucide-react";

// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const { theme, setTheme } = useContext(ThemeContext);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true);
//   const lastScrollY = useRef(window.scrollY);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY < 50) {
//         setShowNavbar(true);
//       } else if (window.scrollY > lastScrollY.current) {
//         setShowNavbar(false); // scrolling down
//       } else {
//         setShowNavbar(true); // scrolling up
//       }
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

//   // 🔥 Active link style helper
//   const activeClass =
//     "text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-4";
//   const inactiveClass = "hover:text-indigo-500";

//   return (
//     <nav
//       className={`bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-transform duration-300 ${
//         showNavbar ? "translate-y-0" : "-translate-y-full"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//         {/* Logo */}
//         <NavLink to="/">
//           <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
//         </NavLink>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex items-center gap-6 text-gray-800 dark:text-gray-200 font-medium">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//             >
//               Home
//             </NavLink>
//           </li>
          
//           {user && (
//             <>
//             <li>
//               <NavLink
//                 to="/allProperties"
//                 className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//               >
//                 All Properties
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//               >
//                 Dashboard
//               </NavLink>
//             </li>
//             </>
            
//           )}

//           {/* Theme Toggle */}
//           <li>
//             <button onClick={toggleTheme}>
//               {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
//             </button>
//           </li>

//           {!user ? (
//             <>
//               <li>
//                 <NavLink
//                   to="/login"
//                   className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
//                 >
//                   Login
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/register"
//                   className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
//                 >
//                   Register
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <li className="flex items-center gap-3">
//               <img
//                 src={user.photoURL}
//                 alt="User"
//                 className="w-10 h-10 rounded-full border"
//                 title={user.displayName}
//               />
//               <button
//                 onClick={logOut}
//                 className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
//               >
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="text-gray-800 dark:text-white">
//             {menuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden px-4 pb-4">
//           <ul className="flex flex-col gap-4 text-gray-800 dark:text-gray-200 font-medium">
//             <li>
//               <NavLink
//                 to="/"
//                 onClick={toggleMenu}
//                 className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/allProperties"
//                 onClick={toggleMenu}
//                 className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//               >
//                 All properties
//               </NavLink>
//             </li>
//             {user && (
//               <li>
//                 <NavLink
//                   to="/dashboard"
//                   onClick={toggleMenu}
//                   className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
//                 >
//                   Dashboard
//                 </NavLink>
//               </li>
//             )}
//             <li>
//               <button onClick={toggleTheme}>
//                 {theme === "light" ? "🌙 Dark" : "🌞 Light"}
//               </button>
//             </li>

//             {!user ? (
//               <li>
//                 <NavLink
//                   to="/login"
//                   onClick={toggleMenu}
//                   className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition block text-center"
//                 >
//                   Login / Register
//                 </NavLink>
//               </li>
//             ) : (
//               <li className="flex items-center gap-3">
//                 <img
//                   src={user.photoURL}
//                   alt="user"
//                   className="w-10 h-10 rounded-full border"
//                 />
//                 <button
//                   onClick={() => {
//                     logOut();
//                     toggleMenu();
//                   }}
//                   className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                 >
//                   Logout
//                 </button>
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;