<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetTableChartData="handleSetTableChartData" />

    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">当月预警情况</el-tag>
      <el-table :data="tableData" border style="width: 100%" @cell-click="personMessage">
        <el-table-column prop="xm" label="姓名" />
        <el-table-column prop="xh" label="学号" />
        <el-table-column prop="xy" label="学院" />
        <el-table-column prop="zy" label="专业" />
        <el-table-column prop="lxdh" label="联系电话" />
        <el-table-column prop="yjsj" label="预警时间" />
        <el-table-column prop="jcyjsj" label="解除预警时间" />
        <el-table-column prop="yjzt" label="预警状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.yjzt === '已解除' ? 'success' : 'danger'" disable-transitions>{{ scope.row.yjzt }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" :disabled="scope.row.yjzt === '已解除'" @click="handleEdit(scope.$index, scope.row)">解除预警</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">当月预警波动</el-tag>
      <line-chart :chart-data="lineChartData" @yearList="popUp" />
    </el-row>
    <!-- 这是详情弹出框 -->
    <el-dialog title="详情" :visible.sync="oneLineVisible">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="xm" label="姓名" />
        <el-table-column prop="xh" label="学号" />
        <el-table-column prop="xy" label="学院" />
        <el-table-column prop="zy" label="专业" />
        <el-table-column prop="lxdh" label="联系电话" />
        <el-table-column prop="yjsj" label="预警时间" />
        <el-table-column prop="jcyjsj" label="解除预警时间" />
        <el-table-column prop="yjzt" label="预警状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.yjzt === '已解除' ? 'success' : 'danger'" disable-transitions>{{ scope.row.yjzt }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" :disabled="scope.row.yjzt === '已解除'" @click="handleEdit(scope.$index, scope.row)">解除预警</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 这是学生信息弹出框 -->
    <el-dialog title="学生信息" :visible.sync="personVisible" width="45%">
      <person-message :table-data="personData" :table-style="{ width:'800px' }" />
    </el-dialog>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PersonMessage from '@/components/personMessage/index'

const tableData = {
  // 数据的话，就在页面初始化的时候都请求进来，然后再点击，获取日期来加载
  todayNew: [
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' }
  ],
  monthLost: [
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '已解除' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '已解除' }
  ],
  MonthOk: [
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '已解除' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '已解除' }
  ],
  MonthStill: [
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' },
    { xm: '***', xh: '***', xy: '***', zy: '***', lxdh: '***', yjsj: '***', jcyjsj: '***', yjzt: '预警中' }
  ]
}

export default {
  name: 'Student',
  components: {
    PanelGroup,
    LineChart,
    PersonMessage
  },
  data() {
    return {
      tableData: tableData.todayNew,
      oneLineVisible: false,
      personVisible: false,
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11'] },
      personData: [
        { key: '姓名', value: '李鲲' },
        { key: '学号', value: '2016081098' },
        { key: '班级', value: '软工163班' },
        { key: '专业', value: '软件工程' },
        { key: '学院', value: '软件工程' },
        { key: '类别', value: '本科' },
        { key: '入学年月', value: '2016-09' },
        { key: '入学年级', value: '2016' },
        { key: '学制', value: '4' },
        { key: '宿舍', value: '4-3028' },
        { key: '联系电话', value: '18708392376' },
        { key: '辅导员', value: '梁淑真' }
      ]
    }
  },
  methods: {
    // TODO:要写柱状图
    // TODO:要写弹出框
    handleSetTableChartData(type) {
      this.tableData = tableData[type]
    },
    // 这里到时候做一个linechart的mock，把数据请求进来
    popUp(month) {
    //   alert(month)
      this.oneLineVisible = true
    },
    personMessage(row, column, event, cell) {
      if (column.property === 'xh') {
        this.personVisible = true
      }
      console.log(row)
      console.log(column)
      console.log(event)
      console.log(cell)
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

