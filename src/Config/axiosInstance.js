import axios from "axios";

const API = axios.create({
  baseURL: "https://3609-119-82-89-105.ngrok.io/api/v1",
});

export default API;
