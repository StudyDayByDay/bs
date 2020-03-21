import Layout from '@/layout'

const siteRouter = {
  name: 'Site',
  path: '/site',
  redirect: '/site/siteList',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '场地服务',
    icon: 'site'
  },
  children: [
    {
      path: 'siteList',
      name: 'SiteList',
      component: () => import('@/views/site/siteList'),
      meta: { title: '场地列表' }
    }
  ]
}

export default siteRouter
