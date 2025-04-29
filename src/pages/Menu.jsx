import React from 'react'
import MenuItem from '../components/MenuItem'

const Menu = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center  bg-[#f7f7f7] '>
    <div className='max-w-7xl w-full h-fit grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 px-3 max-lg:mt-5 gap-6 mt-10'>
      
          <MenuItem/>
          <MenuItem/>
          <MenuItem/>
    </div>
    </div>
  )
}

export default Menu