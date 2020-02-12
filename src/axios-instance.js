import axios from 'axios';

const JWTtoken = localStorage.getItem('token')

const instance = axios.create({
  baseURL: 'https://salty-harbor-93115.herokuapp.com/',
  headers: { 'authorization': JWTtoken }
});

//local server url
// baseURL: 'http://localhost:3000/',

export default instance;