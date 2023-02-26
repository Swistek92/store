import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:3001",
});

export default AxiosClient;
