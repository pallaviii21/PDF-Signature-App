import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const [params] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const token = params.get("token");
    const id = params.get("id");

    const verify = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/verify-email?token=${token}&id=${id}`
        );
        setMessage(res.data.msg);
      } catch (err) {
        setMessage(
          err?.response?.data?.msg || "Verification failed. Try again later."
        );
      }
    };

    if (token && id) verify();
    else setMessage("Invalid verification link.");
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-semibold mb-4">🔐 Email Verification</h2>
        <p className="mb-6">{message}</p>
        <Link to="/login" className="text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
