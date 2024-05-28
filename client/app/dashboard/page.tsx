'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { DataTableDemo } from "./myTable";
import {PaperPlaneIcon} from '@radix-ui/react-icons'
import { cookies} from 'next/headers';
import { useEffect, useState } from "react";
import axios from "axios";


export type User = {
    name: string;
    email: string;
    dailyGoal?: number,
    monthlyGoal?: number,
    yearlyGoal?: number,
}

export default function Page() {    
    const [user, setUser] = useState<User | null>(null);
    useEffect(()=>{
        const token = localStorage.getItem('token');
        async function fetchUser(){
            try{
                const response = await axios.get('http://localhost:3000/users/loggedin', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response.data);
                setUser(response.data);
            }
            catch(e){
                alert(JSON.stringify(e));
            }            
        }
        if(token){
            fetchUser();
        }
        else{
            alert('You are not logged in');
        }
    }, [])

    
    
    return !user ? (<> <div>Youre not logged in</div> </>) : (
        <main>
            {/* main wrapper */}
            <div className="flex  h-[80vh] justify-around">
                {/* left wrapper */}
                <div className=" flex flex-col justify-center h-full w-[40vw]">
                    {/* upper */}
                    <div className=" flex flex-col">
                        <h1 className="self-start mb-20">Have a good day, <b className="text-secondary">{user && user['name']}!</b></h1>
                        <Label className="text-primary mb-5 text-3xl">Your Expense</Label>
                        <Textarea className="bg-transparent border-secondary" placeholder="What did you spend money on today?" />
                        <Button className=" bg-transparent mt-5 border-secondary border-2 w-[30%] max-w-[100px] self-end"> <PaperPlaneIcon />  </Button>
                    </div>

                    {/* lower */}
                    {/* <div className="border-2">
                        Analytics
                    </div> */}
                </div>
                {/* right wrapper */}
                <div className="hidden md:block">
                    <DataTableDemo />
                </div>
            </div>
        </main>

    );
    
}

