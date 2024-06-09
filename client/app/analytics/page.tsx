'use client';

import Chat from "@/components/generals/Chat";
import { message } from "antd";
import { useEffect } from "react";

export default function Analytics() {
    
    let token: any;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }

    useEffect(()=>{
        if(!token){
            window.location.href = '/login';
            alert('Youre not logged in');
        }
    }
    ,[token])

    

    return (
        <main  className="flex justify-center mt-10"><Chat token={token || ""} /></main>
    );
}