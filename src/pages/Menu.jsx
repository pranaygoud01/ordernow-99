import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from '@tanstack/react-router';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default "All"
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu items
    fetch(`${import.meta.env.VITE_HOST}/api/items`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Menu Items:', data);
        setMenuItems(data.items || []);
      })
      .catch(err => console.error('Error fetching menu items:', err));

    // Fetch categories
    fetch(`${import.meta.env.VITE_HOST}/api/categories`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Categories:', data);
        if (Array.isArray(data)) {
          // Add "All" category manually at the beginning
          setCategories([{ _id: 'all', name: 'All' }, ...data]);
        } else {
          console.error('Categories data not in expected format');
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Helper function to remove emoji and keep only text
  const removeEmoji = (text) => {
    return text.replace(/[^a-zA-Z\s]/g, '').trim();
  };

  // Filter items based on selected category
  const filteredItems = menuItems.filter(item => {
    const categoryMatch =
      selectedCategory.toLowerCase() === 'all' ||
      (removeEmoji(item.category).toLowerCase() === removeEmoji(selectedCategory).toLowerCase());

    return categoryMatch;
  });

  return (
    <>
      <h1 className="text-4xl mt-4 text-center font-bold max-lg:text-2xl text-gray-800">Menu</h1>

      {/* Cart Icon - Bottom Right */}
      <button
        onClick={() => { navigate({ to: "/cart" }); }}
        className="fixed bottom-20 max-lg:bottom-10 max-lg:right-7 right-10 flex items-center border border-neutral-300 justify-center bg-white text-rose-500 rounded-md p-3 gap-2 shadow-2xl cursor-pointer"
      >
        <FaShoppingCart size={24} />
        <span className="font-semibold">Items</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 text-rose-500 font-bold text-xs rounded-md px-2 py-1">
            {cartCount}
          </span>
        )}
      </button>

      {/* Category Scroll Section */}
      <div className="mt-6 max-lg:mt-3 px-4 sticky top-15 bg-white">
        <div className="rounded-2xl bg-transparent p-4 overflow-x-auto no-scrollbar">
          <div className="flex space-x-3 w-max">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCategory(category._id);
                  console.log('Selected Category:', category.name);
                }}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border shadow-md ${
                  selectedCategory === category._id
                    ? 'bg-gradient-to-r from-black via-gray-900 to-black text-white border-black scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="w-full min-h-screen pb-8 flex justify-center bg-white px-3">
        <div className="max-w-7xl w-full grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-6 mt-10">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                onAddToCart={() => setCartCount(prev => prev + 1)}
              />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No items match the selected category
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
