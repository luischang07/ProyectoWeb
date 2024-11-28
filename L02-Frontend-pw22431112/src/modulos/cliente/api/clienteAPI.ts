import axios from "axios";
export const clienteAPI = axios.create({
    baseURL:"http://localhost:3001/api/clientes"
});
