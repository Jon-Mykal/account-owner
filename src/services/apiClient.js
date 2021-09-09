import axios from "axios";
import { interceptorsInit } from "./http.interceptors";


const baseURL = process.env.VUE_APP_API_ENDPOINT

const api = axios.create({ baseURL});
api = interceptorsInit(api);

export default api;

