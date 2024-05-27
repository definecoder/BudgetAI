

import Image from 'next/image'
import logo from '@/public/logo.png'
import {Button} from '@/components/ui/button'
import Link from 'next/link'




const HomePageNavBar = () => {
  return (
    <div className=' flex w-full px-32 h-24  justify-between pt-2' >
        
        {/* logo part */}
        <div className=' flex'>
            
            <Link href={'/'}>
                <Image
                    src={logo}
                    alt='logo'
                    height={96}
                    width={96}
                    className=' pt-1'
                ></Image>
            </Link>

        </div>

        {/* buttons part */}
        <div className=' flex justify-between items-center gap-8'>
            <Link href={'/login'}> <Button className=' bg-transparent border-secondary border-2'>Login</Button></Link>
            <Link href={'/signup'}><Button className=' bg-transparent border-secondary border-2'>Sign Up</Button></Link>
        </div>
        
    </div>
  ) 
}
 
export default HomePageNavBar