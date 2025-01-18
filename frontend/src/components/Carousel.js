import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const Carousel = ({ slides }) => {


  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Handle previous and next slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Swipeable config
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (<>

    <div className="mx-auto p-4 h-[270px] relative">
      <div
        className="carousel-container relative max-w-full w-full h-full"
        style={{ height: 'auto' }}
        {...swipeHandlers} // Add swipeable handlers
      >
        <motion.div
          key={currentIndex}
          className="carousel-slide  top-0 left-0 w-10/12 m-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className=" p-5  rounded-lg ">
            <div className="carousel-title text-2xl font-medium bg-[#D4D4D8]  w-[56px] h-[56px] m-auto rounded-full relative"><span className="absolute top-0 bottom-0 left-0 h-max m-auto right-0">{slides[currentIndex].logo_name}</span></div>
            <div className="carousel-subtitle text-sm text-black mt-2" style={{ fontFamily: " 'Inria Serif', serif", fontWeight: "400" }}>{slides[currentIndex].name}</div>
            <div className="carousel-description text-gray-500 text-sm my-3" style={{ fontFamily: " 'Inria Serif', serif", fontWeight: "400" }}>{slides[currentIndex].review}</div>
            <div className="carousel-date text-sm text-black" style={{ fontFamily: " 'Inria Serif', serif", fontWeight: "400" }}>{slides[currentIndex].date}</div>
          </div>
        </motion.div>

        {/* Navigation */}

      </div>
      <div className="carousel-navigation absolute w-full top-1/2 left-0 right-0 flex justify-between p-0 items-center transform px-4 -translate-y-1/2">
        <button
          onClick={handlePrev}
          className=" text-gray-500 text-4xl rounded-fulltransition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19.9201L8.48003 13.4001C7.71003 12.6301 7.71003 11.3701 8.48003 10.6001L15 4.08008" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </button>
        <button
          onClick={handleNext}
          className=" text-gray-500 text-4xl rounded-full transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.90997 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.90997 4.08008" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </button>
      </div>
    </div>
  </>
  );
};

export default Carousel;
