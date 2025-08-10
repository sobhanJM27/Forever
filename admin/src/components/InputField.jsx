import React from 'react';

const InputField = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div className='flex flex-col'>
    <span className='mb-2'>{label}</span>
    <input
      className='w-full max-w-[500px] px-3 py-2'
      type={type}
      value={value}
      placeholder={placeholder}
      required
      onChange={onChange}
    />
  </div>
);

export default InputField;
