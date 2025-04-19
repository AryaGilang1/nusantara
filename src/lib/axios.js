import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://103.31.39.176:1000",
})

export const axiosInstance2 = axios.create({
    baseURL: "http://localhost:3000", // API kedua
});