import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
 
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setItems(storedItems);
  }, []);

  const calculateSubtotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const subtotal = calculateSubtotal();
  
  const total = subtotal - promoDiscount;
   useEffect(() => {
    localStorage.setItem("cartTotal", total.toFixed(2));
  }, [total]);

  const updateQuantity = (id, type) => {
  
    const updatedItems = items.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : Math.max(item.quantity - 1, 1),
          }
        : item
    );
    setItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
};


  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item._id !== id);
    setItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const applyPromo = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/promocodes`);
      const promoCodes = await response.json();
      const found = promoCodes.find(
        (p) => p.code.toUpperCase() === promoCode.trim().toUpperCase()
      );

      if (!found) {
        setPromoApplied(false);
        setPromoError("Invalid promo code");
        setPromoDiscount(0);
        return;
      }

      const currentDate = new Date();
      const expiryDate = new Date(found.expiryDate);

      if (expiryDate < currentDate) {
        setPromoApplied(false);
        setPromoError("Promo code has expired");
        setPromoDiscount(0);
        return;
      }

      const discountAmount = (subtotal * found.discountPercentage) / 100;
      setPromoApplied(true);
      setPromoError("");
      setPromoDiscount(discountAmount);
    } catch (error) {
      console.error("Failed to fetch promo codes:", error);
      setPromoApplied(false);
      setPromoError("Failed to apply promo code");
      setPromoDiscount(0);
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="bg-[#fefefe] min-h-screen max-w-[1400px] w-full px-6 py-10 font-sans">
        <h1 className="text-4xl font-extrabold mb-2 max-lg:text-2xl text-[#222]">
          Your Cart
        </h1>
        <p className="text-gray-600 mb-6">
          {items.length} item{items.length !== 1 && "s"} ships at checkout
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cart Items */}
          <div className="col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
              >
                <div className="flex items-center space-x-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold max-lg:text-sm text-lg text-[#0A2342]">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Nuwairahs</p>
                    <div className="flex items-center space-x-3 mt-4">
                      <button
                        onClick={() => updateQuantity(item._id, "dec")}
                        className="w-8 h-8 text-lg font-bold bg-gray-100 rounded hover:bg-gray-200"
                      >
                        −
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, "inc")}
                        className="w-8 h-8 text-lg font-bold bg-gray-100 rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold max-lg:text-sm text-[#0A2342]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-sm text-red-500 mt-3 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="col-span-2 flex flex-col bg-[#fbfbfb] p-6 max-lg:p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-[#333]">Summary</h2>
            <div className="space-y-3 text-sm text-gray-800">
              <div className="flex justify-between">
                <span>Price</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
             
              {promoApplied && (
                <div className="flex justify-between text-green-700">
                  <span>Promo ({promoCode.toUpperCase()})</span>
                  <span>−${(promoDiscount || 0).toFixed(2)}</span>
                </div>
              )}

              {/* Promo Code Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                    placeholder="Enter code"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-2 text-sm font-bold bg-[#222] text-white rounded-md hover:bg-[#333] transition"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-sm text-red-600 mt-1">{promoError}</p>
                )}
              </div>
            </div>

            <hr className="my-4" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link
              to="/customerdeatils"
              className="w-full mt-5 py-3 bg-rose-500 text-center text-white text-sm font-bold uppercase rounded-md hover:bg-rose-400 transition duration-300"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
