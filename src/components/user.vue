<template>
    <div class="user_infor">
        <!--用户头像-->
        <div class="user_ico">
            <img :src="infor['imgSrc']"/>
        </div>
        <!--用户信息-->
        <div class="user_content">
            <div><span>{{infor['name']}}</span></div>
            <div><span @click="pointHandle('up')">上分</span><span @click="pointHandle('down')">下分</span><span>余额   {{infor['balance']}}</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user",
        props: {
            infor:{
                type:Object,
                default:function () {
                  return {}
                }
            }
        },
        methods:{
            /**
             * 积分点击处理
             * @method pointHandle
             * @param pointState 积分状态
             */
            pointHandle(pointState){
                this.$emit("onPointState",pointState);
            }
        }
    }
</script>

<style lang="stylus" scoped>
@import "~common/stylus/colors"
.user_infor  .user_ico,.user_infor  .user_content
  height 3.6rem
.user_infor,.user_infor .user_content div,.user_infor .user_content div span
  display flex
.user_infor
  background $userInfor-bg-color
  .user_ico
    width 3.6rem
    border-radius 50%
    margin 0 .75rem
    overflow hidden
    background gainsboro
    img
      display block
      width 100%
      height 100%
  .user_content
    flex 1
    div
     height 50%
     justify-content flex-start
     span
       justify-content center
       align-items center
       font-weight bold
     &:nth-child(2)
       span
         border-radius 30%
         margin-right 1.2rem
</style>