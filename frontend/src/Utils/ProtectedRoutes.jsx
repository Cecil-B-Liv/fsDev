// import { useSelector } from 'react-redux';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import PropTypes from "prop-types";

// function ProtectedRoute({ children }) {
//     const { isAuthenticated } = useSelector(state => state.auth);
//     const location = useLocation();

//     if (!isAuthenticated) {
//         // Redirect to login page if not authenticated, preserving the intended location
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     // Render the children (the protected component) if authenticated
//     return children;
// }

// ProtectedRoute.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default ProtectedRoute;

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { checkAuth } from '../apis/auth.js';

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