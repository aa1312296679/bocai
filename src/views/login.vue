<template>
  <div class="login">
    登录页面
  </div>
</template>
<script>
//vuex辅助函数
import {mapMutations} from 'vuex'
export default {
  name: "login",
  created(){
    //测试方法 设置登录信息
    this.setUser({name:"秦乙",imgSrc:"/img/userInfor_test_one.jpg",balance:1.77})
    this.setToken("testToken")
    // console.log(localStorage)
  },
  methods: {
    ...mapMutations({
      setUser: 'changeUser',
      setToken: 'changeToken'
    })
  }
}
</script>