import { Link } from '@tanstack/react-router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const MenuItem = ({ item, onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleAddToCart = () => {
    if (item.preparationChoices && item.preparationChoices.length > 0) {
      setShowModal(true); // open modal if choices exist
    } else {
      addToCart(item, null); // directly add to cart
    }
  };

  const addToCart = (baseItem, choice) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let finalItem = {
      ...baseItem,
      quantity: 1,
    };

    if (choice) {
      finalItem = {
        ...finalItem,
        price: parseFloat((baseItem.price + choice.price).toFixed(2)),
        preparationChoice: choice,
      };
    }

    const existingItemIndex = cartItems.findIndex(
      (i) =>
        i._id === finalItem._id &&
        (!choice || (i.preparationChoice && i.preparationChoice._id === choice._id))
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push(finalItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success("Item added to cart");

    if (onAddToCart) {
      onAddToCart();
    }

    setShowModal(false); // close modal
    setSelectedChoice(null); // reset
  };

  return (
    <>
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
            <h1 className='font-semibold text-neutral-800'>&pound;{item.price}</h1>
          </div>
          <div>
            <Link
              onClick={handleAddToCart}
              className='font-bold text-white bg-rose-500 px-6 py-3 rounded-md text-sm cursor-pointer'
            >
              Add to Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-50'>
          <div className='bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md'>
            <h2 className='text-lg font-bold mb-4'>Select Preparation</h2>
            <div className='space-y-3'>
              {item.preparationChoices.map((choice) => (
                <div
                  key={choice._id}
                  onClick={() => setSelectedChoice(choice)}
                  className={`border-2 flex justify-between p-3 font-semibold rounded-md cursor-pointer ${
                    selectedChoice?._id === choice._id
                      ? 'border-rose-500 bg-rose-100'
                      : 'border-gray-300'
                  }`}
                >
                  <p className='font-semibold'>{choice.name}</p>
                  <p className='text-sm text-gray-600'>+ &pound;{choice.price}</p>
                </div>
              ))}
            </div>
            <div className='mt-5 flex justify-end space-x-3'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 rounded-md font-semibold cursor-pointer bg-gray-200 text-gray-800'
              >
                Cancel
              </button>
              <button
                disabled={!selectedChoice}
                onClick={() => addToCart(item, selectedChoice)}
                className={`px-4 py-2 rounded-md font-semibold cursor-pointer text-white ${
                  selectedChoice ? 'bg-rose-500 hover:bg-rose-600' : 'bg-rose-300 cursor-not-allowed'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItem;
