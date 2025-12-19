import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `https://a12-estate-server.vercel.app`
    // baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    // Request interceptor
    useEffect(()=>{
      const forbiddenSolve = axiosSecure.interceptors.request.use(config => {
        if (user?.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });


    return ()=>{
      axiosSecure.interceptors.request.eject(forbiddenSolve)
    }
    
   },[user])

    // Response interceptor
    axiosSecure.interceptors.response.use(
        res => res,
        error => {
            const status = error.response?.status;
            if (status === 403) {
                navigate('/forbidden');
            } else if (status === 401) {
                logOut()
                    .then(() => navigate('/login'))
                    .catch(err => console.error('Logout error:', err));
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;