import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../component/Error";
import PrivateRoute from "../routers/PrivateRoute";
import DashboardOverview from "../pages/dashboard/DashboardOverview";
import DashboardLayout from "../Layout/DashboardLayout";
import AllProperties from "../component/allProperties/AllProperties";
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
import PropertyDetails from "../component/allProperties/PropertyDetails";
import MakeOffer from "../pages/dashboard/users/MakeOffer";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import Payment from "../pages/dashboard/users/payment/Payment";
import Forbidden from "../component/Forbidden";
import AdminRoute from "../routers/AdminRoute";
import AdminProfile from "../pages/dashboard/admin/AdminProfile";
import ManageReviews from "../pages/dashboard/admin/ManageReviews";
import ManageProperties from "../pages/dashboard/admin/ManageProperties";
import AdvertiseProperty from "../pages/dashboard/admin/AdvertiseProperty";
import About from "../component/About";
import Contact from "../component/Contact";
import AdvertiseSection from "../component/AdvertiseSection";
import PasswordReset from "../pages/PasswordReset";
import CompareProperties from "../pages/CompareProperties";
import AppointmentBooking from "../pages/dashboard/users/AppointmentBooking";
import SavedSearches from "../pages/SavedSearches";


export const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                index:true,
                Component: Home,
            },
            {
                path:'/allProperties',
                Component: AllProperties
            },
            {
                path: '/propertyDetails/:id',
                element: <PrivateRoute><PropertyDetails /></PrivateRoute>
            },
            {
                path:'/advertiseSection',
                Component: AdvertiseSection
            },
            {
                path:'/login',
                Component: Login
            },
            {
                path:'/register',
                Component: Register
            },
            {
                path:'/forgot-password',
                Component: PasswordReset
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path:'forbidden',
                Component: Forbidden
            },
            {
                path:'/compare',
                element: <PrivateRoute><CompareProperties /></PrivateRoute>
            },
            {
                path:'/saved-searches',
                element: <PrivateRoute><SavedSearches /></PrivateRoute>
            },
            {
                path:'/appointment/:id',
                element: <PrivateRoute><AppointmentBooking /></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardOverview />
            },
            {
                path: 'overview',
                element: <DashboardOverview />
            },
            {
                path: 'addProperty',
                Component: AddProperty
            },
            {
                path: 'myAddedProperties',
                Component: MyAddedProperties
            },
            {
                path: 'update-property/:id',
                Component: UpdateProperty
            },
            {
                path: 'agentProfile',
                Component: AgentProfile
            },
            {
                path: 'mySoldProperty',
                Component: MySoldProperties
            },
            {
                path: 'requestedProperty',
                Component: RequestedProperties
            },
            {
                path: 'myProfile',
                Component: MyProfile
            },
            {
                path: 'wishLists',
                Component: WishList
            },
            {
                path: 'propertyBought',
                Component: PropertyBought
            },
            {
                path: 'myReviews',
                Component: MyReviews
            },
            {
                path: 'makeOffer/:id',
                element: <PrivateRoute><MakeOffer /></PrivateRoute>
            },
            {
                path: 'payment/:propertyId/:offerId',
                Component: Payment
            },
            {
                path: 'appointments',
                element: <PrivateRoute><AppointmentBooking /></PrivateRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile /></AdminRoute>
            },
            {
                path: 'manageProperties',
                element: <AdminRoute><ManageProperties /></AdminRoute>
            },
            {
                path: 'manageReviews',
                element: <AdminRoute><ManageReviews /></AdminRoute>
            },
            {
                path: 'advertise-property',
                element: <AdminRoute><AdvertiseProperty /></AdminRoute>
            }
        ]
    },
    {
        path: "*",
        element: <Error />
    }
]);





// title er text color
// bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent



// btn er bg soho text
// bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white