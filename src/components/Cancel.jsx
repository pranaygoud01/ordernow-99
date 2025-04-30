// src/pages/Cancel.js
import React from "react";
import { Link } from "@tanstack/react-router";

const Cancel = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-semibold">Payment Cancelled</h2>
        <p className="mt-4">Your payment was unsuccessful. Please try again later.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded-md">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
