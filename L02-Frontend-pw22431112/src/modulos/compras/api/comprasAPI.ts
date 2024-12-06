import axios from "axios";
export const comprasAPI = axios.create({
    baseURL:"http://localhost:3001/api/compras"
});
