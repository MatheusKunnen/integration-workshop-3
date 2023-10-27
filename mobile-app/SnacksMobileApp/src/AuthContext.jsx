import React, {createContext, useContext, useReducer} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useReducer((state, action) => {
        switch (action.type) {
            case 'login':
                return action.payload;
            case 'logout':
                return null;
            default:
                return state;
        }
    }, null);

    return (
        <AuthContext.Provider value={{token, login: setToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);