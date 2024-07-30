import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import './assets/css/golbal.less'
//请求基地址
axios.defaults.baseURL = 'http://127.0.0.1:8848/api/'

// 引入echarts
import echarts from '@/myEcharts/echarts'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 挂载到vue实例中 vue3
app.config.globalProperties.$echarts = echarts

app.use(createPinia())
app.use(router)

app.mount('#app')
