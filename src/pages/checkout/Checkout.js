import React from 'react';
import { clearCart } from '../../store/reducers/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const dispatch = useDispatch();
  const { items, subtotal, totalQuantity } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log('items   ', items);
  console.log('currentUser  ', currentUser);

  const handleSubmit = async () => {
    const bodyData = {
      orderItems: [],
      address: currentUser.address,
    };

    // Iterate through each object in the originalData array
    items.forEach((item) => {
      const newItem = {
        name: item.name || '',
        quantity: item.quantity || '',
        image: item.image || '',
        color: item.selectedColor || '',
        size: item.selectedSize || '',
        price: item.price || '',
        productId: item._id || '',
      };

      // Push the newly created item to the orderItems array
      bodyData.orderItems.push(newItem);
    });

    console.log('bodyData  ', bodyData);

    try {
      // setIsLoading(true);
      const token = localStorage.getItem('lilac-auth-token');
      const res = await fetch(BASE_URL + '/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(bodyData),
      });
      const data = await res.json();
      // if (data.error) setError(true);

      // setIsLoading(false);
      console.log('data  ', data);
      toast.success('Order placed successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000);
      dispatch(clearCart());
    } catch (error) {
      console.log('error', error);
      //  setIsLoading(false);
      //  setError(true);
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-7xl py-16 flex flex-col">
        <div class="md:px-6 ">
          <div class="flex justify-start item-start space-y-2 flex-col">
            <h1 class="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Checkout
            </h1>
            <p class="text-base  font-medium leading-6 text-gray-600">
              21st Mart 2021 at 10:34 PM
            </p>
          </div>
          <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div class="flex flex-col justify-start items-start rounded-3xl bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p class="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800 mb-6">
                  {currentUser.firstName}’s Cart
                </p>

                {items.map((product) => {
                  return (
                    <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                      {/* product Item */}
                      <div class="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          class="w-32 h-32 rounded-2xl"
                          src={product.image}
                          alt="dress"
                        />
                      </div>

                      <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div class="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 class="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                            {product.name}
                          </h3>
                          <div class="flex justify-start items-start flex-col space-y-2">
                            <p class="text-sm  leading-none text-gray-700">
                              <span class=" text-gray-500">Size: </span>{' '}
                              {product.selectedSize}
                            </p>
                            <p class="text-sm  leading-none text-gray-700">
                              <span class=" text-gray-500">Color: </span>
                              {product.selectedColor}
                            </p>
                          </div>
                        </div>
                        <div class="flex justify-between space-x-8 items-start w-full">
                          <p class="text-base  xl:text-lg leading-6">
                            ${product.price}{' '}
                            <span class="text-red-300 line-through">
                              {' '}
                              ${product.price}
                            </span>
                          </p>
                          <p class="text-base  xl:text-lg leading-6 text-gray-800">
                            {product.quantity}
                          </p>
                          <p class="text-base  xl:text-lg font-semibold leading-6 text-gray-800">
                            ${product.price}{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div class="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8 ">
                <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6 rounded-2xl">
                  <h3 class="text-xl  font-semibold leading-5 text-gray-800">
                    Summary
                  </h3>
                  <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div class="flex justify-between w-full">
                      <p class="text-base  leading-4 text-gray-800">Subtotal</p>
                      <p class="text-base  leading-4 text-gray-600">
                        ${subtotal}
                      </p>
                    </div>
                    <div class="flex justify-between items-center w-full">
                      <p class="text-base  leading-4 text-gray-800">
                        Discount{' '}
                        <span class="bg-gray-200 p-1 text-xs font-medium  leading-3 text-gray-800">
                          STUDENT
                        </span>
                      </p>
                      <p class="text-base  leading-4 text-gray-600">
                        $0.00 &(0%)
                      </p>
                    </div>
                    <div class="flex justify-between items-center w-full">
                      <p class="text-base  leading-4 text-gray-800">Shipping</p>
                      <p class="text-base  leading-4 text-gray-600">$0.00</p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center w-full">
                    <p class="text-base  font-semibold leading-4 text-gray-800">
                      Total
                    </p>
                    <p class="text-base  font-semibold leading-4 text-gray-600">
                      ${subtotal}
                    </p>
                  </div>
                </div>
                <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full rounded-2xl bg-gray-50  space-y-6">
                  <h3 class="text-xl  font-semibold leading-5 text-gray-800">
                    Place A Order - Cash on Delivery
                  </h3>
                  <div class="flex justify-between items-start w-full">
                    <div class="flex justify-center items-center space-x-4">
                      <div class="w-8 h-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-8 h-8"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                          />
                        </svg>
                      </div>
                      <div class="flex flex-col justify-start items-center">
                        <p class="text-lg leading-6  font-semibold text-gray-800">
                          FOVERO Delivery
                          <br />
                          <span class="text-base">Delivery with 24 Hours</span>
                        </p>
                      </div>
                    </div>
                    <p class="text-lg font-semibold leading-6  text-gray-800">
                      $8.00
                    </p>
                  </div>
                  <div class="w-full flex justify-center items-center">
                    <button
                      onClick={() => handleSubmit()}
                      class="hover:bg-black rounded-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                    >
                      Place a Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class=" rounded-3xl w-full xl:w-96 flex justify-start items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
              <h3 class="text-xl  font-semibold leading-5 text-gray-800">
                Your Details
              </h3>
              <div class="flex flex-col md:flex-row xl:flex-col justify-start  w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div class="flex flex-col justify-start items-start flex-shrink-0">
                  <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img
                      src={currentUser.profilePicture}
                      alt="avatar"
                      className="w-24 h-24 rounded-full"
                    />
                    <div class="flex justify-start items-start flex-col space-y-2">
                      <p class="text-base  font-semibold leading-4 text-left text-gray-800">
                        {currentUser.firstName} {currentUser.lastName}
                      </p>
                      <p class="text-sm  leading-5 text-gray-600">
                        10 Previous Orders
                      </p>
                    </div>
                  </div>

                  <div class="flex justify-center text-gray-800  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3 7L12 13L21 7"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p class="cursor-pointer text-sm leading-5 ">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
                <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                  <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p class="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">
                        Shipping & Billing Address
                      </p>
                      <p class="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {currentUser.address}
                      </p>
                    </div>
                    <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                      <p class="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">
                        City
                      </p>
                      <p class="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {currentUser.city}
                      </p>
                    </div>
                  </div>
                  <div class="flex w-full justify-center items-center md:justify-start md:items-start mt-10">
                    <button
                      onClick={() => navigate('/profile')}
                      class="mt-6 md:mt-0  py-3 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border-2 border-gray-800 font-medium w-96 2xl:w-full text-base  leading-4 text-gray-800"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" theme="colored" autoClose="2000" />
    </>
  );
};

export default Checkout;
