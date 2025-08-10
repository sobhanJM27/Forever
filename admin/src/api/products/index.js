import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';
import { Endpoints } from '../endpoints';

export const addProduct = async (formData, token) => {
  try {
    const response = await axios.post(
      backendUrl + Endpoints.addProduct,
      formData,
      {
        headers: { token },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const fetchList = async (setList) => {
  try {
    const response = await axios.get(backendUrl + Endpoints.listProducts);
    if (response.data.success) {
      setList(response.data.products);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const removeProduct = async (id, setList, token) => {
  try {
    const response = await axios.post(
      backendUrl + Endpoints.removeProduct,
      { id },
      { headers: { token } }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList(setList);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
