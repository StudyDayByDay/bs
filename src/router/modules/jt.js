import layout from '@/layout'

const jtRouter = {
  path: '/jt',
  name: 'JT',
  redirect: '/jt/table',
  alwaysShow: true,
  component: layout,
  meta: {
    title: '江泰考核期练习',
    icon: 'technology'
  },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/jt/jtTable2'),
      meta: { title: '江泰表格练习' }
    },
    {
      path: 'echarts',
      name: 'Echarts',
      component: () => import('@/views/jt/jtEcharts'),
      meta: { title: '江泰Echarts练习' }
    }
  ]
}

export default jtRouter
