import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaCreditCard,
  FaMapMarkedAlt,
  FaUserEdit,
  FaUsers,
  FaUserClock,
  FaUserShield,
  FaMotorcycle,
  FaTasks,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
import NoaShipLogo from "../pages/shared/NoaShip/NoaShipLogo";



const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle checkbox (used to control sidebar on small screens) */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="w-full navbar bg-base-300 lg:hidden">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        {/*nested route page content will show here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 space-y-2 text-base-content">
          <Link to={"/"}>
            <NoaShipLogo />
          </Link>
          <li>
            <Link to="/dashboard" className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <NavLink
              to="/dashboard/myParcels"
              className="flex items-center gap-2"
            >
              <FaBoxOpen /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className="flex items-center gap-2"
            >
              <FaCreditCard /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track" className="flex items-center gap-2">
              <FaMapMarkedAlt /> Track Package
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/edit-profile"
              className="flex items-center gap-2"
            >
              <FaUserEdit /> Edit Profile
            </NavLink>
          </li>



          {/* rider links */}
          {!roleLoading && role === "rider" && (
            <>
              <li>
                <NavLink to="/dashboard/pending-deliveries">
                  <FaTasks className="inline-block" />
                  Pending Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/completed-deliveries">
                  <FaCheckCircle className="inline-block" />
                  Completed Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-earnings">
                  <FaWallet className="inline-block" />
                  My Earnings
                </NavLink>
              </li>
            </>
          )}



          
          {/* admin links  */}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/assign-rider"
                  className="flex items-center gap-2"
                >
                  <FaMotorcycle /> Assign Rider
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/pendingRiders"
                  className="flex items-center gap-2"
                >
                  <FaUserClock /> Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/activeRiders"
                  className="flex items-center gap-2"
                >
                  <FaUsers /> Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/makeAdmin">
                  <FaUserShield className="inline-block" />
                  Make Admin
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;






// import {
//   FaHome,
//   FaTasks,
//   FaUsers,
//   FaCoins,
//   FaUserShield,
// } from "react-icons/fa";




// import { Link } from "react-router";
// import useUserRole from "../hooks/useUserRole";
// import useAuth from "../hooks/useAuth";

// const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
//   const { user } = useAuth();
//   const { userData, loading } = useUserRole(user?.email);

//   const role = userData?.role;

//   if (loading) return <p className="p-4">Loading...</p>;

//   const menuItems = [
//     ...(role === "Worker"
//       ? [
//           { name: "Home", path: "/dashboard/worker-home", icon: <FaHome /> },
//           { name: "Task List", path: "/dashboard/tasks", icon: <FaTasks /> },
//           { name: "My Submissions", path: "/dashboard/my-submissions", icon: <FaTasks /> },
//           { name: "Withdrawals", path: "/dashboard/withdrawals", icon: <FaCoins /> },
//         ]
//       : []),

//     ...(role === "Buyer"
//       ? [
//           { name: "Home", path: "/dashboard/buyer-home", icon: <FaHome /> },
//           { name: "Add New Task", path: "/dashboard/add-task", icon: <FaTasks /> },
//           { name: "My Tasks", path: "/dashboard/my-tasks", icon: <FaTasks /> },
//           { name: "Purchase Coins", path: "/dashboard/purchase-coins", icon: <FaCoins /> },
//           { name: "Payment History", path: "/dashboard/payment-history", icon: <FaTasks /> },
//         ]
//       : []),

//     ...(role === "Admin"
//       ? [
//           { name: "Home", path: "/dashboard/admin-home", icon: <FaHome /> },
//           { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
//           { name: "Manage Tasks", path: "/dashboard/manage-tasks", icon: <FaTasks /> },
//           { name: "Withdraw Requests", path: "/dashboard/withdraw-requests", icon: <FaUserShield /> },
//         ]
//       : []),
//   ];

//   return (
//     <>
//       {/* Overlay for mobile */}
//       <div
//         className={fixed inset-0 bg-black opacity-50 z-20 md:hidden ${
//           sidebarOpen ? "block" : "hidden"
//         }}
//         onClick={toggleSidebar}
//       ></div>

//       {/* Sidebar */}
//       <aside
//         className={fixed z-30 inset-y-0 left-0 w-64 bg-blue-800 text-white transform transition-transform duration-200 ease-in-out
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block shadow-lg}
//       >
//         <div className="p-4 text-xl font-bold border-b border-blue-700 sticky top-0 bg-blue-800 z-10">
//           MicroTask Dashboard
//         </div>

//         <nav className="mt-4 flex flex-col gap-1 p-2">
//           {menuItems.length > 0 ? (
//             menuItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 onClick={toggleSidebar}
//                 className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 hover:text-white rounded transition"
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span>{item.name}</span>
//               </Link>
//             ))
//           ) : (
//             <p className="text-sm px-4 text-yellow-300">
//               No menu found for role: <strong>{role || "Unknown"}</strong>
//             </p>
//           )}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;













// import { useEffect, useState } from "react";

// const useUserRole = (email) => {
//   const [userData, setUserData] = useState({});
//   const [loading, setLoading] = useState(true);

  
//   useEffect(() => {
//     if (email) {
//       fetch(https://a12-estate-server.vercel.app/users/${email})
//         .then(res => res.json())
//         .then(data => {
//           setUserData(data);
//           setLoading(false);
//         });
//     }
//   }, [email]);

//   return { userData, loading };
// };

// export default useUserRole;

