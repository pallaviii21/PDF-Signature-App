import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();
  const userName = localStorage.getItem("username"); 

  useEffect(() => {
  const fetchDocs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/docs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setDocs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching documents:", err);
      alert("Failed to fetch documents.");
    }
  };
  fetchDocs();
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); 
    navigate("/login");
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete it ?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/docs/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    setDocs((prevDocs) => prevDocs.filter((doc) => doc._id !== id));
    alert("Deleted Successfully !");
  } catch (err) {
    console.error("Failed to delete document", err);
    alert("Failed to delete document");
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100  to-indigo-100 px-4 py-6">
  {/* Top Navbar */}
  <div className="flex justify-between items-center px-6 mb-6">
    {/* Logo */}
    <a href="/" className="block">
      <h1 className="text-[45px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-700 tracking-wide">
        SIGNify
      </h1>
    </a>

    {/* Logout */}
    <div className="relative group">
      <button onClick={handleLogout} className="text-3xl w-12 h-12 text-center">
        <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#da0707" }} />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-[2px] text-sm text-white bg-gray-500 rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        Log Out
      </div>
    </div>
  </div>

  {/* Dashboard Content */}
  <div className="flex justify-center">
    <div className="w-full max-w-4xl bg-gray-50 shadow-xl rounded-xl p-6">

      {/* Dashboard Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-serif text-transparent bg-clip-text bg-gray-600">
          {userName}'s Dashboard
        </h2>
      </div>

      {/* Upload Button */}
      <Link to="/upload">
        <button className="bg-indigo-50 border-2 border-indigo-700 font-medium text-blue-900 px-4 py-1 mb-4 rounded-full hover:bg-indigo-700 hover:text-white text-[15px]">
          Upload New
        </button>
      </Link>

      {/* Documents List */}
      <ul className="space-y-4 ">
        {docs.map((doc) => (
          <li
            key={doc._id}
            className="bg-slate-200 p-3  rounded-full shadow flex items-center justify-between"
          >
            <span className="text-gray-800 pl-2 font-medium truncate max-w-[60%]">{doc.originalname}</span>
            <div className="flex space-x-2">
              <Link
                to={`/sign/${doc._id}`}
                className="bg-indigo-200 border-1 font-medium border-blue-700 text-gray-800 px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white text-[16px] hover:shadow-2xl hover:shadow-gray-700"
              >
                Sign
              </Link>
              <button
                onClick={() => handleDelete(doc._id)}
                className="bg-pink-200 border-1 font-medium border-rose-700 text-gray-800 px-2 py-1 rounded-full hover:bg-rose-700 hover:text-white text-[16px] hover:shadow-2xl hover:shadow-gray-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>


  );
};

export default Dashboard;
