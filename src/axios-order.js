import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-acc5e-default-rtdb.firebaseio.com',
});

export default instance;
