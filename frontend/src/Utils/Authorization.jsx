import { useState, useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";

import { checkAuth } from '../apis/auth.js';

const useAuthorization = (allowedRoles) => {
  // const userRole = useSelector((state) => state.auth.user?.userRole);
  // const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      const response = await checkAuth();
      setRole(response.userRole);
    };
    checkRole();
  }, []);

  const isAuthorized =
    role && allowedRoles.includes(role); // Check if user has an allowed role

  if (!isAuthorized) {
    // If not authorized, you can either:
    // 1. Redirect to a forbidden page or another suitable location
    // return <Navigate to="/forbidden" state={{ from: location }} replace />;
    return false

    // 2. Render an error or "access denied" message
    // return <div>Access Denied. You need to be a {allowedRoles.join(' or ')} to view this content.</div>;
  }

  return true; // Return null if authorized, allowing the component to render normally
};

export default useAuthorization;

/*  Sample method to use authorizationx`
import useAuthorization from "../utils/useAuthorization";

function GroupAdminPage() {
  const authorizationCheck = useAuthorization(["groupAdmin", "siteAdmin"]);

  if (authorizationCheck) {
    return authorizationCheck;
  }

  // ... rest of your component logic for group admins
}
*/

// import { Outlet } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// import { checkAuth } from '../apis/auth.js';

// const useAuthorization = () => {
//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     const checkRole = async () => {
//       const response = await checkAuth();
//       setUserRole(response.userRole);
//     };
//     checkRole();
//   }, []);

//   if (userRole == "groupAdmin") {
//     return <Outlet />;
//   }

//   if (userRole == "siteAdmin") {
//     return <Outlet />;
//   }
// }

// export default useAuthorization;