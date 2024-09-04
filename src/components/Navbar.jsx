import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white '>
            <div className='py-2 px-4 md:mycontainer flex justify-between items-center'>
                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'>&lt;</span><span>Cipher</span><span className="text-green-500">SAFE/&gt;</span>
                </div>

                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href='/'>Home</a>
                        <a className='hover:font-bold' href='/about'>About</a>
                        <a className='hover:font-bold' href='/contact'>Contact Us</a>
                    </li>
                </ul> */}

                <button className='text-white bg-green-700 hover:bg-green-500 rounded-full flex gap-1 items-center justify-center p-2 ring-white ring-1'>
                    <img className="invert w-7" src="./public/icons/github.svg" alt="github logo" />
                    <span className='font-bold'>GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar