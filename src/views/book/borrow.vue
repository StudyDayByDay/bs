<template>
  <div style="margin-top: 15px;">
    <el-input v-model="input" placeholder="请输入内容" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" />
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    border-radius: 30px;
    width: 200px
  }
</style>
