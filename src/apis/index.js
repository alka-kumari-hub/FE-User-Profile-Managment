import axios from "axios";

export const loginApi = (payload) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/login`, payload);
export const registerApi = (payload) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/register`, payload);
export const getUserApi = (token) =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateProfileApi = (data, token) =>
  axios.patch(`${process.env.REACT_APP_BASE_URL}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
