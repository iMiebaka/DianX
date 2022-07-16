import axios from "axios";
import { DEVICE_PRINT } from "../components/controllers";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333/api/v1",
  headers: {
    "Device-Type": DEVICE_PRINT,
    "Content-Type": "application/json",
  },
});

export default api;
