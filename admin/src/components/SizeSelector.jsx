import React from 'react';

const sizesList = ['S', 'M', 'L', 'XL', 'XXL'];

const SizeSelector = ({ sizes, setSizes }) => {
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className='flex flex-col'>
      <span className='mb-2'>Product Sizes</span>
      <div className='flex gap-3'>
        {sizesList.map((size) => (
          <div key={size} onClick={() => toggleSize(size)}>
            <span
              className={`${
                sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
              } px-3 py-1 cursor-pointer`}
            >
              {size}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
