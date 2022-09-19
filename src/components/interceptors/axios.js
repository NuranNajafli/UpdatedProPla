import axios from 'axios'


axios.defaults.baseURL = 'http://10.1.4.64:85/api/'
axios.defaults.headers.common['Authorization']=`bearer ${localStorage?.token}`


export default axios