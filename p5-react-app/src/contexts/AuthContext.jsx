import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try{
            const response = await fetch(import.meta.env.VITE_API_URL + "/api/auth/session", {
                method: "GET",
                credentials: "include",
                headers: {
            "Content-Type": "application/json",
          },
            });

            const data = await response.json();

            if (data.authenticated) {
            setUser(data.user);
            setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }

        } catch (error) {
            setIsAuthenticated(false);
        };
    };

    return (
    <AuthContext.Provider value={{isAuthenticated, user, setUser}}>
        {children}
    </AuthContext.Provider>
);

};


