<template>
  <table v-if="s_showByRow" class="mailTable" :style="styleObject">
    <tr v-for="index in rowCount" :key="index">
      <td class="column">{{ tableData[index*4-4].key }}</td>
      <td>{{ tableData[index*4-4].value }}</td>
      <td class="column">{{ tableData[index*4-3] !== undefined ? tableData[index*4-3].key : '' }}</td>
      <td>{{ tableData[index*4-3] !== undefined ? tableData[index*4-3].value : '' }}</td>
      <td class="column">{{ tableData[index*4-2] !== undefined ? tableData[index*4-2].key : '' }}</td>
      <td>{{ tableData[index*4-2] !== undefined ? tableData[index*4-2].value : '' }}</td>
      <td class="column">{{ tableData[index*4-1] !== undefined ? tableData[index*4-1].key : '' }}</td>
      <td>{{ tableData[index*4-1] !== undefined ? tableData[index*4-1].value : '' }}</td>
    </tr>
  </table>
  <table v-else class="mailTable" :style="styleObject">
    <tr v-for="index in rowCount" :key="index">
      <td class="column">{{ tableData[index-1].key }}</td>
      <td>{{ tableData[index-1].value }}</td>
      <td class="column">{{ tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].key : '' }}</td>
      <td>{{ tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : '' }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    tableStyle: {
      type: Object,
      default: null
    },
    showByRow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      styleObject: {},
      s_showByRow: true
    }
  },

  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length / 4)
    }
  },
  created() {
    this.styleObject = this.tableStyle
    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow
    }
  }
}
</script>
<style>
.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }
.mailTable{ font-size: 12px; color: #71787E; }
.mailTable tr td{ border:1px solid #E6EAEE; width: 200px; height: 35px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }
.mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
</style>
