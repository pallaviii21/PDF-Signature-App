import { useEffect, useState } from "react";

const PreviewPage = () => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const pdfUrl = sessionStorage.getItem("preview-pdf-url");
    if (pdfUrl) {
      setUrl(pdfUrl);
    }
  }, []);

  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
      {url ? (
        <iframe
          src={url}
          title="PDF Preview"
          className="w-[90%] h-[90%] border shadow-lg"
        />
      ) : (
        <p>Loading preview...</p>
      )}
    </div>
  );
};

export default PreviewPage;
