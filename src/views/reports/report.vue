<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card class="box-card">
        <div id="main" style="width: 750px;height:400px;" ref="echart"></div>
      </el-card>
  </div>
</template>

<script>
import { getReport } from 'network/report'
import echarts from 'echarts'
import _ from 'lodash'
export default {
  name: 'report',
  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      reportData: null
    }
  },
   created() {
  },
  async mounted() {
    let res = await getReport()
    if(res) {
      this.reportData = res.data.result
    }
    var myChart = echarts.init(this.$refs.echart);
    const result =  _.merge(this.options,this.reportData)
    myChart.setOption(result);
  }
}
</script>

<style scoped>
</style>