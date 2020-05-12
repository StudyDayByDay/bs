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
    },
    {
      path: 'text',
      name: 'Text',
      component: () => import('@/views/grade/text'),
      meta: { title: '代码草稿' }
    },
    {
      path: 'jtTbale',
      name: 'JtTable',
      component: () => import('@//views/grade/jtTable'),
      meta: { title: '江泰表格联系' }
    }
  ]
}

export default gradeRouter
