<template>
  <div class="com-container">
    <div class="com-chart" ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed, onBeforeUnmount } from 'vue'
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
const chartData = ref<SellerData[]>([])
const state = reactive({ currentPage: 1, pageSize: 5 })

const totalPage = computed(() =>
  Math.ceil(chartData.value.length / state.pageSize)
)

const initChart = () => {
  chartInstance.value = echarts.init(chart.value)
  //鼠标移动移除效果
  chartInstance.value.on('mouseover', () => {
    clearInterval(timer.value)
  })
  chartInstance.value.on('mouseout', () => {
    handleInterval()
  })
}

//获取数据

const getData = async () => {
  try {
    const res = await instance.get<SellerData[]>('/seller')
    chartData.value = res.data.sort((a, b) => a.value - b.value)
  } catch (error) {
    console.error('获取数据时出错:', error)
  }
  updated()
  handleInterval()
}

const updated = () => {
  const showDate = chartData.value.slice(
    (state.currentPage - 1) * state.pageSize,
    state.currentPage * state.pageSize
  )
  const sellers = showDate.map((item) => item.name)

  const values = showDate.map((item) => item.value)

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

//定时切换
const timer = ref<number | undefined>(undefined)

const handleInterval = () => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  timer.value = setInterval(() => {
    state.currentPage++
    if (state.currentPage > totalPage.value) state.currentPage = 1
    updated()
  }, 3000)
}

//清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value)
})

onMounted(() => {
  initChart()
  getData()
})
</script>

<style scoped>
/* 样式 */
</style>
