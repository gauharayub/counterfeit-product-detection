import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000"
})

axiosInstance.interceptors.request.use(function (config) {
    config.withCredentials = true
    return config
}, function (error) {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function (response) {
    return response

}, function (error) {
    console.log("interceptor", error, error.response);
    // if ((error.response && error.response.status === 401 && error.response.data && error.response.data.message === "You are not logged in.") && localStorage.getItem('x-api-key')) {
    //     window.location = "/login"
    // }
    // if (error.response && error.response.status === 403) {
    //     if (error.response.headers["x-api-key"]) {
    //         setKey(error.response.headers["x-api-key"])
    //         window.location = window.location
    //     }
    // }
    //500 series
    return Promise.reject(error)
})

export default axiosInstance
export { delKey }