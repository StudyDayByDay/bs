import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    xnxq: '2016-2016~1',
    kcdm: 'RJDH66',
    kcmc: '***',
    kclb: '***',
    xf: '*',
    pscj: '***',
    qmcj: '***',
    zpcj: '***',
    zzcj: '***',
    jd: '*'
  }))
}

export default [
  {
    url: '/vue-element-admin/grade/list',
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
