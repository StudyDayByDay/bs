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
import { gradeList } from '@/api/grade'
export default {
  data() {
    return {
      xnxq: '',
      xnxqs: [{
        value: '2016-2017-1',
        label: '2016-2017-1'
      }, {
        value: '2016-2017-2',
        label: '2016-2017-2'
      }, {
        value: '2017-2018-1',
        label: '2017-2018-1'
      }, {
        value: '2017-2018-2',
        label: '2017-2018-2'
      }],
      tableData: [
        // { xnxq: '2018-2019 1', kcdm: 'RJ034B1', kcmc: '计算机网络', kclb: '专业基础', xf: '3', pscj: '80', qmcj: '64', zpcj: '69', zzcj: '69', jd: '1.9' },
        // { xnxq: '2018-2019 1', kcdm: 'MD009B1', kcmc: '形势与政策4', kclb: '公共', xf: '0.5', pscj: '85', qmcj: '83', zpcj: '84', zzcj: '84', jd: '3.4' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ042C1', kcmc: '嵌入式系统设计', kclb: '专业选修', xf: '2', pscj: '84', qmcj: '54', zpcj: '63', zzcj: '63', jd: '1.3' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ049C1', kcmc: '软件制造工程', kclb: '专业方向', xf: '2', pscj: '91', qmcj: '94', zpcj: '93', zzcj: '93', jd: '4.3' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ045B1', kcmc: '软件工程项目管理', kclb: '专业选修', xf: '2', pscj: '90', qmcj: '89', zpcj: '89', zzcj: '89', jd: '3.9' },
        // { xnxq: '2018-2019 1', kcdm: 'MD004A1', kcmc: '毛泽东思想和中国特色理论概论I', kclb: '公共', xf: '3', pscj: '94', qmcj: '64', zpcj: '79', zzcj: '79', jd: '2.9' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ064B1', kcmc: '专业前沿3', kclb: '专业基础', xf: '0.5', pscj: '80', qmcj: '80', zpcj: '80', zzcj: '80', jd: '3' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ010C1', kcmc: 'JavaEE轻量级架构', kclb: '专业选修', xf: '2', pscj: '94', qmcj: '82', zpcj: '86', zzcj: '86', jd: '3.6' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ054C1', kcmc: '数据库应用技术（Oracle）', kclb: '专业选修', xf: '2.5', pscj: '81', qmcj: '80', zpcj: '80', zzcj: '80', jd: '3' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ057B1', kcmc: '统一建模语言(UML)', kclb: '专业方向', xf: '2', pscj: '94', qmcj: '50', zpcj: '63', zzcj: '63', jd: '1.3' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ027E1', kcmc: '工程实践III（软件测试）', kclb: '实践教学', xf: '2', pscj: '87', qmcj: '87', zpcj: '87', zzcj: '87', jd: '3.7' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ007C1', kcmc: 'Hadoop体系与技术', kclb: '专业选修', xf: '2', pscj: '88', qmcj: '95', zpcj: '92', zzcj: '92', jd: '4.2' },
        // { xnxq: '2018-2019 1', kcdm: 'TY005H1', kcmc: '体育5', kclb: '公共', xf: '1', pscj: '92', qmcj: '98', zpcj: '95', zzcj: '95', jd: '4.5' },
        // { xnxq: '2018-2019 1', kcdm: 'RJ043C1', kcmc: '软件测试与质量保证', kclb: '专业方向', xf: '2', pscj: '79', qmcj: '69', zpcj: '72', zzcj: '72', jd: '2.2' }
      ]
    }
  },
  created() {
    // 这里要在后台请求数据过来
    gradeList().then(response => {
      console.log('sjjjjjjjjjjjjj')
      this.tableData = response.data.items
    }).catch((e) => {})
  },
  methods: {
    async getTableData(xn, xq) {
      // await const data = axios.post()
    },
    // 页面加载时需要拿到学年学期的数据
    // 在选项变换时，需要改变tableData的数据
    changeValue() {
      // 使用split把字符串分割传入函数进行取值
      alert(this.xnxq)
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
