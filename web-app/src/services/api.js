import axios from "axios";

const api = axios.create({
  //baseURL: 'http://localhost:3000/', // local server
  baseURL: "https://snacks.mkunnen.dynv6.net/", // production server
});

export default api;
