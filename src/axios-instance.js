import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://salty-harbor-93115.herokuapp.com/'
});

//local server url
// baseURL: 'http://localhost:3000/',
// heroku url: 'https://salty-harbor-93115.herokuapp.com/'

export default instance;