import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center p-2 w-full'>
            <div className="logo font-bold text-white text-xl">
                <span className='text-green-500'>&lt;</span><span>Cipher</span><span className="text-green-500">SAFE/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>Created with<img className="w-7" src="./public/icons/heart.png" alt="love" />by OptimalAches</div>
        </div>
    )
}

export default Footer