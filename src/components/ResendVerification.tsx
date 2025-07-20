import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResendVerification() {
  const [email, setEmail] = useState("");

  const handleResend = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/resend-verification",
        { email }
      );
      toast.success(res.data.msg);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Failed to resend.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-semibold">Resend Verification Email</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border px-3 py-2 rounded w-72"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleResend}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Resend
      </button>
    </div>
  );
}
