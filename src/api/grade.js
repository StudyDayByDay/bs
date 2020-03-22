import request from '@/utils/request'

export function gradeList() {
  return request({
    url: '/vue-element-admin/grade/list',
    methods: 'get'
  })
}
