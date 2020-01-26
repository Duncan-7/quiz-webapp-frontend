import axios from 'axios';

const JWTtoken = localStorage.getItem('token')

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'authorization': JWTtoken }
});

export default instance;