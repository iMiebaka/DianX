import axios from "axios";
import { DEVICE_PRINT } from "../controllers";

const api = (url) =>
  axios.create({
    baseURL: `http://${url}/api/v1`,
    headers: {
      "Device-Type": DEVICE_PRINT,
      "Content-Type": "application/json",
    },
    timeout: 2000,
  });

export default api;
