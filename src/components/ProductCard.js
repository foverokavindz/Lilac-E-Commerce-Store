import React, { useState, useEffect } from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import Wishicon from './Wishicon';
import { addActiveProduct } from '../store/reducers/product/productSlice';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/reducers/cart/cartSlice';

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
              onClick={() => dispatch(addActiveProduct(data))}
              to={'/products-details'}
              class="w-full py-3 px-6 text-center text-white rounded-xl transition bg-gray-700  hover:bg-gray-600 active:bg-gray-700 focus:bg-gray-600 sm:w-max"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
