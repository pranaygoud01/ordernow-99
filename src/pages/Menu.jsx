import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from '@tanstack/react-router';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [showBranchPopup, setShowBranchPopup] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState('');
  const navigate = useNavigate();

  const availableBranches = ['Harlow', 'Bishop'];

  useEffect(() => {
    const branch = localStorage.getItem('selectedBranch');
    if (!branch) {
      setShowBranchPopup(true);
    } else {
      setSelectedBranch(branch);
    }
  }, []);

  useEffect(() => {
    if (!selectedBranch) return;

    // Fetch menu items
    fetch(`${import.meta.env.VITE_HOST}/api/items`, {
      headers: { 'branch': selectedBranch },
    })
      .then(res => res.json())
      .then(data => setMenuItems(data.items || []))
      .catch(err => console.error('Error fetching menu items:', err));

    // Fetch categories
    fetch(`${import.meta.env.VITE_HOST}/api/categories`, {
      headers: { 'branch': selectedBranch },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories([{ _id: 'all', name: 'All' }, ...data]);
        } else {
          console.error('Categories data not in expected format');
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, [selectedBranch]);

  const removeEmoji = (text) => {
    return text.replace(/[^a-zA-Z\s]/g, '').trim();
  };

  const filteredItems = menuItems.filter(item => {
    const categoryMatch =
      selectedCategory.toLowerCase() === 'all' ||
      (removeEmoji(item.category).toLowerCase() === removeEmoji(selectedCategory).toLowerCase());

    return categoryMatch;
  });

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    localStorage.setItem('selectedBranch', branch);
    setShowBranchPopup(false);
  };

  return (
    <>
      {/* Branch Selection Popup */}
      {showBranchPopup && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="w-full h-full max-lg:h-fit max-lg:w-11/12 max-lg:px-3 p-5 bg-white shadow-xl rounded-xl flex flex-col gap-6">
            {/* <h1 className="font-semibold text-xl text-center">Select Your Branch</h1> */}
            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
              
                <button
                  key='Harlow'
                  onClick={() => handleBranchSelect('Harlow')}
                  className="h-[95vh] max-lg:h-[40vh] max-lg:w-full hover:shadow-md w-full bg-cover cursor-pointer bg-no-repeat bg-center font-semibold text-white text-sm rounded-lg"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                  }}
                >
                  <div className="w-full flex items-center max-lg:text-xl font-extrabold text-white justify-center text-5xl h-full rounded-lg bg-black/40">
                    Old Harlow
                  </div>
                </button>
                <button
                  key='Bishop'
                  onClick={() => handleBranchSelect('Bishop')}
                  className="h-[95vh] max-lg:h-[40vh] hover:shadow-md w-full bg-cover cursor-pointer bg-no-repeat bg-center font-semibold text-white text-sm rounded-lg"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                  }}
                >
                  <div className="w-full flex items-center max-lg:text-xl font-extrabold text-white justify-center text-5xl h-full rounded-lg bg-black/40">
                    Bishop's Stortford
                  </div>
                </button>
              
            </div>
          </div>
        </div>
      )}

      {/* Main Menu */}
      {!showBranchPopup && (
        <>
          <h1 className="text-4xl mt-4 text-center font-bold max-lg:text-2xl text-gray-800">Menu</h1>

          {/* Cart Icon */}
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

          {/* Category Scroll */}
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
      )}
    </>
  );
};

export default Menu;
