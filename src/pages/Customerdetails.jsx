import { Link, useNavigate } from "@tanstack/react-router"; // Added useNavigate
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Bishop from "../assets/bishop-postcode"; 
import Harlow from "../assets/harlow-postcode"; // Import JSON data

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Customerdetails() {
  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [cartAmount, setCartAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [validPincodes, setValidPincodes] = useState([]);

  const navigate = useNavigate(); // Initialize navigate
  const branch = localStorage.getItem('selectedBranch');
  const PostCode = branch === 'Harlow' ? Harlow : Bishop;

  useEffect(() => {
    const cartTotal = localStorage.getItem("cartTotal");
    if (cartTotal) {
      setCartAmount(cartTotal);
    }
    fetchValidPincodes();
  }, []);

  const fetchValidPincodes = () => {
    const pincodes = PostCode.filter((row) => row.InUse.toLowerCase() === "yes")
      .map((row) => String(row.Postcode).replace(/\s+/g, ""));
    setValidPincodes(pincodes);
  };

  const handleProceedToPay = async () => {
    const cleanedPincode = pincode.replace(/\s+/g, "");
  
    if (!validPincodes.includes(cleanedPincode)) {
      setErrorMessage("Sorry, we do not deliver to this pincode.");
      return;
    }
  
    setErrorMessage("");
  
    const customerDetails = {
      fullName,
      email,
      phoneNumber,
      address,
      pincode: cleanedPincode,
      paymentMethod: selectedMethod,
    };
  
    localStorage.setItem("customerDetails", JSON.stringify(customerDetails));
    localStorage.setItem("paymentType", selectedMethod); // 👈 Add this line
  
    if (selectedMethod === "Cash on Delivery") {
      navigate({ to: "/success" });
    } else {
      const stripe = await stripePromise;
      const response = await fetch(
        `${import.meta.env.VITE_HOST}/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerDetails,
            cartAmount: Math.round(parseFloat(cartAmount) * 100),
          }),
        }
      );
  
      const session = await response.json();
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        console.error(result.error.message);
      }
    }
  };
  

  return (
    <div className="max-w-md mx-auto shadow-xl max-lg:shadow-none max-lg:rounded-none mt-5 rounded-xl p-6 space-y-6">
      {/* Payment Method */}
      <div>
        <h3 className="font-bold text-start mb-4">Payment Method</h3>
        <div className="w-full p-2 text-xs font-semibold border rounded-md bg-neutral-50 border-neutral-200 ">
          <div
            onClick={() => setSelectedMethod("Card")}
            className={`cursor-pointer p-4 rounded-md ${selectedMethod === "Card" ? "bg-gray-200" : ""}`}
          >
            <h1 className="text-neutral-600">Credit Card / Debit Card</h1>
          </div>
          <div
            onClick={() => setSelectedMethod("Cash on Delivery")}
            className={`cursor-pointer p-4 rounded-md ${selectedMethod === "Cash on Delivery" ? "bg-gray-200" : ""}`}
          >
            <h1 className="text-neutral-600">Cash on Delivery</h1>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="space-y-4">
        <h2 className="font-semibold text-start">Delivery Address</h2>

        <div>
          <label className="block text-sm font-medium text-neutral-500">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-500">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-500">
            Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 234 567 8901"
            className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-500">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, Apt 4B"
            className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-500">
            Pincode / ZIP Code
          </label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.toUpperCase())}
            placeholder="123456"
            className="mt-1 block w-full px-4 py-2 text-sm border rounded-md border-neutral-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Link
          to="/cart"
          className="font-semibold text-center text-[#222] border border-[#222] rounded-md w-[20%] py-3 text-sm"
        >
          Back
        </Link>
        <button
          onClick={handleProceedToPay}
          className="font-semibold cursor-pointer text-white bg-[#000] rounded-md w-[80%] py-3 text-sm"
        >
          {selectedMethod === "Cash on Delivery" ? "Place Order" : "Proceed to pay"}
        </button>
      </div>
    </div>
  );
}
