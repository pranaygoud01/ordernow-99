
import { useState } from "react";
export default function Customerdetails() {

      const [selectedMethod, setSelectedMethod] = useState("credit");
    
      return (
        <div className="max-w-md mx-auto  shadow-xl mt-5  rounded-xl p-6 space-y-6">

          {/* Payment Method */}
          <div>
            <h3 className=" font-bold text-start mb-4">Payment Method</h3>
           <div className="w-full p-4 text-xs font-semibold border rounded-md bg-neutral-50 border-neutral-200"><h1 className="text-neutral-600">Credit Card/Debit Card</h1></div>
          </div>
    
          {/* Customer Details */}
          <div className="space-y-4">
            <h2 className=" font-semibold text-start">Delivery Address</h2>
    
            <div>
              <label className="block text-sm font-medium text-neutral-500">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-neutral-500">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-neutral-500">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 234 567 8901"
                className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-neutral-500">Address</label>
              <input
                type="text"
                placeholder="123 Main St, Apt 4B"
                className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-neutral-500">Pincode / ZIP Code</label>
              <input
                type="text"
                placeholder="123456"
                className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
    
          {/* Buttons */}
          <div className="flex gap-2">
             <button className="font-semibold text-[#222] border border-[#222] rounded-md w-[20%] py-3 text-sm">Back</button> 
             <button className="font-semibold text-white bg-[#000] rounded-md w-[80%] py-3 text-sm">Proceed to pay</button> 
          </div>
        </div>
      );
    }
    