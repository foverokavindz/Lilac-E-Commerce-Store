import React, { useState, useEffect } from 'react';
import sliderImageOne from '../components/assets/slider/1.jpg';
import sliderImageTwo from '../components/assets/slider/2.jpg';
import sliderImageThree from '../components/assets/slider/3.jpg';

const sliderData = [
  {
    key: 1,
    image: sliderImageThree,
    mainHeading: 'Unleash Your Bold Side: Statement Pieces Galore',
    subHeading: 'Stand Out in the Crowd with Fashion forward Pieces',
  },

  {
    key: 2,
    image: sliderImageTwo,
    mainHeading: 'Essentials Collection Timeless Wardrobe Staples',
    subHeading: 'Versatile Pieces for Effortless Mix and Match',
  },
  {
    key: 3,
    image: sliderImageOne,
    mainHeading: 'Trendy Styles for Every Season',
    subHeading: 'Discover the Latest Fashion Trends',
  },
];

const ImageSlider = () => {
  const [slidePosition, setSlidePosition] = useState(0);

  useEffect(() => {
    const slider = document.getElementById('slider');
    const moveSlide = () => {
      const max = slider.scrollWidth;
      const nextPosition = slidePosition + slider.clientWidth;

      if (nextPosition >= max) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
        setSlidePosition(0);
      } else {
        slider.scrollTo({ left: nextPosition, behavior: 'smooth' });
        setSlidePosition(nextPosition);
      }
    };

    const intervalId = setInterval(moveSlide, 2000);

    return () => clearInterval(intervalId);
  }, [slidePosition]);
  // console.log('hiii');
  return (
    <>
      <div
        className="h-screen w-full overflow-hidden flex flex-nowrap text-center antialiased"
        id="slider"
      >
        {sliderData.map((image) => {
          return (
            <div
              className=" relative text-white  flex-none w-full flex flex-col items-center justify-center"
              key={image.key}
            >
              <img
                src={image.image}
                alt="slider Image"
                className="object-fill w-full h-screen "
              />

              <div className="absolute w-full h-screen flex justify-center items-center flex-col bg-gray-900 bg-opacity-50 gap-10">
                {' '}
                <h2 className="text-7xl px-20 font-semibold uppercase text-balance">
                  {image.mainHeading}
                </h2>
                <p className="max-w-md text-lg font-medium uppercase">
                  {image.subHeading}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageSlider;
