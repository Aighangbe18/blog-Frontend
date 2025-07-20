import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        toast.success(res.data.msg);
        setStatus("Email verified! Redirecting...");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err: any) {
        toast.error(err.response?.data?.msg || "Verification failed");
        setStatus("Invalid or expired verification link.");
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">Email Verification</h1>
        <p>{status}</p>
      </div>
    </div>
  );
}
