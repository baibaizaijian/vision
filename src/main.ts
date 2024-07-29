import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

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
