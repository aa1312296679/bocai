<template>
    <div class="animation_wrapper">
        <div :class="['logo','iconfont',{up:loadingState===2},{loading:loadingState===1},{down:!loadingState}]">
            <!--文字三种状态 刷新中 释放刷新 -->
            <span class="txt">{{animationTxt}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "listHeader",
        props:{
          loadingState:{ //加载状态
              type:Number,
              default: 0
          }
        },
        data(){
          return {

          }
        },
        created() {
            console.log(this.animationTxt)
        },
        computed:{
            animationTxt(){
               return  !this.loadingState&&"上拉刷新"||this.loadingState===1&&"刷新中"||this.loadingState===2&&"释放刷新"
            }
        }
    }
</script>

<style lang="stylus" scoped>
@import "~common/stylus/colors"
.logo
   position relative
   padding-right  5.5rem
   .txt
      position absolute
      top 50%
      right 0
      transform: translateY(-50%)
      color  $list-header-logo-color
.up:before,.loading:before,.down:before
    color $list-header-logo-color
    font-size 2.56rem
/**向上提示的下拉动画和向下提示的下拉动画**/
.up:before,.down:before
  content "\e6e0"
  display block
  transition transform 1s
/**刷新中动画**/
.loading:before
  content "\e6e0"
.up:before
    transform rotate(180deg)
</style>