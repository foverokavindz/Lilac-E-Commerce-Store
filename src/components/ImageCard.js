import React from 'react';

const ImageCard = ({ image, name, description }) => {
  return (
    <>
      <div className="w-80">
        <div className="w-80 overflow-hidden rounded-xl ">
          {' '}
          <img
            src={image}
            class="h-80 w-80 object-cover object-center group-hover:opacity-75 rounded-xl hover:scale-110 transition-all"
            alt={name}
          />
        </div>
        <div className="flex flex-col justify-center items-center p-5">
          <h5 class=" text-2xl font-semibold tracking-tight text-gray-800 ">
            {name}
          </h5>
          <h5 class="mt-2 text-base  text-center font-semibold tracking-tight text-gray-500 ">
            {description}
          </h5>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
