import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';
import { Endpoints } from '../endpoints';

export const getAllOrders = async (setOrders, token) => {
  if (!token) {
    return null;
  }

  try {
    const response = await axios.post(
      backendUrl + Endpoints.listOrder,
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setOrders(response.data.orders.reverse());
    } else {
      toast(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const status = async (event, orderId, setOrders, token) => {
  try {
    const response = await axios.post(
      backendUrl + Endpoints.status,
      {
        orderId,
        status: event.target.value,
      },
      { headers: { token } }
    );
    if (response.data.success) {
      await getAllOrders(setOrders, token);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
