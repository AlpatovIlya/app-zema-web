import axios from 'axios';

const api = axios.create({
  baseURL: 'http://serverzema.info/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// ApiAxios.interceptors.request.use(
//     function(config) {
//     // Do something before request is sent
//       console.log(config);
//       return config;
//     },
//     function(error) {
//     // Do something with request error
//       return Promise.reject(error);
//     },
// );

// ApiAxios.interceptors.response.use(
//     function(response) {
//       console.log(response);
//       return response;
//     },
//     function(error) {
//       return Promise.reject(error);
//     },
// );

export {api};
