<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <h1>{{ $route.params.bookId }}</h1>
      <!-- <h1>{{ $route.query.bookId }}</h1> -->
      <el-tag effect="plain" style="margin-bottom:16px;">搜索情况</el-tag>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="图书名称" />
        <el-table-column prop="number" label="图书编号" />
        <el-table-column prop="num" label="图书数量" />
        <el-table-column prop="status" label="是否借出">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '已借出' ? 'success' : ''" disable-transitions>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="详细位置" />
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { bookList } from '@/api/book'
export default {
  name: 'Borrow',
  data() {
    return {
      tableData: [
        // { name: '刻意练习1', number: 'ADF21', num: '1', status: '已借出', address: '图书馆二楼中文区48~49' },
        // { name: '刻意练习2', number: 'ADF21', num: '1', status: '未借出', address: '图书馆二楼中文区48~49' },
        // { name: '刻意练习3', number: 'ADF21', num: '1', status: '已借出', address: '图书馆二楼中文区48~49' },
        // { name: '刻意练习4', number: 'ADF21', num: '1', status: '未借出', address: '图书馆二楼中文区48~49' },
        // { name: '刻意练习5', number: 'ADF21', num: '1', status: '已借出', address: '图书馆二楼中文区48~49' }
      ]
    }
  },
  // watch: {
  //   '$route'(to, from) {
  //     // 在mounted函数执行的方法，放到该处
  //     alert('sdsdsd')
  //   }
  // },
  created() {
    bookList().then(response => {
      console.log('sjjjjjjjjjjjjj')
      this.tableData = response.data.items
    }).catch((e) => {})
  },
  methods: {

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
