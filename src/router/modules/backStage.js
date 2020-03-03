import Layout from '@/layout'

const backStageRouter = {
  path: '/backStage',
  component: Layout,
  redirect: '/backStage/business',
  name: 'BackStage',
  meta: {
    title: '后台管理',
    icon: 'backStage'
  },
  children: [
    {
      path: 'business',
      component: () => import('@/views/backStage/business'),
      name: 'Business',
      meta: { title: '商家管理' }
    },
    {
      path: 'site',
      component: () => import('@/views/backStage/site'),
      name: 'Site',
      meta: { title: '场地管理' }
    }
  ]
}

export default backStageRouter
