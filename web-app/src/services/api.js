import axios from "axios";

const api = axios.create({
  //baseURL: 'http://localhost:3000/', // local server
  baseURL: "https://snacks-mkunnen.vitalsoftware.com.py", // production server
});

export default api;
