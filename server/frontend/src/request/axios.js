import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333/api/v1",
});

export default api;
