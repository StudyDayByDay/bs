import request from '@/utils/request'

export function bookList(bookName) {
  return request({
    url: '/vue-element-admin/book/list',
    methods: 'get',
    params: { bookName }
  })
}
