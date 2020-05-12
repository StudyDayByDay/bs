import request from '@/utils/request'

export function gradeList() {
  return request({
    url: '/vue-element-admin/grade/list',
    methods: 'get'
  })
}

export function jtList() {
  return request({
    url: '/vue-element-admin/grade/jtList',
    methods: 'get'
  })
}
