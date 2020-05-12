import Mock from 'mockjs'

const List = []
const count = 5
const jtList = []

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
  jtList.push(Mock.mock({
    nf: '@date(yyyy)',
    qszdm: '@natural',
    qszmc: '@csentence',
    tjsj: '@date' + ' ' + '@time',
    shdw: '@cword(5, 7)',
    shyj: '@cword(5, 7)',
    zjnsl: '@natural(1, 30)',
    spnsl: '@natural(70, 100)'
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
  },
  {
    url: '/vue-element-admin/grade/jtList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: jtList.length,
          items: jtList
        }
      }
    }
  }
]
