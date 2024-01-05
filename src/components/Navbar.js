import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const headerStyle = {
  backgroundColor: '#DADADA',
  marginBottom: '20px',
};

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Products', href: '/products', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <Disclosure as="nav" className="bg-stone-200">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-300 hover:text-gray-900">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Lilac stores"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((page) => (
                        <Link
                          key={page.name}
                          to={page.href}
                          className={classNames(
                            page.current
                              ? ' text-neutral-700'
                              : 'text-neutral-500 hover:text-neutral-800 ',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={page.current ? 'page' : undefined}
                        >
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {currentUser ? (
                    <button
                      type="button"
                      className="relative rounded-full hover:bg-gray-300 p-1.5  text-gray-700 hover:text-gray-800 focus:outline-none focus:bg-gray-700 focus:text-white "
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View Cart</span>

                      {/* cart batch */}
                      <div class="t-0 absolute left-5 bottom-5">
                        <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2.5 text-xs text-white">
                          3
                        </p>
                      </div>
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    ''
                  )}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Link to={'/profile'}>
                        {currentUser ? (
                          // eslint-disable-next-line jsx-a11y/img-redundant-alt
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-10s w-10 rounded-full"
                              src={currentUser.profilePicture}
                              alt=""
                            />
                          </Menu.Button>
                        ) : (
                          <button class="text-white hover:text-gray-800 bg-gray-800 hover:bg-gray-900 hover:border-gray-800 hover:border-2 border-2 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-200 dark:focus:ring-gray-700 dark:border-gray-700">
                            Sign in
                          </button>
                        )}
                      </Link>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? ' text-neutral-700'
                        : 'text-neutral-500 hover:text-neutral-800 ',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
