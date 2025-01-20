// import React, { useEffect, useRef, useState } from "react";
// import HTMLFlipBook from "react-pageflip";
// import { pdfjs } from "react-pdf";

// const SinglePageFlipBook = ({ url }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [isRendering, setIsRendering] = useState(false);
//   const [parentDimensions, setParentDimensions] = useState({ width: 0, height: 0 });
//   const canvasRefs = useRef([]);
//   const flipBookRef = useRef(null);

//   // Configure PDF.js worker
//   pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

//   useEffect(() => {
//     const parentElement = flipBookRef.current?.parentElement;

//     const updateDimensions = () => {
//       if (parentElement) {
//         const { width, height } = parentElement.getBoundingClientRect();
//         setParentDimensions({ width, height });
//       }
//     };

//     const observer = new ResizeObserver(updateDimensions);
//     if (parentElement) observer.observe(parentElement);

//     updateDimensions();

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     const renderPDF = async () => {
//       setIsRendering(true);
//       try {
//         const pdf = await pdfjs.getDocument(url).promise;
//         setNumPages(pdf.numPages);

//         for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
//           const page = await pdf.getPage(pageNumber);
//           const canvas = canvasRefs.current[pageNumber - 1];
//           const context = canvas.getContext("2d");

//           const viewport = page.getViewport({ scale: 1.5 });
//           canvas.width = viewport.width;
//           canvas.height = viewport.height;

//           const renderContext = {
//             canvasContext: context,
//             viewport,
//           };

//           await page.render(renderContext).promise;
//         }
//       } catch (error) {
//         console.error("Error rendering PDF:", error);
//       } finally {
//         setIsRendering(false);
//       }
//     };

//     if (url) {
//       renderPDF();
//     }
//   }, [url]);

//   return (
//     <div ref={flipBookRef} style={{ width: "100%", height: "100%" }}>
//       <HTMLFlipBook
//         size="stretch"
//         width={parentDimensions.width || 400}
//         height={parentDimensions.height || 600}
//         maxWidth={parentDimensions.width || 400}
//         maxHeight={parentDimensions.height || 600}
//         minWidth={300}
//         minHeight={500}
//         drawShadow={true}
//         showCover={false}
//         mobileScrollSupport={true}
//         useMouseEvents={true}
//         flippingTime={1000}
//         className="rpf-flipbook" // Custom class for CSS targeting
//       >
//         {Array.from(new Array(numPages), (el, index) => (
//           <div key={index} style={{ width: "100%", height: "100%" }}>
//             <canvas
//               ref={(el) => (canvasRefs.current[index] = el)}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 borderRadius: "10px",
//                 objectFit: "contain",
//               }}
//             />
//           </div>
//         ))}
//       </HTMLFlipBook>

//       {isRendering && <div>Loading PDF...</div>}
//     </div>
//   );
// };

// export default SinglePageFlipBook;


import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs } from "react-pdf";

const SinglePageFlipBook = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [isRendering, setIsRendering] = useState(false);
  const [parentDimensions, setParentDimensions] = useState({ width: 0, height: 0 });
  const canvasRefs = useRef([]);
  const flipBookRef = useRef(null);
  const renderTasks = useRef({});

  // Configure PDF.js worker
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.min.mjs`;

useEffect(() => {
  const parentElement = flipBookRef.current?.parentElement;

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const updateDimensions = debounce(() => {
    if (parentElement) {
      const { width, height } = parentElement.getBoundingClientRect();
      setParentDimensions({ width, height });
    }
  }, 200);

  const observer = new ResizeObserver(updateDimensions);
  if (parentElement) observer.observe(parentElement);

  updateDimensions();

  return () => observer.disconnect();
}, []);

  
  useEffect(() => {
    const renderPDF = async () => {
      setIsRendering(true);
      try {
        const pdf = await pdfjs.getDocument(url).promise;
        setNumPages(pdf.numPages);
  
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
  
          // Cancel any existing render task for this page
          if (renderTasks.current[pageNumber]) {
            renderTasks.current[pageNumber].cancel();
          }
  
          // Create a new render task and store it
          const renderTask = page.render(renderContext);
          renderTasks.current[pageNumber] = renderTask;
  
          // Wait for the current page to finish rendering
          await renderTask.promise;
        }
      } catch (error) {
        if (error.name !== "RenderingCancelledException") {
          console.error("Error rendering PDF:", error);
        }
      } finally {
        setIsRendering(false);
      }
    };
  
    if (url) {
      renderPDF();
    }
  }, [url]);
  

  return (
    <div ref={flipBookRef} style={{ width: "100%", height: "100%" }}>
      <HTMLFlipBook
        size="stretch"
        width={parentDimensions.width || 400}
        height={parentDimensions.height || 600}
        maxWidth={parentDimensions.width || 400}
        maxHeight={parentDimensions.height || 600}
        minWidth={300}
        minHeight={500}
        drawShadow={true}
        showCover={false}
        mobileScrollSupport={true}
        useMouseEvents={true}
        flippingTime={1100}
        className="rpf-flipbook" // Custom class for CSS targeting
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={index} style={{ width: "100%", height: "100%" }}>
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
      </HTMLFlipBook>

      {isRendering && <div>Loading PDF...</div>}
    </div>
  );
};

export default SinglePageFlipBook;
