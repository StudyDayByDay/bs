import layout from '@/layout'

const gradeRouter = {
  path: '/grade',
  name: 'Grade',
  redirect: '/grade/details',
  alwaysShow: true,
  component: layout,
  meta: {
    title: '成绩服务',
    icon: 'grade'
  },
  children: [
    {
      path: 'details',
      name: 'Details',
      component: () => import('@/views/grade/details'),
      meta: { title: '成绩详情' }
    }
  ]
}

export default gradeRouter
