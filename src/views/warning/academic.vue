<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-select v-model="xy" clearable placeholder="请选择学院" @change="changeXy">
        <el-option v-for="item in xys" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="xnxq" clearable placeholder="请选择学年学期" @change="changeXq">
        <el-option v-for="item in xnxqs" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
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
export default {
  name: 'Academic',
  components: {
    PersonMessage
  },
  data() {
    return {
      personVisible: false,
      gradeVisible: false,
      xnxq: '',
      xy: '',
      xnxqs: [{
        value: '第一学期',
        label: '2016-2017~1'
      }, {
        value: '第二学期',
        label: '2016-2017~2'
      }, {
        value: '第三学期',
        label: '2017-2018~1'
      }, {
        value: '第四学期',
        label: '2017-2018~2'
      }],
      xys: [{
        value: '软件工程学院',
        label: '软件工程学院'
      }, {
        value: '计算机学院',
        label: '计算机学院'
      }, {
        value: '外国语学院',
        label: '外国语学院'
      }, {
        value: '会计学院',
        label: '会计学院'
      }],
      tableData: [
        { xm: '***', xh: '***', nj: '***', xy: '***', zy: '***', yjsm: '3' },
        { xm: '***', xh: '***', nj: '***', xy: '***', zy: '***', yjsm: '3' },
        { xm: '***', xh: '***', nj: '***', xy: '***', zy: '***', yjsm: '3' },
        { xm: '***', xh: '***', nj: '***', xy: '***', zy: '***', yjsm: '3' },
        { xm: '***', xh: '***', nj: '***', xy: '***', zy: '***', yjsm: '3' }
      ],
      gradeData: [
        { kmmc: '***', xf: '***', rkls: '***', kcsj: '***', zt: '挂科' },
        { kmmc: '***', xf: '***', rkls: '***', kcsj: '***', zt: '待补考' },
        { kmmc: '***', xf: '***', rkls: '***', kcsj: '***', zt: '重修' },
        { kmmc: '***', xf: '***', rkls: '***', kcsj: '***', zt: '重修' },
        { kmmc: '***', xf: '***', rkls: '***', kcsj: '***', zt: '重修' }
      ],
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
    // 页面加载时需要拿到学年学期的数据
    // 在选项变换时，需要改变tableData的数据
    changeXq() {
      alert(this.xnxq)
    },
    changeXy() {
      alert(this.xnxq)
    },
    taxTable(row, column, event, cell) {
      if (column.property === 'xh') {
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
