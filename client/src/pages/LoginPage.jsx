import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`,{
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="h-screen bg-indigo-50 flex flex-col justify-center items-center relative ">
      {/* Top right SIGNify logo */}
      <div className="absolute top-4 left-6">
        <a href="/">
          <h1 className="text-[45px] pl-4 pt-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-700">
            SIGNify
          </h1>
        </a>
      </div>

      {/* Centered Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-indigo-700">
          Login to Signify
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-black px-3 py-2 rounded mb-3 text-sm"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-black px-3 py-2 rounded mb-2 text-sm"
          required
        />

        <div className="text-right text-xs mb-3">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm"
        >
          Login
        </button>

        <div className="mt-3 text-center text-xs">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
