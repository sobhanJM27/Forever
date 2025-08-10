import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const AddButton = ({ loading }) => (
  <button
    type='submit'
    className='w-28 py-3 mt-4 bg-black text-white cursor-pointer flex justify-center items-center'
  >
    {loading ? (
      <ThreeDots
        visible
        height='30'
        width='30'
        color='#fff'
        ariaLabel='loading'
      />
    ) : (
      'ADD'
    )}
  </button>
);

export default AddButton;
