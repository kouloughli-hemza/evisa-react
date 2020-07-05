import axios from 'axios';

const evisaAxios = axios.create({
    //baseURL : 'https://app.caravane2.com/api/',
    baseURL : 'http://127.0.0.1/Caravane/B2B/api/',
});
evisaAxios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
export default evisaAxios;
