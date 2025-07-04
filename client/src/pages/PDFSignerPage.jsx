import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SignatureEditor from "../components/SignatureEditor";
import DraggableSignature from "../components/DraggableSignature";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import * as fontkit from "fontkit";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const isStandardFont = (name) =>
  ["Helvetica", "Courier", "TimesRoman"].includes(name);

const loadFont = async (fontName) => {
  const response = await fetch(`/fonts/${fontName}.ttf`);
  return await response.arrayBuffer();
};

const PDFSignerPage = () => {
  const { documentId } = useParams();
  const [pdfBytes, setPdfBytes] = useState(null);
  const [originalPdfBytes, setOriginalPdfBytes] = useState(null);
  const [pages, setPages] = useState([]);
  const [signature, setSignature] = useState({
    text: "Your Name",
    fontSize: 24,
    fontFamily: "Satisfy",
    color: "#000000",
  });
  const [signatureList, setSignatureList] = useState([]);
  const pdfCanvasRefs = useRef([]);

  useEffect(() => {
    const loadPDF = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/docs/${documentId.trim()}`,
        {
          responseType: "arraybuffer",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const buffer = res.data;
      setPdfBytes(buffer.slice(0));
      setOriginalPdfBytes(buffer.slice(0));

      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;

      const loadedPages = [];
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1.5 });
        loadedPages.push({ page, viewport });
      }
      setPages(loadedPages);
    };

    if (documentId) loadPDF();
  }, [documentId]);

  useEffect(() => {
  const renderTasks = [];
  let cancelled = false;

  const renderPages = async () => {
    for (let i = 0; i < pages.length; i++) {
      const canvas = pdfCanvasRefs.current[i];
      if (!canvas || cancelled) continue;

      const context = canvas.getContext("2d");
      canvas.width = pages[i].viewport.width;
      canvas.height = pages[i].viewport.height;

      try {
        const renderTask = pages[i].page.render({
          canvasContext: context,
          viewport: pages[i].viewport,
        });

        renderTasks.push(renderTask);
        await renderTask.promise;
      } catch (err) {
        if (err.name !== "RenderingCancelledException") {
          console.error(`Render error on page ${i + 1}:`, err);
        }
      }
    }
  };

  renderPages();

  return () => {
    cancelled = true;
    renderTasks.forEach((task) => {
      if (task && task.cancel) {
        task.cancel();
      }
    });
  };
}, [pages]);


  const handleDrop = (e, pageIndex) => {
    const canvas = pdfCanvasRefs.current[pageIndex];
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSignature = {
      ...signature,
      x,
      y,
      pageIndex,
      id: Date.now(),
    };
    setSignatureList((prev) => [...prev, newSignature]);
  };

  const embedFont = async (pdfDoc, fontName) => {
    pdfDoc.registerFontkit(fontkit);

    if (isStandardFont(fontName)) {
      return await pdfDoc.embedFont(StandardFonts[fontName]);
    }

    const fontBytes = await loadFont(fontName);
    return await pdfDoc.embedFont(fontBytes);
  };

  const drawSignature = (pdfDoc, page, sig, font, scaleX, scaleY, height) => {
    const hex = sig.color || "#000000";
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const x = sig.x * scaleX;
    const y = height - sig.y * scaleY - sig.fontSize * scaleY;

    page.drawText(sig.text, {
      x,
      y,
      size: sig.fontSize * scaleX,
      font,
      color: rgb(r, g, b),
    });
  };

  const handlePreviewOrDownload = async (mode) => {
    if (!originalPdfBytes || signatureList.length === 0) return;

    const pdfDoc = await PDFDocument.load(originalPdfBytes.slice(0));
    const pages = pdfDoc.getPages();

    for (const sig of signatureList) {
      const page = pages[sig.pageIndex];
      const canvas = pdfCanvasRefs.current[sig.pageIndex];
      const { width: canvasWidth, height: canvasHeight } = canvas;
      const { width: pdfWidth, height: pdfHeight } = page.getSize();

      const scaleX = pdfWidth / canvasWidth;
      const scaleY = pdfHeight / canvasHeight;
      const font = await embedFont(pdfDoc, sig.fontFamily);

      drawSignature(pdfDoc, page, sig, font, scaleX, scaleY, pdfHeight);
    }

    const bytes = await pdfDoc.save();
    const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));

    if (mode === "preview") {
      sessionStorage.setItem("preview-pdf-url", url);
      window.open("/preview", "_blank");
    } else {
      const a = document.createElement("a");
      a.href = url;
      a.download = "signed.pdf";
      a.click();
    }
  };

  const deleteSignature = (id) => {
    setSignatureList((prev) => prev.filter((sig) => sig.id !== id));
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-gray-50">    

      <div className="w-full lg:w-1/3 p-6 space-y-4 overflow-y-auto bg-gradient-to-l from-indigo-50 via-gray-100 to-indigo-50 border-l border-indigo-500 shadow-inner">
  
        <div className="flex justify-center items-center py-4">
          <a href="/" className="block">
            <h1 className="text-[45px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-700 tracking-wide">
              SIGNify
            </h1>
          </a>
        </div>

        <SignatureEditor onSignatureChange={setSignature} />

        <h3 className="text-sm font-semibold">Drag Signature Below ↓</h3>
        <DraggableSignature signature={signature} />

        <div className="flex gap-4">
          <button
            onClick={() => handlePreviewOrDownload("preview")}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-teal-700 hover:shadow-gray-600 hover:shadow-2xl"
          >
            Preview
          </button>
          <button
            onClick={() => handlePreviewOrDownload("download")}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700  hover:shadow-gray-600 hover:shadow-2xl"
          >
            Download Signed
          </button>
        </div>
      </div>

      <div className="w-full lg:w-2/3 overflow-y-auto p-6 bg-gray-50">
        {pages.map((_, index) => (
          <div key={index} className="relative border shadow mb-4"
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            <canvas ref={(el) => (pdfCanvasRefs.current[index] = el)} />
            {signatureList
              .filter((sig) => sig.pageIndex === index)
              .map((sig) => (
                <div
                  key={sig.id}
                  className="absolute flex items-center space-x-1"
                  style={{
                    left: sig.x,
                    top: sig.y,
                    transform: "translate(-50%, -50%)",
                    fontFamily: sig.fontFamily,
                    fontSize: sig.fontSize,
                    color: sig.color,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <span>{sig.text}</span>
                  <button
                    onClick={() => deleteSignature(sig.id)}
                    className="ml-1 text-xs text-red-500 hover:text-red-700 bg-white rounded-full px-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default PDFSignerPage;
