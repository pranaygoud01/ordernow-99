import React from 'react'
import MenuItem from '../components/MenuItem'

const Menu = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center  bg-[#f7f7f7] '>
    <div className='max-w-7xl w-full h-fit grid grid-cols-3 mt-2'>
          <MenuItem/>
          <MenuItem/>
          <MenuItem/>
    </div>
    </div>
  )
}

export default Menu