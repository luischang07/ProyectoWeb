import axios from "axios";

export const registrosAPI = axios.create({
    baseURL:"http://localhost:3001/api/registros"
});
