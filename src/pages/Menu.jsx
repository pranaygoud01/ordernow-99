
import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon from react-icons
import { useNavigate } from '@tanstack/react-router';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0); // Cart count to keep track of items in the cart
  const navigate =useNavigate();
  const categories = [
    'All',
    '🍔 BURGER AND CHIPS',
    '🍣 MAKI ROLLS',
    '✨ SPECIALITY',
    '🌯 ROLLS',
    '🥢 URAMAKI',
    '🐟 SASHIMI',
    '🍤 STARTERS',
    '🧒 KIDS MEALS',
    '🍚 DONBURI',
    '🌮 TACOS',
    '🍥 NIGIRI',
    '🍙 TEMAKI',
    '🍟 SIDES',
    '🌯 CHIMICHANGA',
    '🌯 BURRITO/RICE',
    '🥗 BOWL',
    '📦 SETMENU',
    '🔥 FAJITA'
  ];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOST}/api/items`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Data:', data); // Log the fetched data to check the structure
        setMenuItems(data.items);
      })
      .catch(err => console.error('Error fetching menu items:', err));

      
  }, []);

  // Helper function to remove emoji and keep only text for comparison
  const removeEmoji = (text) => {
    return text.replace(/[^a-zA-Z\s]/g, '').trim(); // Remove everything except letters and spaces
  };

  const filteredItems = menuItems.filter(item => {
    const categoryMatch =
      selectedCategory.toLowerCase() === 'all' ||
      (removeEmoji(item.category).toLowerCase() === removeEmoji(selectedCategory).toLowerCase());

    return categoryMatch;
  });


  return (
    <>
      <h1 className="text-4xl mt-4 text-center font-bold max-lg:text-2xl text-gray-800">Menu</h1>

      {/* Cart Icon - Top Right */}
      <button onClick={() => {navigate({to:"/cart"})}} className="fixed bottom-20 max-lg:bottom-10 max-lg:right-7 right-10 flex items-center border border-neutral-300 justify-center bg-white text-rose-500 rounded-md p-3 gap-2  shadow-2xl cursor-pointer">
        <FaShoppingCart size={24}  /> <span className='font-semibold '>Items</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-0  text-rose-500 font-bold text-xs rounded-md px-2 py-1">{cartCount}</span>
        )}
      </button>

      {/* Stylish Category Scroll Section */}
      <div className="mt-6 max-lg:mt-3 px-4 sticky top-15 bg-white">
        <div className="rounded-2xl bg-transparent  p-4 overflow-x-auto no-scrollbar">
          <div className="flex space-x-3 w-max">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  console.log('Selected Category:', category); // Log selected category
                }}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border shadow-md ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-black via-gray-900 to-black text-white border-black scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtered Items Grid */}
      <div className="w-full min-h-screen pb-8 flex justify-center bg-white px-3">
        <div className="max-w-7xl w-full grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-6 mt-10">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <MenuItem key={item._id} item={item} onAddToCart={() => setCartCount(prev => prev + 1)} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No items match the selected category</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;

