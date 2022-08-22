import axios from "axios";

const API = axios.create({
  baseURL: "https://7360-150-242-67-42.ngrok.io/api/v1",
});

export default API;
