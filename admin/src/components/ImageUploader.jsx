import React from 'react';
import { assets } from '../assets/assets';

const ImageUploader = ({ image, setImage, id }) => (
  <label htmlFor={id}>
    <img
      className='w-20'
      src={!image ? assets.upload_area : URL.createObjectURL(image)}
      alt=''
    />
    <input
      onChange={(e) => setImage(e.target.files[0])}
      type='file'
      id={id}
      hidden
    />
  </label>
);

export default ImageUploader;
