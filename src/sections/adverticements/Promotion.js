import React from 'react';
import image from '../../components/assets/Lilac-logo-transparent.png';
import { useNavigate } from 'react-router-dom';

const Promotion = () => {
  const navigate = useNavigate();
  return (
    <>
      <div class="pb-16 bg-gray-100 w-full">
        <div class="items-center pt-12 px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
          <div class="justify-center w-full  lg:p-10 max-auto">
            <div class="flex flex-col justify-center items-center w-full text-center ">
              <div class="flex flex-col items-center justify-center max-w-xl gap-3 mx-auto lg:flex-row">
                <img class="w-40 h-auto rounded-full " src={image} />
              </div>

              <p class="sm:mt-8 mt-3 sm:px-44 text-[#10172A] text-4xl sm:text-6xl font-semibold tracking-tighter">
                Trendy{' '}
                <span class="underline leading-8 underline-offset-8	decoration-8 decoration-[#474747]">
                  Fashion,
                </span>{' '}
                Unmatched Quality
              </p>

              <p class=" mt-10 text-gray-600 text-lg font-normal text-center w-1/2 ">
                From casual wear to formal attire, we've got you covered. Our
                diverse collections cater to all occasions, allowing you to
                express your unique style no matter where life takes you.
                Discover curated selections that range from everyday essentials
                to statement pieces for those special moments
              </p>
            </div>
          </div>
        </div>

        <div class="text-center  w-full flex justify-center mt-5">
          <button
            onClick={() => navigate('/products')}
            className=" py-4 px-7 drop-shadow-lg bg-gray-800 text-white rounded-2xl text-base font-medium flex flex-row gap-3 items-center border-2 hover:bg-gray-100 hover:text-gray-800 border-gray-800 transition-all"
          >
            View All
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
    </>
  );
};

export default Promotion;
