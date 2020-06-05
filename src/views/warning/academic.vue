<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-select v-model="xy" clearable placeholder="请选择学院">
        <el-option v-for="item in xys" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="xn" clearable placeholder="请选择学年">
        <el-option v-for="item in xns" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="xq" clearable placeholder="请选择学期">
        <el-option v-for="item in xqs" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" round @click="serach()">查询</el-button>
      <el-table :data="tableData" stripe style="width: 100%" @cell-click="taxTable">
        <el-table-column prop="xm" label="姓名" />
        <el-table-column prop="xh" label="学号">
          <template slot-scope="scope">
            <el-link type="primary">{{ scope.row.xh }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="nj" label="年级" />
        <el-table-column prop="xy" label="学院" />
        <el-table-column prop="zy" label="专业" />
        <el-table-column prop="yjsm" label="预警数目">
          <!-- FIXME：预警科目要用红色 -->
          <template slot-scope="scope">
            <el-link type="primary">{{ scope.row.yjsm }}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 这是学生信息弹出框 -->
    <el-dialog title="学生信息" :visible.sync="personVisible" width="45%">
      <person-message :table-data="personData" :table-style="{ width:'800px' }" />
    </el-dialog>
    <!-- FIXME:这里要给出班级选择 -->
    <!-- 这是课程详情弹出框 -->
    <el-dialog title="学生信息" :visible.sync="gradeVisible">
      <el-table :data="gradeData" border style="width: 100%">
        <el-table-column prop="kmmc" label="科目名称" />
        <el-table-column prop="xf" label="学分" />
        <el-table-column prop="rkls" label="任课老师" />
        <el-table-column prop="kcsj" label="课程时间" />
        <el-table-column prop="zt" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.zt === '挂科'">{{ scope.row.zt }}</el-tag>
            <el-tag v-else-if="scope.row.zt === '待补考'" type="warning">{{ scope.row.zt }}</el-tag>
            <el-tag v-else type="danger">{{ scope.row.zt }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import PersonMessage from '@/components/personMessage/index'
import axios from 'axios'
export default {
  name: 'Academic',
  components: {
    PersonMessage
  },
  data() {
    return {
      personVisible: false,
      gradeVisible: false,
      xq: '',
      xn: '',
      xy: '',
      xns: [{
        value: '2016',
        label: '2016'
      }, {
        value: '2017',
        label: '2017'
      }, {
        value: '2018',
        label: '2018'
      }, {
        value: '2019',
        label: '2019'
      }],
      xqs: [{
        value: '1',
        label: '第一学期'
      }, {
        value: '2',
        label: '第二学期'
      }],
      xys: [{
        value: '软件工程',
        label: '软件工程学院'
      }, {
        value: '计算机',
        label: '计算机学院'
      }, {
        value: '外国语',
        label: '外国语学院'
      }, {
        value: '会计',
        label: '会计学院'
      }],
      tableData: [],
      /*
      ,
        { kmmc: '《电子信息技术》', xf: '2', rkls: '李思静', kcsj: '2017~2018学年第二学期', zt: '待补考' },
        { kmmc: '《商务英语》', xf: '1', rkls: '王文丽', kcsj: '2018~2019学年第一学期', zt: '重修' }
      */
      gradeData: [
        { kmmc: '《大气研究》', xf: '3', rkls: '张孝全', kcsj: '2016~2017学年第一学期', zt: '挂科' }
      ],
      personData: [
        { key: '姓名', value: '' },
        { key: '学号', value: '' },
        { key: '班级', value: '' },
        { key: '专业', value: '' },
        { key: '学院', value: '' },
        { key: '类别', value: '' },
        { key: '入学年月', value: '' },
        { key: '联系电话', value: '' }
      ]
    }
  },
  created() {
    this.initData('软件工程', '2016', '1')
  },
  methods: {
    initData(xy, xn, xq) {
      var vm = this
      axios.get('http://localhost:8080/gradeWarning/returnTableData', {
        params: {
          xy: xy,
          xn: xn,
          xq: xq
        }
      })
        .then(function(response) {
          vm.tableData = response.data.tableData
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    serach() {
      console.log('asdjkasj')
      this.initData(this.xy, this.xn, this.xq)
    },
    taxTable(row, column, event, cell) {
      var vm = this
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
      } else if (column.property === 'yjsm') {
        this.gradeVisible = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
