import Link from "next/link";
import { Button } from "../ui/button";

export default function NotLoggedIn() {
    return (
        <> 
            <div className="flex flex-col h-[80vh] justify-center items-center gap-5">
                <div className=" text-5xl">You&apos;re not logged in!</div>
                <Link href={'/login'} className=' bg-transparent rounded p-3 px-6 border-secondary border-2'>
                    Login
                </Link>
            </div> 
        </>
    );
}