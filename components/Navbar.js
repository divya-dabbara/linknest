"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const showNavbar = ["/", "/generate"].includes(pathname);

    return (
        <>
            {showNavbar && <nav className='bg-white text-gray-600 w-[80vw] flex justify-between fixed absolute top-10 right-[10vw] rounded-full px-7 py-5'>
                <div className="logo flex gap-20 items-center">
                    <Link href="/"><img className="h-6" src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="" /></Link>
                    <ul className='flex gap-10'>
                        <Link href="/"><li>Products</li></Link>
                        <Link href="/"><li>Templates</li></Link>
                        <Link href="/"><li>Marketplace</li></Link>
                        <Link href="/"><li>Learn</li></Link>
                        <Link href="/"><li>Pricing</li></Link>
                    </ul>
                </div>


                <div className='flex gap-2'>
                    <button className="login font-bold bg-gray-200 p-4 rounded-lg">Log in</button>
                    <button className="signup font-bold bg-gray-900 text-white p-4 rounded-full">Sign up free</button>
                </div>
            </nav>
            }
        </>


    )
}

export default Navbar
