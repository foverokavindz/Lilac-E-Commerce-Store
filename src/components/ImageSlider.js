import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const [slidePosition, setSlidePosition] = useState(0);

  useEffect(() => {
    const slider = document.getElementById('slider');
    const moveSlide = () => {
      const max = slider.scrollWidth - slider.clientWidth;
      const nextPosition = slidePosition + slider.clientWidth;

      if (nextPosition >= max) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
        setSlidePosition(0);
      } else {
        slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
        setSlidePosition(nextPosition);
      }
    };

    const intervalId = setInterval(moveSlide, 2000);

    return () => clearInterval(intervalId);
  }, [slidePosition]);

  return (
    <>
      <div
        className="h-screen w-full overflow-hidden flex flex-nowrap text-center"
        id="slider"
      >
        <div className="bg-blue-600 text-white space-y-4 flex-none w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl max-w-md">Your Big Idea</h2>
          <p className="max-w-md">
            It's fast, flexible, and reliable — with zero-runtime.
          </p>
        </div>
        <div className="bg-pink-400 text-white space-y-4 flex-none w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl max-w-md">
            Tailwind CSS works by scanning all of your HTML
          </h2>
          <p className="max-w-md">
            It's fast, flexible, and reliable — with zero-runtime.
          </p>
        </div>
        <div className="bg-teal-500 text-white space-y-4 flex-none w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl max-w-md">React, Vue, and HTML</h2>
          <p className="max-w-md">
            Accessible, interactive examples for React and Vue powered by
            Headless UI, plus vanilla HTML if you’d rather write any necessary
            JS yourself.
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
