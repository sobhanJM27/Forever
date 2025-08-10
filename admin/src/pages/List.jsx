import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { currency } from '../App';
import { toast } from 'react-toastify';
import { fetchList, removeProduct } from '../api/products';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const [isListLoading, setListLoading] = useState(false);
  const [removeLoadingId, setRemoveLoadingId] = useState(null);

  const getList = async () => {
    setListLoading(true);
    try {
      await fetchList(setList);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setListLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setRemoveLoadingId(id);
    try {
      await removeProduct(id, setList, token);
    } catch (error) {
    } finally {
      setRemoveLoadingId(null);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {!isListLoading ? (
          list?.map((item, index) => (
            <div
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
              key={index}
            >
              <img className='w-12' src={item.image[0]} alt='' />
              <span>{item.name}</span>
              <span>{item.category}</span>
              <span>
                {currency}
                {item.price}
              </span>
              <span
                onClick={() => deleteProduct(item._id)}
                className='text-right md:text-center cursor-pointer text-lg'
              >
                {removeLoadingId === item._id ? (
                  <div className='flex justify-center items-center'>
                    <ThreeDots
                      visible={true}
                      height='20'
                      width='20'
                      color='#242020'
                      radius='9'
                      ariaLabel='three-dots-loading'
                      wrapperStyle={{}}
                      wrapperClass=''
                    />
                  </div>
                ) : (
                  'X'
                )}
              </span>
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
    </>
  );
};

export default List;
