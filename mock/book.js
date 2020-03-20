import Mock from 'mockjs'

const List = []
const count = 5
// eslint-disable-next-line no-undef
Mock.Random.extend({
  bookName: function(date) {
    var bookNames = ['白夜行', '刻意练习', '金字塔原理', '相信自己', '我能做到', '处女座']
    return this.pick(bookNames)
  },
  status: function() {
    var zt = ['已借出', '未借出']
    return this.pick(zt)
  }
})

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@bookName',
    number: '@natural',
    num: '1',
    status: '@status',
    address: '@county(true)'
  }))
}

export default [
  {
    url: '/vue-element-admin/book/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  }
]
