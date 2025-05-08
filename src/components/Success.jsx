import React, { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import axios from "axios";

const Success = () => {
  const hasSentOrder = useRef(false); // ✅
  const branch =localStorage.getItem('selectedBranch')
  useEffect(() => {
    const sendOrderData = async () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartTotal = JSON.parse(localStorage.getItem("cartTotal")) || 0;
        const customerDetails = JSON.parse(localStorage.getItem("customerDetails")) || {};
        const paymentType=localStorage.getItem('paymentType')
        const orderData = {
          customerName: customerDetails.fullName,
          email: customerDetails.email,
          phoneNumber: customerDetails.phoneNumber,
          address: customerDetails.address,
          zipcode: customerDetails.pincode,
          items: cartItems.map((item) => ({
            itemId: item._id,
            quantity: item.quantity || 1,
            preparationChoice: item?.preparationChoice?.name ? item.preparationChoice.name : "None",
          })),
          price: cartTotal,
          transactionId: generateTransactionId(),
          paymentMethod:paymentType

        };

        if (!hasSentOrder.current) { // ✅ Check if already sent
          const response = await axios.post(`${import.meta.env.VITE_HOST}/api/orders/create`,
            orderData,
            {
              headers: {
                "Branch": branch
              }
            }
          );
          console.log(orderData);
          console.log("Order created successfully:", response.data);

          // Clear after successful sending
          localStorage.removeItem("cartItems");
          localStorage.removeItem("cartTotal");
          localStorage.removeItem("customerDetails");

          hasSentOrder.current = true; // ✅ Mark as sent
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    sendOrderData();
  }, []);

  const generateTransactionId = () => {
    return "txn_" + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-semibold">Payment Successful!</h2>
        <p className="mt-4">Thank you for your Order. Your order has been confirmed.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 font-semibold  text-white py-2 px-4 rounded-xl">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
