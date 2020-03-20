import Layout from '@/layout'

const bookRouter = {
  path: '/book',
  component: Layout,
  alwaysShow: true,
  redirect: '/book/bookReport',
  name: 'Book',
  meta: {
    title: '借阅服务',
    icon: 'book'
  },
  children: [
    {
      path: 'bookReport',
      component: () => import('@/views/book/bookReport'),
      name: 'BookReport',
      meta: { title: '借阅报告' }
    },
    {
      path: 'borrow',
      component: () => import('@/views/book/borrow'),
      hidden: true,
      name: 'Borrow',
      meta: { title: '书籍搜索' }
    }
  ]
}

export default bookRouter
