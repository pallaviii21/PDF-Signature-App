import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      await axios.post("/api/docs/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleUpload}
        className="bg-white border border-gray-200 p-8 rounded-lg shadow-md w-full max-w-md text-center"
      >
        
        <p className="text-gray-500 mb-6">
          Upload your PDF document and start adding signatures in harmony
        </p>

        <label
          htmlFor="file-upload"
          className="border-2 border-dashed border-gray-300 rounded-md p-8 cursor-pointer flex flex-col items-center space-y-3 hover:border-indigo-400 transition-colors"
        >
          <img
            src="/arrowUp.svg"
            alt="Upload Icon"
            className="w-12 h-12"
          />
          <p className="font-semibold">Upload your PDF document</p>
          <p className="text-sm text-gray-500">
            Drag and drop your PDF file here, or click to browse
          </p>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            required
          />

          {/* Show filename if selected */}
          {file && (
            <p className="text-sm text-indigo-600 mt-2 truncate max-w-full">
              📄 {file.name}
            </p>
          )}
        </label>

        <button
          type="submit"
          className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors w-full"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
