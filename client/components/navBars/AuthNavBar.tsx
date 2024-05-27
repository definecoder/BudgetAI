

import Image from 'next/image'
import logo from '@/public/logo.png'
import Link from 'next/link'




const AuthNavBar = () => {
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
        
    </div>
  ) 
}
 
export default AuthNavBar