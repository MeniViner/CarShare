import React from 'react';

const VibrationTest = () => {
  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50); // Vibrate for 50ms
      console.log('Vibration triggered'); // Add console log for debugging
    } else {
      console.log('Vibration not supported'); // Log if vibration is not supported
    }
  };

  return (
    <div>
      <button onClick={handleVibration}>Test Vibration</button>
    </div>
  );
};

export default VibrationTest;
