import React, { useEffect, useState } from "react";
import PdfViewerMenu from "../../components/PdfViewerMenu";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import "./ShopMenu.css";
const ShopMenu = () => {
  const formData = useSelector((state) => state.formData);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Function to calculate the scroll progress
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(scrolled);
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-full m-auto border-lg">
        <div className="flex justify-between items-center my-4  mx-auto w-[95%]  mb-7">
          <pre
            className="text-left text-2xl max-mobiles:text-lg max-mobilem:text-xl max-mobilel:text-2xl text-black"
            style={{
              fontFamily: " 'Abril Fatface', serif",
              fontWeight: "400",
            }}
          >
            {/* {"Make your tastebud's\nfeel gooood..."} */}
            {formData.menu.menu_info.split("\\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </pre>
          <img
            src={`${formData.menu.menu_img}`}
            className="w-12 max-mobiles:w-10 max-mobilem:w-11 max-mobilel:w-12"
            alt=""
          />
        </div>
        <PdfViewerMenu
          url={`${formData.home.section4Pdf}`}
        />
      </div>
      <div className="relative">
        <Link
          to="top" // Target the top of the page when clicked
          smooth={true}
          duration={500}
          className="btn-scroll"
        >
          <span className="arrow-up">&#8593;</span> {/* Up Arrow */}
          <div className="progress-ring">
            <svg
              width="60"
              height="60"
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="#ddd"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="#fff"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${
                  ((100 - scrollProgress) / 100) * 2 * Math.PI * 54
                }`}
                style={{ transition: "stroke-dashoffset 0.005s ease" }}
              />
            </svg>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ShopMenu;
