// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const LoadingScreen = ({ OgComponent }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate a loading delay
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       <AnimatePresence>
//         {loading && (
//           <motion.div
//             style={styles.container}
//             initial={{ opacity: 1 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 1 }}
    
//             className="relative flex justify-center items-center"
//           >
//             {/* Wrapper for SVG Text and OgComponent */}
//             <div style={styles.textContainer} className="relative">
//               {/* SVG Text Animation */}
//               <motion.svg
//                 width="100%"
//                 height="100%"
//                 xmlns="http://www.w3.org/2000/svg"
//                 initial={{ scale: 1, opacity: 1 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 250, translateX:12500, opacity: 1 }}
//                 transition={{ duration: 5, ease: 'easeOut' }}
//                 className="absolute z-20"
//               >
//                 <defs>
//                   <mask id="textMask" x="0" y="0" width="100%" height="100%">
//                     {/* Create a white rectangle mask to fill the area outside the text */}
//                     <rect x="0" y="0" width="100%" height="100%" fill="white" />
//                     {/* Create a transparent version of the text to keep the inside transparent */}
//                     <text
//                       x="50%"
//                       y="50%"
//                       fontSize="130"
//                       fontWeight="500"
//                       textAnchor="middle"
//                       fill="black" // Make sure the text itself is black for the mask
//                       stroke="none"
//                       strokeWidth="0"
//                       dy=".35em"
//                     >
//                       ENSO
//                     </text>
//                   </mask>
//                 </defs>

//                 {/* Background to be filled with white outside the text and transparent inside */}
//                 <rect width="100%" height="100%" fill="#262626" mask="url(#textMask)" />

//                 {/* Optional Background Image or OgComponent */}
//                 {/* <motion.image
//                   href="/path/to/your/image.jpg"  // Use the OgComponent or a background image here
//                   x="0" y="0" width="100%" height="100%"
//                   preserveAspectRatio="xMidYMid slice"
//                 /> */}
//               </motion.svg>


//               {/* Render the OgComponent only where the text is */}
//           <motion.div
//                 initial={{ scale: 1 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 3, ease: 'easeOut' }}
//                 className="absolute top-0 left-0 w-full h-full z-10"
//               >
//                 <OgComponent />
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

     
//         <motion.div
//           style={styles.contentContainer}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, ease: 'easeOut' }}
//         >
//           <OgComponent />
//         </motion.div>
    
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#ffffff', // Optional background color (white outside the text area)
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 1000,
//     overflow: 'hidden',
//   },
//   textContainer: {
//     position: 'relative',
//     width: '100%', // Width of the text container (same as the SVG)
//     height: '100%', // Height of the text container (same as the SVG)
//     overflow: 'hidden',
//     backgroundColor: '#ffffff', // Ensure white background for the whole container
//   },
//   contentContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#ffffff', // White background when loading is finished
//     color: '#333',
//     fontFamily: 'Arial, sans-serif',
//     textAlign: 'center',
//   },
// };

// export default LoadingScreen;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading,setFormData } from '../slices/formDataSlice';
import axios from 'axios';
const LoadingScreen = ({ OgComponent }) => {
  const { shopName } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  
  const loading = useSelector((state) => state.formData.loading);

  const checkDatabase = async () => {
    if (!shopName) return;
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/check-database/${shopName}`);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        console.log('Database does not exist.');
        nav("/notfound");
      }
    }
  };
  const [isLoad,setIsload]=useState(true);
  useEffect(() => {
    dispatch(setLoading(true));  // Set loading to true before fetching data
    axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/shopinfo/userpanel`)
    .then((res) => {
      console.log("Data fetched:", res.data); // Log the data fetched
      dispatch(setFormData(res.data));
      dispatch(setLoading(false)); // Set loading to false once data is fetched
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      dispatch(setLoading(false)); // Ensure loading is set to false in case of error
    });
  
  }, []);
  useEffect(() => {
    console.log("Loading state:", loading); // Log to track loading state change
    if(loading) return; 
    setTimeout(() =>{setIsload(false);},1500)
    
  }, [loading]);
  
  // useEffect(() => {
  //   checkDatabase();
  // }, [shopName]);



  return (
    <div>
      <AnimatePresence>
        {isLoad && (
          <motion.div
            style={styles.container}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1.2 }}
              exit={{ scale: 1.2 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              src={`${process.env.REACT_APP_BASE_URL}/uploads/shops/${shopName}.png`}
              className='w-1/2 fixed z-10 sm:w-1/2 md:w-1/3 lg:w-1/3 h-100'
              alt="Shop Logo"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoad && OgComponent ? (
  <motion.div
    style={styles.contentContainer}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
  >
    <OgComponent />
  </motion.div>
) : (
  <div></div>
)}

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: 'transparent',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
};

export default LoadingScreen;
