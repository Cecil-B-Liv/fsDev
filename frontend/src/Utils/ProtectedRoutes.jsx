// import { useEffect, useState } from 'react';
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from '../redux/feature/authSlice';

// const ProtectedRoute = () => {
//     const dispatch = useDispatch();
//     // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//     const [isAuthenticated, setIsAuthenticated] = useState(null);
//     const location = useLocation();

//     // useEffect(() => {
//     //     const storedUser = localStorage.getItem('user');
//     //     const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

//     //     if (isAuthenticated && storedUser) {
//     //         dispatch(setUser(JSON.parse(storedUser)));
//     //     }
//     // }, [dispatch]); // Include dispatch in the dependency array

//     useEffect(() => {
//         const checkAuth = async () => {
//             let authStatus = localStorage.getItem('isAuthenticated');
//             setIsAuthenticated(authStatus);
//         }
//         checkAuth();
//     }, []);

//     // return isAuthenticated ? (
//     //     <Outlet />
//     // ) : (
//     //     <Navigate to="/login" state={{ from: location }} replace />
//     // );

//     return (
//         <>
//             {isAuthenticated === 'true' && (
//                 <div>
//                     <Outlet />
//                 </div>

//             )}
//             {localStorage.getItem('keyName') == null && (
//                 <Navigate to="/login" state={{ from: location }} replace />
//             )}
//         </>
//     )
// };

// export default ProtectedRoute;

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { checkAuth } from '../apis/auth.js';
import useAuthorization from './Authorization'

const ProtectedRoute = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const authStatus = async () => {
            const response = await checkAuth();
            setIsAuthenticated(response.isAuth);
        };
        authStatus();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;