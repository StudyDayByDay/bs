<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetTableChartData="handleSetTableChartData" />

    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">当月借阅详情</el-tag>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="图书名称" />
        <el-table-column prop="number" label="图书编号" />
        <el-table-column prop="borrowTime" label="借阅时间" />
        <el-table-column prop="returnTime" label="归还时间" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '已归还' ? 'success' : 'danger'" disable-transitions>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="yqqk" label="逾期情况">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status === '已归还'" :type="scope.row.yqqk === '未逾期' ? 'success' : 'danger'" disable-transitions>{{ scope.row.yqqk }}</el-tag>
            <el-tag v-show="scope.row.status === '已归还'" :type="scope.row.yqqk === '未逾期' ? 'success' : 'danger'" disable-transitions>{{ scope.row.je }}</el-tag>
            <el-button type="primary" size="mini" :disabled="scope.row.yqqk === '未逾期' || scope.row.status === '未归还'" @click="payment(scope.$index, scope.row)">缴费</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">近一年借阅情况</el-tag>
      <line-chart :chart-data="lineChartData" @yearList="popUp" />
    </el-row>
    <el-dialog title="详情" :visible.sync="oneLineVisible">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="图书名称" />
        <el-table-column prop="number" label="图书编号" />
        <el-table-column prop="borrowTime" label="借阅时间" />
        <el-table-column prop="returnTime" label="归还时间" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '已归还' ? 'success' : 'danger'" disable-transitions>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import axios from 'axios'

export default {
  name: 'BookReport',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      tableData: null,
      dialog: null,
      nodeTableData: null,
      totalTableData: {
        borrowed: [
          { name: '白夜行1', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还', yqqk: '逾期', je: 1.7 },
          { name: '白夜行2', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还', yqqk: '未逾期', je: 0 },
          { name: '白夜行3', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还', yqqk: '逾期', je: 1.9 },
          { name: '白夜行4', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '未归还', yqqk: '', je: 0 },
          { name: '白夜行5', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '未归还', yqqk: '', je: 0 }
        ],
        returned: [
          { name: '白夜行1', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还', yqqk: '逾期', je: 1.7 },
          { name: '白夜行2', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还', yqqk: '未逾期', je: 0 },
          { name: '白夜行3', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还', yqqk: '逾期', je: 1.9 }
        ],
        notReturned: [
          { name: '白夜行4', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '未归还', yqqk: '', je: 0 },
          { name: '白夜行5', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '未归还', yqqk: '', je: 0 }
        ]
      },
      oneLineVisible: false,
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11'] }
    }
  },
  created() {
    this.tableData = this.totalTableData.borrowed
    // 获取初始化数据
    // this.initTableData()
  },
  methods: {
    // 这个地方是请求去获取table里面的数据
    initTableData() {
      axios.get('').then(function(response) {
        // 这里要把PanelGroup的数字传过去
        this.totalTableData = response.data.shuju
      })
    },
    // 这个是获取节点数据的请求方法，与下面的popup是一个意思，到时候实际操作时，把popup里的内容移植过来
    getNodeTable(month) {
      // this.oneLineVisible = true
      axios.get('', {
        params: {
          month: month
        }}).then(function(response) {
        // 将请求来的数据赋值给
        // this.nodeTableData = response.data.**
        console.log('sdsdsd')
      })
    },
    handleSetTableChartData(type) {
      if (type !== 'jumpRouter') {
        this.tableData = this.totalTableData[type]
      } else {
        this.$prompt('请输入查询的书名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\u4e00-\u9fa5]/,
          inputErrorMessage: '书名格式不正确'
        }).then(({ value }) => {
          // this.$router.push({ path: '/book/borrow', query: { bookId: value }})
          // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中path不能和params一起使用，否则params将无效。需要用name来指定页面。
          this.$router.push({ name: 'Borrow', params: { bookName: value }})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }
    },
    // 这里到时候做一个linechart的mock，把数据请求进来
    popUp(month) {
    //   alert(month)
      this.oneLineVisible = true
    },
    // 缴费处理
    payment(index, row) {
      this.$confirm('确定进行支付？', '支付', {
        confirmButtonText: '确定支付',
        cancelButtonText: '取消支付',
        type: 'success'
      }).then(() => {
        if (this.getUserAmount() > row.je) {
          this.$message({
            type: 'success',
            message: '支付成功!'
          })
          // FIXME: 这里处理完成之后要把数据写入到数据库，同时，要重新请求data数据
        }
        // FIXME：到时候直接取出该用户的余额进行判断：若大于扣除费用就直接扣；若不是，则弹出框提示余额多少+余额不足请先充值然后跳转到充值界面
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消支付'
        })
      })
    },
    // 取出用户余额处理
    getUserAmount() {
      return 11
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

