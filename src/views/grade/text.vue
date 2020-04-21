<template>
  <div id="award">
    <el-button type="success" @click="axiosTry()">成功按钮</el-button>
    <el-input v-model="input" placeholder="请输入内容" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      message: '',
      firstName: 'kun',
      lastName: 'li',
      i: 1

    }
  },
  created() {
    console.log(this.i++)
    console.log(this.i)
  },
  methods: {
    axiosTry() {
      // axios.get('http://localhost:8080/book/pageBooks?pn=1&ps=10').then(function(response) {
      //   console.log(response)
      // })
      const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      const promise2 = promise1.then(res => {
        // 返回一个Promise对象
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('这里返回一个Promise')
          }, 2000)
        })
      })
      promise2.then(res => {
        console.log(res)
      })
    }
  }

}
</script>

<style>
#award {
  position: absolute;
  top: 30px;
  left: 365px;

  -webkit-animation: move 10s infinite alternate;
  animation: move 10s infinite alternate;
  }

@-webkit-keyframes move {
  0% {left: 30px;}
  100% {right:60px;}
}
@keyframes move {
  0% {left: 30px;}
  100% {right:60px;}
}
</style>
