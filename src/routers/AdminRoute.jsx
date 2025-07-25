import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading: authLoading } = useAuth();
    const { role, isRoleLoading: roleLoading } = useUserRole();

    if (authLoading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    if (!user || role !== 'admin') {
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }
    return children;
};
export default AdminRoute;