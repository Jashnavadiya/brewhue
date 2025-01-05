import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ OgComponent }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., 1.5 seconds)
    setTimeout(() => {
      setLoading(false); // After the loading duration, set loading to false
    }, 1500); // Change this duration to simulate loading
  }, []);

  return (
    <div>
      {/* AnimatePresence to handle the transitions when components enter/leave */}
      <AnimatePresence>
        {loading && (
          <motion.div
            style={styles.container}
            initial={{ opacity: 1 }} // Start with full opacity
            animate={{ opacity: 1 }} // Keep full opacity while loading
            exit={{ opacity: 0 }} // Fade out when exiting
            transition={{ duration: 1, ease: 'easeOut' }} // Smooth fade-out effect
          >
            <img src="/loading.gif" alt="" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content fades in once loading is complete */}
      {!loading && (
        <motion.div
          style={styles.contentContainer}
          initial={{ opacity: 0 }} // Start with no opacity (hidden)
          animate={{ opacity: 1 }} // Fade in with full opacity
          transition={{ duration: 1.4, ease: 'easeOut' }} // Smooth fade-in effect
        >
          <OgComponent /> {/* Render the provided OgComponent */}
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '6px solid #ccc',
    borderTop: '6px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#ffffff',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
};

export default LoadingScreen;
