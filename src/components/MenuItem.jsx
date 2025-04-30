import { Link } from '@tanstack/react-router';
import React from 'react';
import toast from 'react-hot-toast';

const MenuItem = ({ item }) => {
  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    // Check if this exact item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (i) => i._id === item._id // <-- Improve this if uniqueness needs more fields
    );
  
    if (existingItemIndex !== -1) {
      // If already in cart, increase quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // If not in cart, add it with quantity 1
      cartItems.push({ ...item, quantity: 1 });
    }
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success("Item added to cart");
  };

  return (
    <div className='w-full h-[350px] bg-white p-2 rounded-2xl shadow-xl'>
      <div className='h-9/12'>
        <img
          src={item.image}
          alt={item.name}
          className='h-full w-full object-cover rounded-xl'
        />
      </div>
      <div className='w-full h-3/12 p-2 flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-semibold'>{item.name}</p>
          <h1>${item.price}</h1>
        </div>
        <div>
          <Link
           
            onClick={handleAddToCart}
            className='font-bold text-white bg-rose-500 px-6 py-3 rounded-md text-sm'
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
