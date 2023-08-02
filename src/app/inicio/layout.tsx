"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useUserContext } from "../context/userContext";

export default function InicioLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUserContext();

    const router = useRouter();


    useEffect(() => {

        if (!user) {
            router.push('/login');
            return
        }
    }, [router, user])

    if(!user){
        return<></>
    }

    return (
        <>
            {children}
        </>
    )
}