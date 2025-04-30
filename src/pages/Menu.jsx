import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOST}/api/items`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data.items)) // 👈 Accessing `items` array
      .catch((err) => console.error('Error fetching menu items:', err));
  }, []);

  return (
    <>
    <h1 className='text-4xl mt-2 text-center font-semibold '>Menu</h1>
    <div className='w-full min-h-screen flex justify-center bg-[#ffffff]'>
     
      <div className='max-w-7xl w-full h-fit grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 px-3 max-lg:mt-5 gap-6 mt-10'>
      {menuItems.length > 0 ? (
  menuItems.map((item) => (
    <MenuItem key={item._id} item={item} />
  ))
) : (
  <p>No items available</p>
)}
      </div>
    </div>
    </>
  );
};

export default Menu;
