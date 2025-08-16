import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../component/Error";
import PrivateRoute from "../routers/PrivateRoute";
import Dashboard from "../component/Dashboard";
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
               element: <PrivateRoute> <PropertyDetails></PropertyDetails></PrivateRoute>
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
                path:'makeOffer/:id',
               element: <PrivateRoute><MakeOffer></MakeOffer></PrivateRoute>
            },
            {
                path: '/about',
                Component: About
            },
            {
                path:'forbidden',
                Component: Forbidden
            }
           
        ] 
    },
    { 
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [

            // agent site
            {
                index: true,
                element: <Dashboard />
            },
            {
             path:'addProperty',
            Component: AddProperty
            },
            {
             path: 'myAddedProperties',
             Component: MyAddedProperties
            },
            {
                path:'update-property/:id',
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

            // user
            {
                path: 'myProfile',
                Component:MyProfile
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
                Component:MyReviews
            },
            {
                path: 'payment/:propertyId/:offerId',
                Component: Payment
            },
            

            // admin
            {
                path: 'manageUsers',
                element: <AdminRoute> <ManageUsers></ManageUsers>  </AdminRoute>
            },
            {
                path:'adminProfile',
                element: <AdminRoute> <AdminProfile></AdminProfile> </AdminRoute> 
            },
            {
                path: 'ManageProperties',
                element: <AdminRoute> <ManageProperties></ManageProperties> </AdminRoute>
            },
            {
                path: 'manageReviews',
                element: <AdminRoute> <ManageReviews></ManageReviews> </AdminRoute>
            },
            {
                path:'advertise-property',
                element: <AdminRoute>  <AdvertiseProperty></AdvertiseProperty> </AdminRoute>
            }
        ]
    },
    {
        path: "*",
        element: <Error></Error>
    }  
])