'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";

type Value = {
    token?: string;
    setToken: Dispatch<SetStateAction<string | undefined>>;
}

type Props = {
    children: ReactNode;
}

export const AuthContext = createContext<Value>({
    token: '',
    setToken: () => '',
});


export const AuthContextProvider = ({ children }: Props) => {

    const [token, setToken] = useState<string | undefined>()

    const value: Value = {
        token,
        setToken
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext);