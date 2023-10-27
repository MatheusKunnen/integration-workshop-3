import React, { createContext, useCallback, useState, useContext, useEffect } from "react";

import api from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [childData, setChildData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      // Set your API authorization header with the token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      // If there is no token, remove the authorization header
      delete api.defaults.headers.authorization;
    }
  }, [token]);

  const logIn = useCallback(async (tagNumber, passwordImageId, childData) => {
    const response = await api.post("/children/login", {
      "tagNumber": tagNumber,
      "passwordImageId": passwordImageId,
    });

    const { token } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("childData", JSON.stringify(childData));

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setToken(token);
    setChildData(childData);
    return;
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("childData");
    delete api.defaults.headers.authorization;
    
    setToken("");
    setChildData({});
  }, []);


  return (
    <AuthContext.Provider
      value={{
        token: token,
        childData: childData,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
