<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-select v-model="xnxq" clearable placeholder="请选择学年学期" @change="changeValue">
        <el-option v-for="item in xnxqs" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <!-- FIXME：在表格内要有对于学分的总计 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="xnxq" label="学年学期" />
        <el-table-column prop="kcdm" label="课程代码" />
        <el-table-column prop="kcmc" label="课程名称" />
        <el-table-column prop="kclb" label="课程类别" />
        <el-table-column prop="xf" label="学分" />
        <el-table-column prop="pscj" label="平时成绩" />
        <el-table-column prop="qmcj" label="期末成绩" />
        <el-table-column prop="zpcj" label="总评成绩" />
        <el-table-column prop="zzcj" label="最终成绩" />
        <el-table-column prop="jd" label="绩点" />
      </el-table>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      xnxq: '',
      xnxqs: [{
        value: '2016-2017~1',
        label: '2016-2017~1'
      }, {
        value: '2016-2017~2',
        label: '2016-2017~2'
      }, {
        value: '2017-2018~1',
        label: '2017-2018~1'
      }, {
        value: '2017-2018~2',
        label: '2017-2018~2'
      }],
      tableData: []
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    getInitData(xnxq) {
      var vm = this
      axios.get('http://localhost:8080/grade/selectbydate', {
        params: {
          date: xnxq
        }
      }).then(res => {
        console.log('sdsdas', res)
        vm.tableData = res.data.lists
      }).catch(err => {
        console.log(err)
      })
    },
    changeValue(value) {
      this.getInitData(value)
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
