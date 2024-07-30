<template>
  <div class="com-container">
    <div class="com-chart" ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { defineComponent } from 'vue'
import instance from '@/utils/request'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'

// 定义图表数据的类型

interface SellerData {
  name: string
  value: number
}
defineComponent({
  name: 'SellerComponent'
})

// 引用 DOM 元素
const chart = ref<HTMLElement | null>(null)

// 引用 ECharts 实例
const chartInstance = ref<ECharts | null>(null)

const initChart = () => {
  chartInstance.value = echarts.init(chart.value)
}

//获取数据
const chartData = ref<SellerData[]>([])
const getData = async () => {
  try {
    const res = await instance.get<SellerData[]>('/seller')
    chartData.value = res.data // 提取数据
  } catch (error) {
    console.error('获取数据时出错:', error)
  }

  updated()
}

const updated = () => {
  const sellers = chartData.value.map((item) => item.name)

  const values = chartData.value.map((item) => item.value)

  const option = {
    title: {
      text: '▎商家销售统计'
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: sellers
    },
    series: [
      {
        type: 'bar',
        data: values
      }
    ]
  }
  chartInstance.value?.setOption(option)
}
onMounted(() => {
  initChart()
  getData()
})
</script>

<style scoped>
/* 样式 */
</style>
