import { useEffect, useState } from 'react';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        // setIsLoading(true);
        const token = localStorage.getItem('lilac-auth-token');
        const res = await fetch('http://localhost:3005/api/order/myorders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        const data = await res.json();
        // if (data.error) setError(true);
        setMyOrders(data);
        // setIsLoading(false);
        console.log('data  ', data);
      } catch (error) {
        console.log('error', error);
        //  setIsLoading(false);
        //  setError(true);
      }
    };

    getMyOrders();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Get individual components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Create a user-friendly string
    const formattedDate = `on ${year}.${month}.${day} at ${hours} : ${minutes} : ${seconds} h`;

    return formattedDate;
  };

  return (
    <div>
      <div>
        <h3 className="text-xl font-semibold leading-7 text-gray-900">
          Order list
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Click on orders to add reviews.
        </p>
      </div>

      {myOrders === '' ? (
        <div>
          {myOrders.map(
            (
              {
                _id,
                total,
                address,
                paymentMethod,
                status,
                orderItems,
                dateOrdered,
              },
              index
            ) => {
              return (
                <div key={_id} className="border-t mt-8 border-gray-400">
                  <h3 className="py-4 text-lg  font-semibold  text-gray-700 ">
                    {index + 1}) - Ordered {formatTimestamp(dateOrdered)}
                  </h3>

                  <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-300 ">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Order Id
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Address
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Order Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Payment Method
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-gray-200 border-b ">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {_id}
                        </th>
                        <td class="px-6 py-4">$ {address}</td>
                        <td class="px-6 py-4">{status}</td>
                        <td class="px-6 py-4">{paymentMethod}</td>
                        <td class="px-6 py-4">{total}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-col justify-start items-start rounded-3xl bg-gray-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    {orderItems.map((product) => {
                      return (
                        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                          {/* product Item */}
                          <div className="pb-4 md:pb-8 w-full md:w-40">
                            <img
                              className="w-32 h-32 rounded-2xl"
                              src={product.image}
                              alt="dress"
                            />
                          </div>

                          <div className="border-b border-gray-100 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start">
                              <h6>ID : {product._id}</h6>
                              <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-700">
                                {product.name}
                              </h3>

                              <div className="flex justify-start items-start flex-col space-y-2 mt-7">
                                <p className="text-sm  leading-none text-gray-700">
                                  <span className=" text-gray-500">Size: </span>{' '}
                                  {product.size}
                                </p>
                                <p className="text-sm  leading-none text-gray-700">
                                  <span className=" text-gray-500">
                                    Color:{' '}
                                  </span>
                                  {product.color}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base  xl:text-lg leading-6">
                                Price: ${product.price}{' '}
                              </p>
                              <p className="text-base  xl:text-lg leading-6 text-gray-800">
                                Qty: {product.quantity}
                              </p>
                              <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">
                                Tot: ${product.total}{' '}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="w-full flex flex-row justify-end gap-5 items-center text-2xl font-semibold text-gray-600 underline">
                      <div>
                        {' '}
                        <p>Total </p>
                      </div>
                      <div>
                        {' '}
                        <p>{total} </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <h3 className="text-2xl font-bold leading-7 text-gray-900 text-center mt-5">
          You haven't places any orders yet!
        </h3>
      )}
    </div>
  );
};

export default MyOrders;
