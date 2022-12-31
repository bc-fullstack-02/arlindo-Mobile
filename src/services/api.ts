import axios from 'axios';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default axios.create({
  baseURL: "http:// 192.168.1.254:4000/v1"   
});