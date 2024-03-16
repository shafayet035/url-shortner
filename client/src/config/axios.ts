import { API_URL } from '@/constants';
import axios from 'axios';

const Axios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;
