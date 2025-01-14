import React, { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";

const SinglePageFlipBook = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [isRendering, setIsRendering] = useState(false);
  const canvasRefs = useRef([]);
  const renderTasks = useRef({});

  // Configure PDF.js worker
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;


  useEffect(() => {
    const renderPDF = async () => {
      setIsRendering(true);
      try {
        const pdf = await pdfjs.getDocument(url).promise;
        setNumPages(pdf.numPages);

        // Render each page sequentially to avoid sharing the canvas context
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const canvas = canvasRefs.current[pageNumber - 1];
          const context = canvas.getContext("2d");

          const viewport = page.getViewport({ scale: 1.5 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport,
          };

          // Ensure no previous render task is running
          if (renderTasks.current[pageNumber]) {
            renderTasks.current[pageNumber].cancel();
          }

          // Store the render task for cancellation if needed
          const renderTask = page.render(renderContext);
          renderTasks.current[pageNumber] = renderTask;

          // Ensure each page render completes before moving to the next
          await renderTask.promise;
        }
      } catch (error) {
        console.error("Error rendering PDF:", error);
      } finally {
        setIsRendering(false);
      }
    };

    if (url) {
      renderPDF();
    }
  }, [url]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
  
        {Array.from(new Array(numPages), (el, index) => (
          <div className="my-3" key={index} style={{ width: "100%", height: "100%" }}>
            <canvas
              ref={(el) => (canvasRefs.current[index] = el)}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                objectFit: "contain",
              }}
            />
          </div>
        ))}


      {isRendering && <div>Loading PDF...</div>}
    </div>
  );
};

export default SinglePageFlipBook;
