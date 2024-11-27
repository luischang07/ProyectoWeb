import axios from "axios";

export const personalAPI = axios.create({
    baseURL:"http://localhost:3001/api/personal"
});
