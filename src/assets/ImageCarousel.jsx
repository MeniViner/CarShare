
import React, { useState } from 'react';
// import '../styles/imageCarousel.css'; 

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const handleNext = () => {
    setAnimationClass('carousel-image-exit');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setAnimationClass('carousel-image-enter');
    }, 500);
    setTimeout(() => {
      setAnimationClass('');
    }, 1000);
  };

  const handlePrevious = () => {
    setAnimationClass('carousel-image-exit');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setAnimationClass('carousel-image-enter');
    }, 500);
    setTimeout(() => {
      setAnimationClass('');
    }, 1000);
  };

  return (
    <div className="carousel">
      <button className="carousel-button left" onClick={handlePrevious}>❮</button>
      <img src={images[currentIndex]} alt={`Car image ${currentIndex + 1}`} className={`carousel-image ${animationClass}`} />
      <button className="carousel-button right" onClick={handleNext}>❯</button>
    </div>
  );
};

export default ImageCarousel;
