import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { currency } from '../App';
import { assets } from '../assets/assets';
import { getAllOrders, status } from '../api/orders';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  const fetchAllOrders = async () => {
    setOrderLoading(true);
    try {
      await getAllOrders(setOrders, token);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setOrderLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      await status(event, orderId, setOrders, token);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {!orderLoading ? (
          orders.map((order, index) => (
            <div
              className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
              key={index}
            >
              <img className='w-12' src={assets.parcel_icon} alt='' />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p className='py-0.5' key={index}>
                          {item.name} x {item.quantity} <span>{item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p className='py-0.5' key={index}>
                          {item.name} x {item.quantity} <span>{item.size}</span>
                          ,
                        </p>
                      );
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium'>
                  {order.address.firstName + ' ' + order.address.lastName}
                </p>
                <div>
                  <span>{order.address.street + ','}</span>
                  <p>
                    {order.address.city +
                      ', ' +
                      order.address.state +
                      ', ' +
                      order.address.country +
                      ', ' +
                      order.address.zipcode}
                  </p>
                </div>
                <span>{order.address.phone}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-sm sm:text-[15px]'>
                  Items : {order.items.length}
                </span>
                <span className='mt-3'>Method : {order.paymentMethod}</span>
                <span>Payment : {order.payment ? 'Done' : 'Pending'}</span>
                <span>Data : {new Date(order.date).toLocaleDateString()}</span>
              </div>
              <span className='text-sm sm:text-[15px]'>
                {currency}
                {order.amount}
              </span>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className='p-2 font-semibold'
              >
                <option value='Order Placed'>Order Placed</option>
                <option value='Packing'>Packing</option>
                <option value='Shipped'>Shipped</option>
                <option value='Out for delivery'>Out for delivery</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <div className='flex justify-center items-center'>
            <ThreeDots
              visible={true}
              height='30'
              width='30'
              color='#242020'
              radius='9'
              ariaLabel='three-dots-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
