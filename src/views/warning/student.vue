<template>
  <div class="dashboard-editor-container">
    <!-- FIXME：最上面要加一个学院的分级框 -->
    <panel-group :sum-value="sumValue" @handleSetTableChartData="handleSetTableChartData" />

    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">当月预警情况</el-tag>
      <el-table :data="tableData" border style="width: 100%" @cell-click="personMessage">
        <el-table-column prop="xm" label="姓名" />
        <el-table-column prop="xh" label="学号">
          <template slot-scope="scope">
            <el-link type="primary">{{ scope.row.xh }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="xy" label="学院" />
        <el-table-column prop="zy" label="专业" />
        <el-table-column prop="yjsj" label="预警时间" />
        <el-table-column prop="jcyjsj" label="解除预警时间" />
        <el-table-column prop="yjzt" label="预警状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.jcyjsj === 'none'" type="danger">未解除</el-tag>
            <el-tag v-else type="success">已解除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" :disabled="scope.row.jcyjsj != 'none'" @click="handleEdit(scope.$index, scope.row)">解除预警</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">当月预警波动</el-tag>
      <line-chart :chart-data="lineChartData" @yearList="popUp" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">当月各学院预警情况</el-tag>
      <div class="chart-wrapper">
        <bar-chart :bar-data="barData" />
      </div>
    </el-row>

    <!-- 这是详情弹出框 -->
    <el-dialog title="详情" :visible.sync="oneLineVisible">
      <el-table :data="detailsData" border style="width: 100%" @cell-click="personMessage">
        <el-table-column prop="xm" label="姓名" />
        <el-table-column prop="xh" label="学号">
          <template slot-scope="scope">
            <el-link type="primary">{{ scope.row.xh }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="xy" label="学院" />
        <el-table-column prop="zy" label="专业" />
        <el-table-column prop="yjsj" label="预警时间" />
        <el-table-column prop="jcyjsj" label="解除预警时间" />
        <el-table-column prop="yjzt" label="预警状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.jcyjsj === 'none'" type="danger">未解除</el-tag>
            <el-tag v-else type="success">已解除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" :disabled="scope.row.jcyjsj != 'none'" @click="handleEdit(scope.$index, scope.row)">解除预警</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- FIXME：有必要把照片加上 -->
    <!-- 这是学生信息弹出框 -->
    <el-dialog title="学生信息" :visible.sync="personVisible" width="45%">
      <person-message :table-data="personData" :table-style="{ width:'800px' }" />
    </el-dialog>
    <!-- 这是解除预警弹出框 -->
    <el-dialog title="解除预警" :visible.sync="removeVisible">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="被处理学生姓名" prop="xm">
          <el-input v-model="form.xsxm" readonly />
        </el-form-item>
        <el-form-item label="被处理学生学号" prop="xm">
          <el-input v-model="form.xsxh" readonly />
        </el-form-item>
        <el-form-item label="执行人姓名" prop="xm">
          <el-input v-model="form.xm" />
        </el-form-item>
        <el-form-item label="执行人工号" prop="gh">
          <el-input v-model="form.gh" />
        </el-form-item>
        <el-form-item label="解除预警原由" prop="yy">
          <el-input v-model="form.yy" type="textarea" />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-col :span="11">
            <el-form-item prop="sj">
              <!-- value-format="yyyy-MM-dd HH:mm:ss" -->
              <el-date-picker v-model="form.sj" type="datetime" placeholder="选择日期时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="removeHandle('form')">立即解除</el-button>
          <el-button @click="removeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- FIXME：还是尽量把学生详情加个图片 -->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PersonMessage from '@/components/personMessage/index'
import BarChart from './components/BarChart'
import axios from 'axios'

export default {
  name: 'Student',
  components: {
    PanelGroup,
    LineChart,
    PersonMessage,
    BarChart
  },
  data() {
    return {
      sumValue: null,
      totalData: { dayNewWarning: [], mothWarning: [], monthLiftWarning: [], monthNotLiftWarning: [] },
      tableData: null,
      detailsData: [],
      oneLineVisible: false,
      personVisible: false,
      removeVisible: false,
      // 存储当前预警id
      warningID: 0,
      lineChartData: {
        expectedData: [],
        dateData: [] },
      personData: [
        { key: '姓名', value: '' },
        { key: '学号', value: '' },
        { key: '班级', value: '' },
        { key: '专业', value: '' },
        { key: '学院', value: '' },
        { key: '类别', value: '' },
        { key: '入学年月', value: '' },
        { key: '联系电话', value: '' }
      ],
      form: {
        xsxm: '',
        xsxh: '',
        xm: '',
        gh: '',
        yy: '',
        sj: ''
      },
      feedBackRecords: {
        attendanceWarningsId: '',
        feedbackTime: '',
        createdBy: '',
        createdUserId: '',
        createdAt: '',
        description: '',
        type: ''
      },
      barData: {
        departmentData: [],
        warningData: [],
        removeData: []
      }
    }
  },
  created() {
    axios.defaults.timeout = 15000
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.defaults.withCredentials = true
    this.getInitialData()
  },
  methods: {
    // 请求初始数据
    getInitialData() {
      var vm = this
      axios.get('http://localhost:8080/lost/getData').then(function(response) {
        console.log(response)
        vm.sumValue = response.data.sumValue
        vm.totalData.dayNewWarning = response.data.dayNewWarning
        vm.totalData.mothWarning = response.data.mothWarning
        vm.totalData.monthLiftWarning = response.data.monthLiftWarning
        vm.totalData.monthNotLiftWarning = response.data.monthNotLiftWarning
        vm.tableData = response.data.dayNewWarning
        vm.lineChartHandle(response.data.lineChart)
        vm.histogramDataHandle(response.data.histogramData)
      })
    },
    // 折线图数据处理
    lineChartHandle(data) {
      this.lineChartData.expectedData = []
      this.lineChartData.dateData = []
      for (var j = 0, len = data.length; j < len; j++) {
        this.lineChartData.expectedData.push(data[j].yjs)
        this.lineChartData.dateData.push(data[j].sj)
      }
    },
    // 柱状图数据处理
    histogramDataHandle(data) {
      this.barData.departmentData = []
      this.barData.warningData = []
      this.barData.removeData = []
      for (var j = 0, len = data.length; j < len; j++) {
        this.barData.departmentData.push(data[j].xy)
        this.barData.warningData.push(data[j].yjs)
        this.barData.removeData.push(data[j].jcyjs)
      }
    },
    handleSetTableChartData(type) {
      this.tableData = this.totalData[type]
    },
    // 详情框数据
    popUp(month) {
      console.log(this.totalData.mothWarning)
      this.detailsData = []
      for (var j = 0, len = this.totalData.mothWarning.length; j < len; j++) {
        if (this.totalData.mothWarning[j].yjsj === month) {
          console.log('skdjsjkdhjh')
          this.detailsData.push(this.totalData.mothWarning[j])
        }
      }
      this.oneLineVisible = true
    },
    personMessage(row, column, event, cell) {
      var vm = this
      console.log(row)
      if (column.property === 'xh') {
        axios.get('http://localhost:8080/lost/getPortrait', {
          params: {
            xh: row.xh
          }
        })
          .then(function(response) {
            vm.personData[0].value = response.data.student.xm
            vm.personData[1].value = response.data.student.xh
            vm.personData[2].value = response.data.student.bjdm
            vm.personData[3].value = response.data.student.zydm
            vm.personData[4].value = response.data.student.yxdm
            vm.personData[5].value = response.data.student.xslb
            vm.personData[6].value = response.data.student.rxny
            vm.personData[7].value = response.data.student.dh
          })
          .catch(function(error) {
            console.log(error)
          })
        this.personVisible = true
      }
      // console.log(row)
      // console.log(column)
      // console.log(event)
      // console.log(cell)
    },
    // 解除预警操作方法
    handleEdit(index, row) {
      this.form.xsxm = row.xm
      this.form.xsxh = row.xh
      this.form.xm = ''
      this.form.gh = ''
      this.form.yy = ''
      this.form.sj = ''
      this.warningID = row.id
      this.removeVisible = true
    },
    // 提交表单
    removeHandle(formName) {
      var vm = this
      this.$confirm('确认解除预警吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.feedBackRecords.attendanceWarningsId = this.warningID
        this.feedBackRecords.feedbackTime = this.form.sj
        this.feedBackRecords.createdBy = this.form.xm
        this.feedBackRecords.createdUserId = this.form.gh
        this.feedBackRecords.createdAt = this.form.sj
        this.feedBackRecords.description = this.form.yy
        this.feedBackRecords.type = 'lost'
        axios.post('http://localhost:8080/lost/liftWarning', this.feedBackRecords)
          .then((res) => { return res })
          .catch((err) => { return err })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        vm.getInitialData()
        this.removeVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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

