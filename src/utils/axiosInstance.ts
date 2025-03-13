import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
