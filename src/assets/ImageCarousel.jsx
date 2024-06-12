// ImageCarousel.jsx
import React, { useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-button left" onClick={handlePrevious}>❮</button>
      <img src={images[currentIndex]} alt={`Car image ${currentIndex + 1}`} className="carousel-image" />
      <button className="carousel-button right" onClick={handleNext}>❯</button>
    </div>
  );
};

export default ImageCarousel;
