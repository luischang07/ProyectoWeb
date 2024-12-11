import axios from "axios";

export const ventasAPI = axios.create({
    baseURL: "http://localhost:3001/api/ventas"
});
