<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">搜索情况</el-tag>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="tsmc" label="图书名称" />
        <el-table-column prop="tsbh" label="图书编号" />
        <el-table-column prop="xq" label="校区" />
        <el-table-column prop="xxwz" label="详细位置" />
        <el-table-column prop="zt" label="是否借出">
          <template slot-scope="scope">
            <el-tag :type="scope.row.zt === '已借出' ? 'success' : ''" disable-transitions>{{ scope.row.zt }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Borrow',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    // 到时候在这里进行请求并把数据赋值
    console.log(this.$route.params.bookName)
    var vm = this
    axios.get('http://localhost:8080/book/getBooks', {
      params: {
        tsmc: vm.$route.params.bookName
      }
    }).then(res => {
      console.log(res)
      vm.tableData = res.data.Books
    }).catch(err => console.log(err))
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
