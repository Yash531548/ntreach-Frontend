import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    // 🔹 Step 1: Read from localStorage at initial load
    const [isAuthenticated, setIsAuthenticated] = useState(() =>
        !!localStorage.getItem('userToken') // ✅ Check if token exists
    );
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem('user')) || null // ✅ Load user object if saved
    );

    // 🔹 Step 2: Write (setItem) into localStorage after login
    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);

        // ✅ Save token + user in localStorage
        localStorage.setItem('userToken', userData.token || 'mocktoken');
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // 🔹 Step 3: Remove (clear) from localStorage after logout
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);

        // ❌ Remove token + user
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');

        // ❌ Wipe all key-value pairs stored in localStorage
        localStorage.clear();
    };

    // 🔹 Step 4: Keep state synced across multiple tabs
    useEffect(() => {
        const syncAuth = () => {
            // ✅ Always read latest from localStorage if another tab changes it
            setIsAuthenticated(!!localStorage.getItem('userToken'));
            setUser(JSON.parse(localStorage.getItem('user')));
        };

        window.addEventListener('storage', syncAuth);
        return () => window.removeEventListener('storage', syncAuth);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 🔹 Hook so components can easily use auth state
export const useAuth = () => useContext(AuthContext);
