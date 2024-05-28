'use client'

import Image from "next/image";
import bgImage from "@/public/bgImage.png";
import HomePageNavBar from "@/components/navBars/HomePageNavBar";
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <main>
      <div className=" absolute ml-[45vw] mt-[20vh]">

        <Image 
        // show it only on large screens
        className=" hidden md:block"
        src={bgImage}
        alt="background image"
        />

      </div>
      
      {/* main div */}
      <div > 
        {/* navBar */}
        <HomePageNavBar />
        <div className=" h-[80vh] flex items-center pl-[5vh]">
          <div className=" h-min flex-col  items-center">
            <h1 className=" text-center text-7xl text-primary">Budget AI</h1>
            <p className=" pt-10 text-3xl text-secondary">Your Personal Budget Manager</p>
            <h1 className=" pb-10 text-center">Powered By AI</h1>

            <Button className=" ml-[35%] bg-transparent border-secondary border-2" onClick={()=>{
              router.push('/signup')
            }}>Get Started</Button>
          </div>
          
        </div>

      </div>
      

    </main>
  );
}
