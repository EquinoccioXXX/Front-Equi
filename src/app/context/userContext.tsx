'use client';


import React, { createContext, useContext, useState } from 'react';

import User from '../interfaces/user';



interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext debe ser utilizado dentro de un UserProvider');
    }
    return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const contextValue: UserContextType = {
        user,
        setUser,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}