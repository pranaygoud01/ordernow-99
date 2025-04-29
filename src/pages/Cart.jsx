import React, { useState } from "react";
import {Link} from "@tanstack/react-router"
const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "6 Blade Starter Kit",
      quantity: 2,
      price: 5,
      image: "https://dummyimage.com/200x200/eeeeee/000000&text=Razor+Kit",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const PROMO_DISCOUNT = promoApplied ? 5.0 : 0.0;

  const calculateSubtotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const subtotal = calculateSubtotal();
  const shippingDiscount = -2.0;
  const total = subtotal + shippingDiscount - PROMO_DISCOUNT;

  const updateQuantity = (id, type) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE5") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoError("Invalid promo code");
    }
  };

  return (
    <div className="bg-[#fefefe] min-h-screen px-6 py-10 font-sans">
      <h1 className="text-4xl font-extrabold mb-2 text-[#0A2342]">Your Cart</h1>
      <p className="text-gray-600 mb-6">
        {items.length} item{items.length !== 1 && "s"} ships at checkout
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cart Items */}
        <div className="col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl shadow-sm"
            >
              <div className="flex items-center space-x-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div>
                  <h2 className="font-semibold text-lg text-[#0A2342]">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Club Series</p>
                  <div className="flex items-center space-x-3 mt-4">
                    <button
                      onClick={() => updateQuantity(item.id, "dec")}
                      className="w-8 h-8 text-lg font-bold bg-gray-100 border rounded hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "inc")}
                      className="w-8 h-8 text-lg font-bold bg-gray-100 border rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-[#0A2342]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-red-500 mt-3 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="col-span-2 bg-[#F8F5F0] p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-[#0A2342]">Summary</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Price</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">
                {shippingDiscount.toFixed(2)}
              </span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-green-700">
                <span>Promo (SAVE5)</span>
                <span>−${PROMO_DISCOUNT.toFixed(2)}</span>
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
                  className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                  placeholder="Enter code"
                />
                <button
                  onClick={applyPromo}
                  className="px-4 py-2 text-sm font-bold bg-[#0A2342] text-white rounded-md hover:bg-[#0e2c57] transition"
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
          <Link to="/customerdeatils" className="w-full mt-5 py-3 bg-[#0A2342] text-white text-sm font-bold uppercase rounded-md hover:bg-[#0e2c57] transition duration-300">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
