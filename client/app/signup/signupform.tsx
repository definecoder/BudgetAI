import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm bg-transparent border-secondary">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Sign Up</CardTitle>
        <CardDescription className=" text-white">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="text-primary" htmlFor="name">Name</Label>
            <Input
              id="name"
              type="name"
              placeholder="Shawon Majid"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-primary" htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-primary" htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full bg-transparent  border-secondary border-2 text-white">
            Create an account
          </Button>
          <Button variant="default" className="w-full bg-transparent  border-secondary border-2 text-white">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm text-white">
          Already have an account?{" "}
          <Link href="/login" className="underline text-primary">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
