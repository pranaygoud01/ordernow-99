import React from 'react'
import { FiShoppingBag } from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";
const NavBar = () => {
    const menu=[
        {name:<MdRestaurantMenu className='text-2xl'/>,path:"/"},
        {name:<FiShoppingBag className='text-2xl'/>,path:"/cart"},
    ]
  return (
    <div className='flex justify-between p-5 sticky top-0 bg-white'>
      <h1 className='font-bold text-xl'>Order Now</h1>
      <div className='flex gap-5 text-sm text-neutral-800 items-center'>
        {menu.map((item,index)=>{
            return <a href={item.path} className='font-semibold' key={index}>{item.name}</a>
        })}
      </div>
    </div>
  )
}

export default NavBar