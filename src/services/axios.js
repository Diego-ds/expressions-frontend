import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ec2-44-211-244-217.compute-1.amazonaws.com:8080/api/v1/',
});

export default instance;
