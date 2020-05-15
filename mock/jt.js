import Mock from 'mockjs'

const dayList = []
const dayCount = 5

for (let i = 0; i < dayCount; i++) {
  dayList.push(Mock.mock({
    bf: '@date(yyyy)'
  }))
}

export default [
  {
    url: '/vue-element-admin/grade/jtList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: dayList.length,
          items: dayList
        }
      }
    }
  }
]
