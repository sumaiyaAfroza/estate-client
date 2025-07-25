import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [role, setRole] = useState(null);
    const [isRoleLoading, setIsRoleLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                if (!authLoading && user?.email) {
                    const res = await axiosSecure.get(`/users/${user.email}/role`);
                    setRole(res.data?.role || 'user');
                } else if (!authLoading && !user) {
                    setRole(null);
                }
            } catch (err) {
                console.error('Error fetching role:', err);
                setRole('user');
            } finally {
                setIsRoleLoading(false);
            }
        };

        fetchRole();
    }, [user?.email, authLoading, axiosSecure, user]);

    return { role, isRoleLoading };
};

export default useUserRole;