const BASE_URL = 'http://127.0.0.1:8000/v1';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  BASE: BASE_URL,
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
};
