/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import Rating from '../../components/Rating';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/reducers/cart/cartSlice';

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [remainingStock, setRemainingStock] = useState(0);
  const dispatch = useDispatch();

  const { activeProduct } = useSelector((state) => state.product);
  const {
    _id,
    name,
    image,
    brand,
    numReviews,
    price,
    review,
    category,
    description,
    images,
    isFeatured,
    stock,
  } = activeProduct;

  useEffect(() => {
    // Check if both color and size are selected
    if (selectedColor && selectedSize) {
      // Find the corresponding stock item

      const selectedStock = stock.find((item) => item.color === selectedColor);
      if (selectedStock) {
        // Find the corresponding size count
        const sizeCount = selectedStock.sizeCount.find(
          (sizeItem) => sizeItem.size === selectedSize
        );
        if (sizeCount) {
          setRemainingStock(sizeCount.count);
        }
      }
    } else {
      // If color or size is not selected, set remaining stock to 0
      setRemainingStock(0);
    }
  }, [selectedColor, selectedSize, stock]);

  console.log('activeProduct   ', activeProduct);
  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="flex flex-col lg:w-1/2 w-full">
              <div>
                <img
                  className="w-full  object-cover object-center rounded-2xl border border-gray-200"
                  src={image}
                  alt={name}
                />
              </div>
              <div className="flex flex-row justify-start items-center mt-5 gap-5">
                {images.map((item) => {
                  return (
                    <div>
                      <img
                        alt="name"
                        className="w-32 h-32 object-cover object-center rounded-2xl border border-gray-200"
                        src={item}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {name}
              </h1>
              <div className="flex mb-4">
                <Rating rating={numReviews} />
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{description}</p>
              <div className="flex border-b-2 border-gray-200 mb-5 pb-5 flex-col">
                <div className="flex mt-6 items-center pb-5 ">
                  <div className="flex items-center">
                    <span className="mr-3">Color</span>
                    <div className="relative">
                      <select
                        className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                        onChange={(e) => setSelectedColor(e.target.value)}
                      >
                        {stock.map((item) => {
                          return <option key={item._id}>{item.color}</option>;
                        })}
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative  ">
                      <select
                        className="rounded border  appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10  "
                        disabled={selectedColor ? false : true}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        {stock.map((item) => {
                          if (item.color === selectedColor) {
                            return item.sizeCount.map((sizeItem) => (
                              <option key={sizeItem._id}>
                                {sizeItem.size}
                              </option>
                            ));
                          }
                          return null;
                        })}
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-base font-medium">
                    Stock - {remainingStock}
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="title-font font-bold text-3xl text-gray-900">
                    ${price}
                  </p>
                </div>

                <div className="flex flex-row justify-between gap-2 items-center">
                  <button
                    onClick={() =>
                      dispatch(
                        addItemToCart({
                          _id,
                          price,
                          name,
                          selectedColor,
                          selectedSize,
                          image,
                        })
                      )
                    }
                    class="flex flex-row gap-3 w-full py-3 px-6 text-center text-gray-700  transition rounded-xl  bg-gray-100  hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200 sm:w-max"
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
                    </svg>{' '}
                    Add to cart
                  </button>
                  <Link
                    onClick={() =>
                      dispatch(
                        addItemToCart({
                          _id,
                          price,
                          name,
                          selectedColor,
                          selectedSize,
                          image,
                        })
                      )
                    }
                    to={'/checkout'}
                    class="flex flex-row gap-3 w-full py-3 px-6 text-center text-white rounded-xl transition bg-gray-700  hover:bg-gray-600 active:bg-gray-700 focus:bg-gray-600 sm:w-max"
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
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    Buy now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
