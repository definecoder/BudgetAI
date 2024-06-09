'use client'

import Image from 'next/image'
import logo from '@/public/logo.png'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

const DashboardNavBar = () => {

    let pathname = usePathname();
    pathname = pathname.split('/')[pathname.split('/').length - 1];

  return (
    <div className=' flex w-full px-32 h-24  justify-between pt-2' >
        
        {/* logo part */}
        <div className=' flex'>
            
            <Link href={'/dashboard'}>
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
            <Link className={pathname === 'dashboard' ? 'text-secondary' : ''} href={'/dashboard'}> Dashboard</Link>
            <Link className={pathname === 'analytics' ? 'text-secondary' : ''} href={'/analytics'}> Analytics</Link>
            {/* <Link href={'#'}> Profile</Link> */}
            <Link href={'/'} onClick={()=>{
                localStorage.removeItem('token');
            }}> Logout</Link>
        </div>
        
    </div>
  ) 
}
 
export default DashboardNavBar