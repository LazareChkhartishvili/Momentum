import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    Authorization: `Bearer 9e7c5a1b-bfff-4529-ae5d-be8045b1de17`,
  },
});

export default axiosInstance;
