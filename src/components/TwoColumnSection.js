import React from 'react';
import { useNavigate } from 'react-router-dom';

const TwoColumnSection = ({
  image,
  direction,
  heading,
  subHeading,
  content,
  btnLink,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row flex-wrap h-screen  items-center">
        <div className="w-1/2 h-screen bg-center overflow-hidden">
          <img
            alt="..."
            className="w-full object-cover g-no-repeat "
            src={image}
          />
        </div>
        <div className="w-1/2  flex flex-col justify-start items-start px-20 ">
          <div className="">
            <div className="text-2xl font-semibold text-gray-600">
              {subHeading}
            </div>
            <div className="text-5xl font-bold text-gray-700 mt-2">
              {heading}
            </div>
            <div className="text-lg leading-relaxed text-gray-500 mt-12">
              {content}
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate(btnLink)}
              className="mt-16 py-4 px-7 drop-shadow-lg bg-gray-800 text-white rounded-2xl text-base font-medium flex flex-row gap-3 items-center border-2 hover:bg-gray-100 hover:text-gray-800 border-gray-800 transition-all"
            >
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoColumnSection;
