import axios from 'axios'
import type { AxiosInstance } from 'axios'

// 定义响应数据的接口
interface ApiResponse<T> {
  data: T
  message: string
  status: number
}

// 创建新的 axios 实例，基础配置
const instance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8848/api/',
  timeout: 10000
})

export default instance
export type { ApiResponse }
