import { useState } from "react";
import { useLocation } from "wouter";

export default function OTP() {
  const [, setLocation] = useLocation();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Enter valid OTP");
      return;
    }

    try {
      // ✅ SAVE AUTH FIRST (must match App.tsx guard)
      localStorage.setItem(
        "user",
        JSON.stringify({
          phone: "demo-user", // TODO: replace with real phone later
          loggedIn: true,
        })
      );

      // ✅ THEN NAVIGATE TO HOME
      setLocation("/");
    } catch (err) {
      console.error("OTP verify error:", err);
      alert("Something went wrong. Please try again.");
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
          maxLength={6}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        <button
          onClick={handleVerify}
          className="w-full bg-green-600 p-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
