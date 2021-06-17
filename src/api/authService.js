import API from '@api/routes';
import axios from 'axios';
const fetchLogin = (body) => {
  return axios.post(API.LOGIN, body, {
    headers: { 'Content-Type': 'application/json' },
  });
};

const fetchRegister = (body) => {
  return axios.post(API.REGISTER, body, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export { fetchLogin, fetchRegister };
