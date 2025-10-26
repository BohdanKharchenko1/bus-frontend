import axios from "axios";

export const baseUrl = axios.create({
    baseURL: "/api/server/curl/",
})

baseUrl.interceptors.request.use(function (config){
    config.data = {
        ...config.data,
        login: import.meta.env.VITE_LOGIN,
        password: import.meta.env.VITE_PASSWORD,
    }
    return config;
})
