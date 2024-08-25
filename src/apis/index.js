import axios from "axios";

export const loginApi = (payload) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/login`, payload);
export const registerApi = (payload) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/register`, payload);
