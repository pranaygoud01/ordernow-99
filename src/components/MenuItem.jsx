import { Link } from '@tanstack/react-router'
import React from 'react'

const MenuItem = () => {
  return (
    <div className='w-full h-[350px] bg-white p-2 rounded-2xl shadow-xl'>
       <div className='h-9/12'>
        <img src='https://images.unsplash.com/photo-1630851840633-f96999247032?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='h-full w-full object-cover  rounded-xl'/>
       </div>
       <div className='w-full h-3/12 p-2 flex justify-between items-center'>
          <div className='flex flex-col gap-1'><p className='text-xl font-semibold '>Biriyani</p>
          <h1 className=''>$2.99</h1>
          </div>
          <div>
            <Link to="/cart" className='font-bold text-white bg-rose-500 px-6 py-3 rounded-md text-sm'>Add to Cart</Link>
          </div>
       </div>
    </div>
  )
}

export default MenuItem