import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const Carousel = () => {
  const slides = [
    {
      title: "JL",
      subtitle: "Master Blaster",
      description: "The Hazelnut Latte hits different—smooth, nutty, and perfectly balanced. It's like a little moment of bliss in every sip!",
      date: "12 Jan 2025"
    },
    {
      title: "AB",
      subtitle: "Super Espresso",
      description: "Rich and bold with the perfect kick of caffeine. The ultimate morning booster!",
      date: "13 Jan 2025"
    },
    {
      title: "CD",
      subtitle: "Vanilla Dream",
      description: "Smooth vanilla sweetness with a creamy texture. A dreamy treat for any time of the day!",
      date: "14 Jan 2025"
    }
  ];

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

  return (
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
          <div className="carousel-title text-2xl font-bold bg-[#D4D4D8] w-max m-auto rounded-full p-4">{slides[currentIndex].title}</div>
          <div className="carousel-subtitle text-sm text-black" style={{fontFamily:" 'Inria Serif', serif",fontWeight:"400"}}>{slides[currentIndex].subtitle}</div>
          <div className="carousel-description text-gray-500 text-sm my-3" style={{fontFamily:" 'Inria Serif', serif",fontWeight:"400"}}>{slides[currentIndex].description}</div>
          <div className="carousel-date text-sm text-black" style={{fontFamily:" 'Inria Serif', serif",fontWeight:"400"}}>{slides[currentIndex].date}</div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="carousel-navigation absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 transform -translate-y-1/2">
        <button
          onClick={handlePrev}
          className=" text-gray-500 text-4xl rounded-fulltransition"
        >
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.9201L8.48003 13.4001C7.71003 12.6301 7.71003 11.3701 8.48003 10.6001L15 4.08008" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </button>
        <button
          onClick={handleNext}
          className=" text-gray-500 text-4xl rounded-full transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.90997 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.90997 4.08008" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </button>
      </div>
    </div>
  );
};

export default Carousel;
