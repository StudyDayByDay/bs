<template>
  <div class="dashboard-editor-container">

    <panel-group :sum-value="sumValue" @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">近一个月消费</el-tag>
      <line-chart :chart-data="lineChartData" @monthList="panelGroup" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">近一个月消费TOP10</el-tag>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="transactionAmount" label="消费金额" />
        <el-table-column prop="transactionType" label="消费类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.transactionType === 'shoppings'">购物</el-tag>
            <el-tag v-else-if="scope.row.transactionType === 'purchases'" type="success">充值</el-tag>
            <el-tag v-else-if="scope.row.transactionType === 'education'" type="warning">教育</el-tag>
            <el-tag v-else type="danger">饮食</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="transactionDate" label="消费时间" />
      </el-table>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">近一年消费</el-tag>
      <nice-chart :chart-data="chart" @yearList="niceChartList" />
    </el-row>

    <div class="float-button">
      <el-button type="primary" icon="el-icon-edit" circle @click="balanceTableVisible = true">余额</el-button><br>
      <el-button type="success" icon="el-icon-check" circle>充值</el-button>
    </div>

    <!-- 余额嵌套表格 -->
    <el-dialog title="余额" :visible.sync="balanceTableVisible">
      <el-table :data="balanceData">
        <el-table-column property="type" label="类型" />
        <el-table-column property="balance" label="余额" />
      </el-table>
    </el-dialog>
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
    <!-- TODO:少了充值处理 -->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import NiceChart from './components/NiceChart'
import axios from 'axios'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    NiceChart
  },
  data() {
    return {
      totalLineData: null,
      lineChartData: null,
      balanceTableVisible: false,
      tableData: [],
      sumValue: null,
      balanceData: [{
        type: '余额',
        balance: '193'
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
  created() {
    this.initData()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.totalLineData[type]
      // 应该在这个函数里面把type传到图表里面去并且把lineChartData数据更新
      this.type = type
    },
    // 获取点击第一个图表时的日期
    panelGroup(value) {
      // this.type用于第一个图表传进去类型
      // alert(value)
      this.oneLineVisible = true
      // 利用这里的type和传过来的日期去axios求得数据
    },
    // // 获取点击第二个图表时的日期、类型
    niceChartList(value) {
      // alert(value.time + value.type)
      this.twoLineVisible = true
    },
    initData() {
      var vm = this
      // 试一下并发请求
      axios.all([this.getLineData(), this.getTopTenData()]).then(axios.spread(function(acct, perms) {
        console.log(acct)
        console.log(perms)
        vm.tableData = perms.data.top10
        vm.sumValue = acct.data.sumValue
        vm.totalLineData = acct.data.typeMap
        vm.lineChartData = vm.totalLineData.education
      }))
    },
    getLineData() {
      return axios.get('http://localhost:8080/card/transactions/selectMonth')
    },
    getTopTenData() {
      return axios.get('http://localhost:8080/card/transactions/getTop10')
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

.float-button {
position: fixed;
bottom: 50px;
right: 50px;
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
