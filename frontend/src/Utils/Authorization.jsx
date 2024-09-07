// Need to redo again (Tung)

// import { useSelector } from 'react-redux';
// import { Navigate, useLocation } from 'react-router-dom';

// const useAuthorization = (allowedRoles) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const location = useLocation();

//   // Check if the user is authenticated and has an allowed role
//   const isAuthorized = isAuthenticated && allowedRoles.includes(user?.userRole);

//   if (!isAuthorized) {
//     // If not authorized, navigate to the forbidden page or another suitable location
//     return <Navigate to="/forbidden" state={{ from: location }} replace />;
//   }

//   return null; // Return null if authorized, allowing the component to render normally
// };

// export default useAuthorization;

import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { checkAuth } from '../apis/auth.js';

const useAuthorization = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const checkRole = async () => {
      const response = await checkAuth();
      setUserRole(response.userRole);
    };
    checkRole();
  }, []);

  if (userRole == "groupAdmin") {
    return <Outlet />;
  }

  if (userRole == "siteAdmin") {
    return <Outlet />;
  }
}

export default useAuthorization;