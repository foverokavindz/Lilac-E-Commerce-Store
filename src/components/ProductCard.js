import React, { useState, useEffect } from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import Wishicon from './Wishicon';
import { addActiveProduct } from '../store/reducers/product/productSlice';
import { useDispatch } from 'react-redux';

const ProductCard = ({
  _id,
  name,
  image,
  brand,
  review,
  numReviews,
  price,
  data,
}) => {
  const [isWishiconClicked, setIsWishiconClick] = useState(false);

  const dispatch = useDispatch();

  // const [rating, setRating] = useState(0);

  const toggleWishIcon = () => {
    setIsWishiconClick(!isWishiconClicked);
  };

  // useEffect(() => {
  //   const calculateRating = async (review, numReviews) => {
  //     try {
  //       if (numReviews === 0) {
  //         setRating(0);
  //         return;
  //       }

  //       const sum = review.reduce((accumulator, currentValue) => {
  //         return accumulator + currentValue.rating;
  //       }, 0);

  //       setRating(sum / numReviews);
  //     } catch (error) {
  //       console.error('Error calculating rating', error);
  //     }
  //   };
  //   calculateRating(review, numReviews);
  // }, [review, numReviews]);

  // console.log('rating', rating);
  // console.log('numReviews', numReviews);

  return (
    <>
      <div className=" border-gray-200 rounded-lg shadow p-5">
        <Link
          to={`/products-details`}
          onClick={() => dispatch(addActiveProduct(data))}
          className="group"
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
            <img
              src={image}
              alt={name}
              className="h-80 w-80 object-cover object-center group-hover:opacity-75 hover:scale-110 transition-all"
            />
          </div>
        </Link>

        <div className="flex flex-row justify-between  items-center mt-3">
          <div>
            <h6 className="text-xm font-light">{brand}</h6>
            <h5 class=" text-2xl font-semibold tracking-tight text-gray-700 ">
              {name}
            </h5>
          </div>

          <Wishicon onClick={toggleWishIcon} filled={isWishiconClicked} />
        </div>

        <div>
          <Rating rating={numReviews} />
        </div>

        <div class="flex items-center justify-between mt-4">
          <span class="text-3xl font-bold text-gray-700 ">${price}</span>
          <div className="flex flex-row justify-between gap-2 items-center">
            <Link
              to={'/'}
              class="w-full py-3 px-3 text-center text-gray-700  transition rounded-xl  bg-gray-100  hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200 sm:w-max"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
            <Link
              onClick={() => dispatch(addActiveProduct(data))}
              to={'/products-details'}
              class="w-full py-3 px-6 text-center text-white rounded-xl transition bg-gray-700  hover:bg-gray-600 active:bg-gray-700 focus:bg-gray-600 sm:w-max"
            >
              Buy now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
