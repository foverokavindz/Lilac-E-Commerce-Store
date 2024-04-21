/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartVisible } from '../store/reducers/ui/uiSlice';
import {
  addItemToCart,
  clearCart,
  removeItemFromCart,
  removeOneProduct,
} from '../store/reducers/cart/cartSlice';
import { Link } from 'react-router-dom';

/*
const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];
*/

export default function Example() {
  const dispatch = useDispatch();
  const { cartIsVisible: open } = useSelector((state) => state.ui);
  const { items, subtotal, totalQuantity } = useSelector((state) => state.cart);

  console.log('items  ', items);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(toggleCartVisible())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          {totalQuantity !== 0 ? (
                            <button
                              className="px-4 py-1 text-red-500 font-medium bg-red-100 rounded-2xl text-base mr-4 hover:bg-red-200"
                              onClick={() => dispatch(clearCart())}
                            >
                              Clear cart
                            </button>
                          ) : (
                            ''
                          )}

                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => dispatch(toggleCartVisible())}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {totalQuantity !== 0 ? (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {items.map((product) => (
                                <li key={product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">{product.name}</a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <div className="flex flex-row gap-1 items-center">
                                        <p className="mt-1 text-sm text-gray-500">
                                          Color - {product.selectedColor} |
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          Size - {product.selectedSize}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-between mt-5 text-sm">
                                      <p className="text-gray-500 text-base">
                                        Qty - {product.quantity}
                                      </p>

                                      <div className="flex">
                                        <div
                                          className="inline-flex rounded-xl "
                                          role="group"
                                        >
                                          {/* add item */}
                                          <button
                                            onClick={() =>
                                              dispatch(
                                                addItemToCart(product._id)
                                              )
                                            }
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 "
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke-width="1.5"
                                              stroke="currentColor"
                                              className="w-5 h-5"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                              />
                                            </svg>
                                          </button>
                                          {/* minus number */}
                                          <button
                                            onClick={() =>
                                              dispatch(
                                                removeItemFromCart(product._id)
                                              )
                                            }
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 "
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke-width="1.5"
                                              stroke="currentColor"
                                              className="w-5 h-5"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M5 12h14"
                                              />
                                            </svg>
                                          </button>
                                          {/** Delete button */}
                                          <button
                                            onClick={() =>
                                              dispatch(
                                                removeOneProduct(product._id)
                                              )
                                            }
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 "
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke-width="1.5"
                                              stroke="tomato"
                                              className="w-5 h-5"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center h-4/5">
                          <img
                            className="w-56 h-56"
                            src="https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg?w=826&t=st=1705037248~exp=1705037848~hmac=2854307e2ac05ac6b671877d0ad76b5ae67fc49708d10bcfcd106680c5e8b524"
                            alt="empty cart"
                          />
                          <h1 className="text-gray-900 text-xl mt-6 title-font font-medium mb-1">
                            Your Cart is Empty
                          </h1>
                        </div>
                      )}
                    </div>

                    {/* cart footer */}
                    {totalQuantity !== 0 ? (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{subtotal}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            onClick={() => dispatch(toggleCartVisible())}
                            to={'/checkout'}
                            className="flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500 gap-2">
                          <p>or</p>
                          <button
                            type="button"
                            className="font-medium text-gray-700 hover:text-gray-500"
                            onClick={() => dispatch(toggleCartVisible())}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500 gap-2">
                          <button
                            type="button"
                            className="font-semibold text-base text-gray-700 hover:text-gray-500 flex flex-row items-center gap-3 hover:gap-5 transition-all"
                            onClick={() => dispatch(toggleCartVisible())}
                          >
                            Continue Shopping
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

/*

                        <div className="flex flex-col justify-center items-center h-4/5">
                          <img
                            className="w-56 h-56"
                            src="https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg?w=826&t=st=1705037248~exp=1705037848~hmac=2854307e2ac05ac6b671877d0ad76b5ae67fc49708d10bcfcd106680c5e8b524"
                            alt="empty cart"
                          />
                          <h1 className="text-gray-900 text-2xl mt-5 title-font font-medium mb-1">
                            Your Cart is Empty
                          </h1>

                          <Link
                            onClick={() => dispatch(toggleCartVisible())}
                            to={'/products-details'}
                            className="flex items-center mt-5 gap-5 justify-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                          >
                            Continue Shopping
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </Link>
                        </div>




*/
