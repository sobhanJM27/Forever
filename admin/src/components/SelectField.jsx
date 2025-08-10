import React from 'react';

const SelectField = ({ label, value, onChange, options }) => (
  <div className='flex flex-col'>
    <span className='mb-2'>{label}</span>
    <select className='w-full px-3 py-2' value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
