import React from 'react';
import './App.css'; // Make sure to create a CSS file

const BackgroundText = () => {
  return (
    <div className="container">
      <div className="background-image">
        {/* This will display the background image */}
      </div>
      <div className="svg-overlay">
        <svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="backgroundImage" patternUnits="userSpaceOnUse" width="500" height="200">
              <image href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PFRUWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRktKystKy0tLSsrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EABcQAQEBAQAAAAAAAAAAAAAAAAABEQL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APDpGpEjUAxcVaKzi4oImGNFBnDGsQVMTGigzhimCJiY0gqYYoCYmNAM4mNAM4Y0gMjSAgoIgAAACKgAANctxjluCqKQBUkawCQIoiIoCI0gJUDAQUBFEFAAEqoAioAACAAIqAACAIAADfLcY4bgqkiLAaEWCCykAVLABMTCgJRbUBKUAQAUAARUARQEAAQAEUBABBFQAAG+G4xw3BVAgjUEWAsBQRGqzQKisgFKAhoAIqChqLAEAAEAABAAEVAABBFQAAG+W2OWxSLEaEFhoClJQBK1WAVKaAiKlABAVAFAQCgAIoCAgAAAIAAIIqAAA3y2xy3BSNRlRGhlQUgAGGpoCWrqAaIgKRAUoIClCggACKgAIAAAioAAIIqAAA1y6Rz5bgqqhAVUAU0BAQAEoAgACoKAAgAAAIAAgAAAIAgAAioAADXLcYjUFaBNBVQAWVFEBABAAAFEUARagBQBAAEVAAAEAAAQAARUAABqNRiNQVoABUUAAAAEC0oIqAAAAACAACAqAACAACAAAAIAAACxqMxQaVlRVEUAAAKAAgAAAICiAAAggCgAIAAAIAAioAAAAAqoA0ICtCaAqs6A1qIaCiaACAKIAqAACAogCoAgAAAAgAAAAAAAoABoAaaALpoAaABqABpoAAAAAAAAAAAIAAAAAAAAAAAP/9k=" x="0" y="0" width="500" height="200" />
            </pattern>
          </defs>
          <text x="50%" y="50%" font-size="50" text-anchor="middle" fill="url(#backgroundImage)" stroke="white" stroke-width="1">
            ENSO
          </text>
        </svg>
      </div>
    </div>
  );
};

export default BackgroundText;
