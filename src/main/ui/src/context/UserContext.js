import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ 
        auth: false,
        id: null,
        nombre: '',
        apellido: '',
        email: '',
        rol: '',
        ciudad: '',
        token: ''
    });

    useEffect(() => {
        const loggedDigitalAppUser = localStorage.getItem('loggedDigitalAppUser');
        if(loggedDigitalAppUser){
            const user = JSON.parse(loggedDigitalAppUser);
            login(user);
        }
    }, [])

    const login = (userData) => {
        setUser((user) => ({
            ...userData,
            auth: true,
        }));
    };

    const logout = () => {
        setUser((user) => ({
            auth: false,
            id: null,
            nombre: '',
            apellido: '',
            email: '',
            rol: '',
            ciudad: '',
            token: ''
        }));
        localStorage.removeItem('loggedDigitalAppUser');
    };

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};