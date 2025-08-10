import axios from 'axios';
import { backendUrl } from '../../App';
import { Endpoints } from '../endpoints';
import { toast } from 'react-toastify';

export const login = async (email, password, setToken) => {
  try {
    const response = await axios.post(backendUrl + Endpoints.login, {
      email,
      password,
    });
    if (response.data.success) {
      setToken(response.data.token);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
