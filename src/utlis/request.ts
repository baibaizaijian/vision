import axios from 'axios'

// 1. 新axios实例，基础配置
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8848/api/',
  timeout: 10000
})

export default instance
