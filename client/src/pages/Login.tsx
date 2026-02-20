import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");

  const handleLogin = () => {
    if (phone.length === 10) {
      setLocation(`/otp?phone=${phone}`);
    } else {
      alert("Enter valid phone number");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-6 rounded-2xl w-80 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          SwiftDelivery Login
        </h1>

        <input
          type="tel"
          placeholder="Enter phone number"
          className="w-full p-3 rounded-lg text-black mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
