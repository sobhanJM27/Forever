import React, { useState } from 'react';
import { addProduct } from '../api/products';
import { toast } from 'react-toastify';
import ImageUploader from '../components/ImageUploader';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import SizeSelector from '../components/SizeSelector';
import AddButton from '../components/AddButton';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      await addProduct(formData, token);

      setName('');
      setDescription('');
      setImage1('');
      setImage2('');
      setImage3('');
      setImage4('');
      setPrice('');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col w-full items-start gap-5'
    >
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <ImageUploader id='image1' image={image1} setImage={setImage1} />
          <ImageUploader id='image2' image={image2} setImage={setImage2} />
          <ImageUploader id='image3' image={image3} setImage={setImage3} />
          <ImageUploader id='image4' image={image4} setImage={setImage4} />
        </div>
      </div>

      <InputField
        label='Product name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Type here'
      />
      <div className='flex flex-col w-full'>
        <span className='mb-2'>Product description</span>
        <textarea
          className='w-full max-w-[500px] px-3 py-2'
          value={description}
          placeholder='Write content here'
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <SelectField
          label='Product category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={['Men', 'Women', 'Kids']}
        />
        <SelectField
          label='Sub category'
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          options={['Topwear', 'Bottomwear', 'Winterwear']}
        />
        <InputField
          label='Product Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type='number'
          placeholder='25'
        />
      </div>

      <SizeSelector sizes={sizes} setSizes={setSizes} />

      <div className='flex gap-2 mt-2'>
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type='checkbox'
          id='bestseller'
        />
        <label className='cursor-pointer' htmlFor='bestseller'>
          Add to bestseller
        </label>
      </div>

      <AddButton loading={loading} />
    </form>
  );
};

export default Add;
