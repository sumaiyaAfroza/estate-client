import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `https://a12-estate-server.vercel.app`
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    // Request interceptor — set once per component mount, cleaned up on unmount
    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(config => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        }, error => Promise.reject(error));

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
        };
    }, [user]);

    // Response interceptor — singleton, added only once at module load
    if (!axiosSecure._responseAdded) {
        axiosSecure.interceptors.response.use(
            res => res,
            error => {
                const status = error.response?.status;
                if (status === 403) {
                    navigate('/forbidden');
                } else if (status === 401) {
                    logOut()
                        .then(() => navigate('/login'))
                        .catch(() => navigate('/login'));
                }
                return Promise.reject(error);
            }
        );
        axiosSecure._responseAdded = true;
    }

    return axiosSecure;
};

export default useAxiosSecure;
