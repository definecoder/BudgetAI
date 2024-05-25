

import Image from 'next/image'
import logo from '@/public/logo.png'
import {Button} from '@/components/ui/button'

const HomePageNavBar = () => {
  return (
    <div className=' flex w-full px-32 h-24  justify-between pt-2' >
        
        {/* logo part */}
        <div className=' flex'>
            
            <Image
                src={logo}
                alt='logo'
                height={96}
                width={96}
                className=' pt-1'
            ></Image>

        </div>

        {/* buttons part */}
        <div className=' flex justify-between items-center gap-8'>
            <Button className=' bg-transparent border-secondary border-2'>Login</Button>
            <Button className=' bg-transparent border-secondary border-2'>Sign Up</Button>
        </div>
        
    </div>
  ) 
}
 
export default HomePageNavBar