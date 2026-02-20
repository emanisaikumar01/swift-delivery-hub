import { useState } from "react";
import { useLocation } from "wouter";

export default function OTP() {
  const [, setLocation] = useLocation();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length === 6) {
      // ✅ later connect Firebase here
      setLocation("/");
    } else {
      alert("Enter valid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-6 rounded-2xl w-80 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Enter OTP
        </h1>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full p-3 rounded-lg text-black mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="w-full bg-green-600 p-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
