import layout from '@/layout'

const warningRouter = {
  path: '/warning',
  name: 'Warning',
  component: layout,
  redirect: '/warning/student',
  meta: {
    title: '预警服务',
    icon: 'warning'
  },
  children: [
    {
      path: 'student',
      name: 'Student',
      component: () => import('@/views/warning/student'),
      meta: { title: '失联预警' }
    },
    {
      path: 'dormitory',
      name: 'Dormitory',
      component: () => import('@/views/warning/dormitory'),
      meta: { title: '宿舍预警' }
    },
    {
      path: 'academic',
      name: 'Academic',
      component: () => import('@/views/warning/academic'),
      meta: { title: '学业预警' }
    }
  ]
}

export default warningRouter
