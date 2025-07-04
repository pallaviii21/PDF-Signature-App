import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const IndexPage = () => {
  return (
    <div className="bg-indigo-50 min-h-screen">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-8 pt-6">
        <a href="/"><h1 className="text-[45px] pl-4 pt-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-700">SIGNify</h1></a>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-indigo-400 hover:bg-indigo-700 text-white px-5 py-2 border-2 hover:shadow-2xl border-indigo-700 rounded-full transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-emerald-400 hover:bg-emerald-600 text-white px-5 py-2 border-2 hover:shadow-2xl border-emerald-700 rounded-full transition"
          >
            Register
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-[35px] font-semibold font-serif text-gray-600 mt-3 pt-5">Welcome to SIGNify ✨</h1>
      </div>
      <div className="flex justify-center">
        <Link to="/register" className="text-blue-600 font-sans font-semibold text-[25px] hover:text-blue-800">Get Started <FontAwesomeIcon icon={faArrowRight} style={{color: "#076bcf", width: "30px"}} /> </Link>
      </div>
      

      {/* Cards Section */}
      <div className="mt-15 mx-10 flex flex-col md:flex-row justify-center-safe items-center gap-12">
        {/* Upload Card */}
        <div className="w-80 h-80 bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center p-8 text-center">
          <img src="/upload.svg" alt="Upload" className="w-28 mb-6" />
          <h2 className="text-xl font-semibold text-gray-700">Upload PDFs</h2>
        </div>

        {/* Sign Card */}
        <div className="w-80 h-80 bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center p-8 text-center">
          <img src="/signature.svg" alt="Sign" className="w-28 mb-6" />
          <h2 className="text-xl font-semibold text-gray-700">Place Signature</h2>
        </div>

        {/* Download Card */}
        <div className="w-80 h-80 bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center p-8 text-center">
          <img src="/download.svg" alt="Download" className="w-28 mb-6" />
          <h2 className="text-xl font-semibold text-gray-700">Download Signed PDFs</h2>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
