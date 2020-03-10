<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">近一个月消费</el-tag>
      <line-chart :chart-data="lineChartData" @monthList="panelGroup" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">近一个月消费TOP10</el-tag>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="money" label="消费金额" />
        <el-table-column prop="type" label="消费类型" />
        <el-table-column prop="date" label="消费时间" />
      </el-table>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">近一年消费</el-tag>
      <nice-chart :chart-data="chart" @yearList="niceChartList" />
    </el-row>
    <el-dialog title="详情" :visible.sync="oneLineVisible">
      <el-table :data="oneLineData">
        <el-table-column property="type" label="消费类型" />
        <el-table-column property="money" label="消费金额" />
        <el-table-column property="date" label="消费时间" />
      </el-table>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="twoLineVisible">
      <el-table :data="twoLineData">
        <el-table-column property="type" label="类型" />
        <el-table-column property="money" label="金额" />
        <el-table-column property="date" label="时间" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import NiceChart from './components/NiceChart'

const lineChartData = {
  education: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11']
  },
  diet: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11']
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11']
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11']
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    NiceChart
  },
  data() {
    return {
      lineChartData: lineChartData.education,
      tableData: [{
        date: '2016-05-02',
        money: '193',
        type: '教育'
      }, {
        date: '2016-05-04',
        money: '153',
        type: '充值'
      }, {
        date: '2016-05-01',
        money: '129',
        type: '购物'
      }, {
        date: '2016-05-03',
        money: '110',
        type: '饮食'
      }],
      chart: {
        // consumeData, rechargeData, dateData
        consumeData: [80, 100, 121, 104, 105, 90, 100],
        rechargeData: [130, 140, 141, 142, 145, 150, 160],
        dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11']
      },
      type: '',
      oneLineVisible: false,
      twoLineVisible: false,
      oneLineData: [{
        date: '2016-05-02',
        money: '193',
        type: '教育'
      }, {
        date: '2016-05-04',
        money: '153',
        type: '充值'
      }, {
        date: '2016-05-01',
        money: '129',
        type: '购物'
      }, {
        date: '2016-05-03',
        money: '110',
        type: '饮食'
      }],
      twoLineData: [{
        date: '2016-05-02',
        money: '193',
        type: '教育'
      }, {
        date: '2016-05-04',
        money: '153',
        type: '充值'
      }, {
        date: '2016-05-01',
        money: '129',
        type: '购物'
      }, {
        date: '2016-05-03',
        money: '110',
        type: '饮食'
      }]
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
      this.type = type
    },
    // 获取点击第一个图表时的日期
    panelGroup(value) {
      // this.type用于第一个图表传进去类型
      // alert(value)
      this.oneLineVisible = true
    },
    // // 获取点击第二个图表时的日期、类型
    niceChartList(value) {
      // alert(value.time + value.type)
      this.twoLineVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
