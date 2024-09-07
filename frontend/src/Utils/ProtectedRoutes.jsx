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