import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("/api/auth/register", { name, email, password });
      alert("Registration successful! Please verify your email.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Registration failed:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="h-screen bg-indigo-50 flex flex-col justify-center items-center relative">
      {/* Top right SIGNify logo */}
      <div className="absolute top-4 left-6">
        <a href="/">
          <h1 className="text-[45px] pl-4 pt-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-700">
            SIGNify
          </h1>
        </a>
      </div>

      {/* Centered Register Form */}
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-indigo-700">
          Register to Signify
        </h2>

        <label htmlFor="name" className="block mb-1 text-sm font-medium text-blue-900">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border bg-gray-50 border-gray-900 text-gray-900 text-sm rounded-md"
          required
        />

        <label htmlFor="email" className="block mb-1 text-sm font-medium text-blue-900">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border bg-gray-50 border-gray-900 text-gray-900 text-sm rounded-md"
          required
        />

        <label htmlFor="password" className="block mb-1 text-sm font-medium text-blue-900">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border bg-gray-50 border-gray-900 text-gray-900 text-sm rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
