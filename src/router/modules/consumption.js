import Layout from '@/layout'

const consumptionRouter = {
  path: '/consumption',
  component: Layout,
  redirect: '/consumption/report',
  alwaysShow: true,
  name: 'Consumption',
  meta: {
    title: '消费服务',
    icon: 'consumption'
  },
  children: [
    {
      path: 'report',
      component: () => import('@/views/consumerServices/report'),
      name: 'Report',
      meta: {
        title: '消费报告'
      }
    }
  ]
}

export default consumptionRouter
