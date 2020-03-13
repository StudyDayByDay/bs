import Layout from '@/layout'

const bookRouter = {
  path: '/book',
  component: Layout,
  redirect: '/book/report',
  name: 'Book',
  alwaysShow: true,
  meta: {
    title: '借阅服务',
    icon: 'book'
  },
  children: [
    {
      path: 'report',
      component: () => import('@/views/book/report'),
      name: 'Report',
      meta: { title: '借阅报告' }
    }
  ]
}

export default bookRouter
