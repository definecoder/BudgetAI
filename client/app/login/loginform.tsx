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
import Link from "next/link"
import { useState } from "react"

export function LoginForm() {

  const [login, setLogin] = useState({  
    email: '',
    password: ''
  });


  return (
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
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2 ">
          <Label className="text-primary" htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-white bg-transparent border-2 border-secondary">Sign in</Button>
        
      </CardFooter>
      <CardFooter>
        <Button className="w-full text-white bg-transparent border-2 border-secondary">Login with Google</Button>
      </CardFooter>
      <CardFooter className=" text-white">
        <p>Don&apos;t Have an Account? (</p>  <Link className="text-primary underline " href={'/signup'}> Create One!</Link>)
      </CardFooter>

    </Card>
  )
}
