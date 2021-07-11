import axios from "axios";

const instance = axios.create();
let token = localStorage.getItem("token") || sessionStorage.getItem("token");

instance.interceptors.request.use(function (config) {
    config.headers.Authorization =  token ? `Token ${token}` : '';
    config.headers.common["Accept"] = "application/json";
    config.headers.post["Content-Type"] = "application/json";
    return config;
});

instance.interceptors.response.use(response => {
        if(response.config.url === "/api/v1/login/" && response.data.token)
            token = response.data.token;
        else if(response.config.url === "/api/v1/logout/")
            token = '';
        return response;
    }
);

export default instance;
