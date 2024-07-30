<template>
  <div class="com-container">
    <div
      class="com-chart"
      ref="chart"
      style="width: 600px; height: 400px"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { defineComponent } from 'vue'
import * as echarts from 'echarts'

defineComponent({
  name: 'SellerComponent'
})

const chart = ref(null)

onMounted(() => {
  const chartInstance = echarts.init(chart.value)
  chartInstance.setOption({
    title: {
      text: 'ECharts 示例图表'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  })
})
</script>

<style scoped>
/* 样式 */
</style>
