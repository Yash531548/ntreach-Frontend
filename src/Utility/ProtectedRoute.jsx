import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/AuthContext";


const ProtectedRoute = ({ children }) => {
    const {isAuthenticated} = useAuth()
    const location = useLocation()
    // Map protected routes to their respective login pages
    const routeRedirectMap = {
        '/dashboard': '/login'
        // Add other routes that should use /login
    }

    // Fallback: most service flows use /loginwithnumber
    const fallbackRedirect = '/loginwithnumber';
    // Get route for current location
    const currentPath = location.pathname;
    const redirectTo = routeRedirectMap[currentPath] || fallbackRedirect;
    if(!isAuthenticated){
        return <Navigate to={redirectTo} state={{from:location}} replace/>
    }
    return children;
}

export default ProtectedRoute