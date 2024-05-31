'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { message } from "antd"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Loading from "../loading"

export function LoginForm() {

  const router = useRouter();

  const [login, setLogin] = useState({  
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLogin({ ...login, [id]: value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/auth/login', login)
      if(response.statusText === 'OK'){
        localStorage.setItem('token', response.data.token);
        setIsLoading(false);
        router.push("/dashboard");
      }  
    } catch (error) {
      message.error('Invalid email or password');
      setIsLoading(false);
    }
    


  }


  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm bg-transparent border-secondary">
        
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Login</CardTitle>
          <CardDescription className=" text-white">
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>

        
        <CardContent className="grid gap-4">
          <div className="grid gap-2 ">
            <Label className="text-primary" htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" onChange={handleChange} required />
          </div>
          <div className="grid gap-2 ">
            <Label className="text-primary" htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={handleChange} required />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button className="w-full text-white bg-transparent border-2 border-secondary" type="submit">
            {isLoading ? <Loading /> : "Sign In"}
          </Button>
          
        </CardFooter>
        <CardFooter>
          <Button className="w-full text-white bg-transparent border-2 border-secondary">Login with Google</Button>
        </CardFooter>
        <CardFooter className=" text-white">
          <p>Don&apos;t Have an Account? (</p>  <Link className="text-primary underline " href={'/signup'}> Create One!</Link>)
        </CardFooter>
        

      </Card>
    </form>
  )
}
