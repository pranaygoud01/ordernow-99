
import { useState } from "react";
export default function Customerdetails() {

      const [selectedMethod, setSelectedMethod] = useState("credit");
    
      return (
        <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-xl p-6 space-y-6">

          {/* Payment Method */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-4">Payment Method</h3>
            <div className="flex items-center space-x-5">
              <input
                type="radio"
                id="credit"
                name="paymentMethod"
                value="credit"
                checked={selectedMethod === "credit"}
                onChange={() => setSelectedMethod("credit")}
                className="form-radio text-blue-600"
              />
              <label htmlFor="credit" className="text-gray-700 font-medium">
                Credit Card
              </label>
            </div>
          </div>
    
          {/* Customer Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Customer Details</h2>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 234 567 8901"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                placeholder="123 Main St, Apt 4B"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode / ZIP Code</label>
              <input
                type="text"
                placeholder="123456"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
    
          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition">
              ⬅️ Back
            </button>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              Continue ➡️
            </button>
          </div>
        </div>
      );
    }
    