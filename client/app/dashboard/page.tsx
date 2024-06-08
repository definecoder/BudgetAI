'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { DataTableDemo } from "./myTable";
import {PaperPlaneIcon} from '@radix-ui/react-icons'
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import NotLoggedIn from "@/components/generals/NotLoggedIn";
import Loading from "../loading";

export type User = {
    _id: string;
    name: string;
    email: string;
    dailyGoal?: number,
    monthlyGoal?: number,
    yearlyGoal?: number,
}

export default function Page() {    
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [data, setData] = useState([]);   
    const [isLoggedIn, setIsLoggedIn] = useState(true);    

    useEffect(()=>{
        const token = localStorage.getItem('token');
        setIsLoading(true);
        async function fetchUser(){
            try{
                const response = await axios.get('http://localhost:3000/users/loggedin', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setIsLoading(false);
                console.log(response.data);
                setUser(response.data);

            }
            catch(e){
                message.error('login failed');
                setIsLoading(false);
            }            
        }
        if(token){
            setIsLoggedIn(true);
            fetchUser();
        }
        else{
            message.error('Youre not logged in');
            setIsLoggedIn(false);
        }
    }, [])

    useEffect(()=>{
    const token = localStorage.getItem('token');
    async function fetchExpenses(){
      try{
        console.log('current user '+ user?._id);
        const response = user?._id && await axios.get(`http://localhost:3000/expense/getAllExpenses/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response && response.data);
        setData(response && response.data);
      }
      catch(e){
        alert(JSON.stringify(e));
      }
    }
    fetchExpenses();
  }, [isLoadingButton, user?._id])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = new FormData(e.currentTarget);
        const expense = data.get('expense') as string;
        try{

            setIsLoadingButton(true);

            const userId = '665dd31041df4941fab0db34'
            const response = await axios.post('http://localhost:3000/expense/add', {text: expense, userId: userId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            
            setIsLoadingButton(false);
            if(response.statusText === 'OK'){
                message.success('Expense added successfully');
            }                

        }
        catch(e){
            setIsLoadingButton(false);
            message.error('Failed to add expense');
        }
    }

    
    
    return (
        <main>
            {/* main wrapper */}
            {isLoggedIn ? isLoading ? <Loading /> :
            <div className="flex  h-[80vh] justify-around">
                {/* left wrapper */}
                <div className=" flex flex-col justify-center h-full w-[40vw]">
                    {/* upper */}
                    <form onSubmit={handleSubmit}>
                        <div className=" flex flex-col">
                            <h1 className="self-start mb-20">Have a good day, <b className="text-secondary">{user && user['name']}!</b></h1>
                            <Label className="text-primary mb-5 text-3xl">Your Expense</Label>
                            <Textarea name="expense" className="bg-transparent border-secondary" placeholder="What did you spend money on today?" />
                            <Button type="submit" className=" bg-transparent mt-5 border-secondary border-2 w-[30%] max-w-[100px] self-end"> 
                                {isLoadingButton ? <Loading /> : <PaperPlaneIcon /> }
                            </Button>
                        </div>
                    </form>

                    {/* lower */}
                    {/* <div className="border-2">
                        Analytics
                    </div> */}
                </div>
                {/* right wrapper */}
                <div className="hidden md:block">
                    <DataTableDemo data={data} />
                </div>
            </div>
            : <NotLoggedIn />
            }
        </main>

    );
    
}

