import axios from "axios";
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
  
const authContextDefaultValues = {
    isLoading: true,
    isUserAuthenticated: false,
    user: null,
    userType: 0,
    register: () => {},
    login: () => {},
    logout: () => {},
};
  
export const AuthContext = createContext(authContextDefaultValues);
  
export function AuthProvider({ children }) {
    const [isLoading, setLoading] = useState(true)
    const [isUserAuthenticated, setUserAutenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userType, setuserType] = useState(0);

    const navigate = useNavigate();

    useEffect(()=>{
        setUserAutenticated(JSON.parse(localStorage.getItem("isUserAuthenticated")));
        setUser(JSON.parse(localStorage.getItem("user")));
        setuserType(JSON.parse(localStorage.getItem("userType")));
        setLoading(false);
        console.log("Yes, running this code")
    },[])

    const register = async (Emp) => {
        try {
            const response = await axios.post("http://localhost:8085/quickloan/api/registerEmployee", Emp);
            return response.data;
        } catch (error) {
            console.error("Registration error", error);
            throw new Error("An error occurred during registration.");
         }
    }

    const login = async (Emp, path) => {
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:8085/quickloan/api/" + path, Emp);
            console.log("SAPI response:",response.data + "Hello");
            if (response.data) {
                setUserAutenticated(true);
                localStorage.setItem("isUserAuthenticated",JSON.stringify(true));
                setUser(response.data);
                localStorage.setItem("user",JSON.stringify(response.data));
                path === "loginAdmin" ? setuserType(1) : setuserType(0);
                localStorage.setItem("userType",JSON.stringify(path === 'loginAdmin'? 1 : 0));
                setLoading(false);
                return true; 
            } else {
                return false;
            }
        } catch (error) {
            console.error("Login error", error);
            throw new Error("An error occurred during login.");
         }
    }

    const logout = () => {
        setLoading(true);
        setUserAutenticated(false);
        localStorage.setItem("isUserAuthenticated",JSON.stringify(false));
        setUser(null);
        localStorage.setItem("user",JSON.stringify(null));
        setLoading(false);
        navigate("/");
    };
  
    const value = {
        isLoading,
        isUserAuthenticated,
        user,
        userType,
        register,
        login,
        logout,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }