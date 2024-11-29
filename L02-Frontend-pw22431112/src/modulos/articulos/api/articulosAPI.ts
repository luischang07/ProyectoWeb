import axios from "axios";

export const articulosAPI = axios.create({
    baseURL:"http://localhost:3001/api/articulos"
});
