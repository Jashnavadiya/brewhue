import React from "react";
import Marquee from "react-fast-marquee";
const Notfound404 = () => {
  const images = [
    "/images/notfound1.png", // Replace with your image URLs
    "/images/notfound2.png", // Replace with your image URLs
    "/images/notfound4.png", // Replace with your image URLs
    "/images/notfound3.png", // Replace with your image URLs
    "/images/notfound5.png", // Replace with your image URLs
    "/images/notfound6.png", // Replace with your image URLs
    "/images/notfound7.png", // Replace with your image URLs
  ];
  return (
    <div className="bg-[#e4e3dd] h-screen w-screen">
      <div
        className="w-max m-auto h-min flex-col pt-7 flex justify-center items-center "
        style={{
          fontFamily: " 'Abril Fatface', serif",
          fontWeight: "400",
        }}
      >
        <span
          className="text-[96px] line text-center inline p-0 m-0 leading-none"
          style={{
            fontFamily: " 'Abril Fatface', serif",
            fontWeight: "400",
          }}
        >
          404
        </span>
        <span
          className="text-[34px] text-center leading-none"
          style={{
            fontFamily: " 'Abril Fatface', serif",
            fontWeight: "400",
          }}
        >
          Error
        </span>
      </div>
      <div className="my-10">
      <div style={{ backgroundColor: "#e4e3dd"}}>
      <Marquee speed={50} pauseOnHover={true} gradient={false}> 
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Logo ${index}`}
            style={{
              
              height: "150px",
              margin: "0 15px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        ))}
      </Marquee>
    </div>  
      </div>

      <pre className="w-max m-auto text-center">
        {
          "Crashed on the wrong link, \njust like your ex did. 💔\n \nUs bro, us."
        }
      </pre>
    </div>
  );
};

export default Notfound404;
