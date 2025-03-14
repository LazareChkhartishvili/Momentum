import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer 9e6cb393-4dcc-40ae-bae5-6376c42411e6`,
  },
});

export default axiosInstance;
