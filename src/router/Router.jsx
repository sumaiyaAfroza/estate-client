import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "../routers/PrivateRoute";
import AdminRoute from "../routers/AdminRoute";

// Lazy-loaded public pages (code-split for performance)
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const AllProperties = lazy(() => import("../component/allProperties/AllProperties"));
const PropertyDetails = lazy(() => import("../component/allProperties/PropertyDetails"));
const About = lazy(() => import("../component/About"));
const Contact = lazy(() => import("../component/Contact"));
const AdvertiseSection = lazy(() => import("../component/AdvertiseSection"));
const CompareProperties = lazy(() => import("../pages/CompareProperties"));
const PasswordReset = lazy(() => import("../pages/PasswordReset"));
const SavedSearches = lazy(() => import("../pages/SavedSearches"));
const AppointmentBooking = lazy(() => import("../pages/dashboard/users/AppointmentBooking"));

// Non-lazy dashboard pages (loaded once user is authenticated)
import DashboardOverview from "../pages/dashboard/DashboardOverview";
import AddProperty from "../pages/dashboard/agents/AddProperty";
import MyAddedProperties from "../pages/dashboard/agents/MyAddedProperties";
import UpdateProperty from "../pages/dashboard/agents/UpdateProperty";
import AgentProfile from "../pages/dashboard/agents/AgentProfile";
import MySoldProperties from "../pages/dashboard/agents/MySoldProperties";
import RequestedProperties from "../pages/dashboard/agents/RequestedProperties";
import MyProfile from "../pages/dashboard/users/MyProfile";
import WishList from "../pages/dashboard/users/WishList";
import PropertyBought from "../pages/dashboard/users/PropertyBought";
import MyReviews from "../pages/dashboard/users/MyReviews";
import MakeOffer from "../pages/dashboard/users/MakeOffer";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import Payment from "../pages/dashboard/users/payment/Payment";
import AdminProfile from "../pages/dashboard/admin/AdminProfile";
import ManageReviews from "../pages/dashboard/admin/ManageReviews";
import ManageProperties from "../pages/dashboard/admin/ManageProperties";
import AdvertiseProperty from "../pages/dashboard/admin/AdvertiseProperty";
import AdminAnalytics from "../pages/dashboard/admin/AdminAnalytics";

import Error from "../component/Error";
import Forbidden from "../component/Forbidden";

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, element: <Suspense fallback={<LoadingFallback />}><Home /></Suspense> },
      { path: "/allProperties", element: <Suspense fallback={<LoadingFallback />}><AllProperties /></Suspense> },
      { path: "/propertyDetails/:id", element: <PrivateRoute><Suspense fallback={<LoadingFallback />}><PropertyDetails /></Suspense></PrivateRoute> },
      { path: "/advertiseSection", element: <Suspense fallback={<LoadingFallback />}><AdvertiseSection /></Suspense> },
      { path: "/login", element: <Suspense fallback={<LoadingFallback />}><Login /></Suspense> },
      { path: "/register", element: <Suspense fallback={<LoadingFallback />}><Register /></Suspense> },
      { path: "/forgot-password", element: <Suspense fallback={<LoadingFallback />}><PasswordReset /></Suspense> },
      { path: "/about", element: <Suspense fallback={<LoadingFallback />}><About /></Suspense> },
      { path: "/contact", element: <Suspense fallback={<LoadingFallback />}><Contact /></Suspense> },
      { path: "/compare", element: <PrivateRoute><Suspense fallback={<LoadingFallback />}><CompareProperties /></Suspense></PrivateRoute> },
      { path: "/saved-searches", element: <PrivateRoute><Suspense fallback={<LoadingFallback />}><SavedSearches /></Suspense></PrivateRoute> },
      { path: "/appointment/:id", element: <PrivateRoute><Suspense fallback={<LoadingFallback />}><AppointmentBooking /></Suspense></PrivateRoute> },
      { path: "/forbidden", element: <Forbidden /> },
      { path: "*", element: <Error /> },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "overview", element: <DashboardOverview /> },
      { path: "addProperty", element: <AddProperty /> },
      { path: "myAddedProperties", element: <MyAddedProperties /> },
      { path: "update-property/:id", element: <UpdateProperty /> },
      { path: "agentProfile", element: <AgentProfile /> },
      { path: "mySoldProperty", element: <MySoldProperties /> },
      { path: "requestedProperty", element: <RequestedProperties /> },
      { path: "myProfile", element: <MyProfile /> },
      { path: "wishLists", element: <WishList /> },
      { path: "propertyBought", element: <PropertyBought /> },
      { path: "myReviews", element: <MyReviews /> },
      { path: "makeOffer/:id", element: <PrivateRoute><MakeOffer /></PrivateRoute> },
      { path: "payment/:propertyId/:offerId", element: <Payment /> },
      { path: "manageUsers", element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: "adminProfile", element: <AdminRoute><AdminProfile /></AdminRoute> },
      { path: "manageProperties", element: <AdminRoute><ManageProperties /></AdminRoute> },
      { path: "admin-analytics", element: <AdminRoute><AdminAnalytics /></AdminRoute> },
      { path: "manageReviews", element: <AdminRoute><ManageReviews /></AdminRoute> },
      { path: "advertise-property", element: <AdminRoute><AdvertiseProperty /></AdminRoute> },
    ],
  },
]);
