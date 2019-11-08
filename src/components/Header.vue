<template>
  <div class="header">
    <h1>{{title}}</h1>
    <div class="logo iconfont"></div>
  </div>
</template>

<script>
export default {
  name: "h-header",
  props: {
    title: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "~common/stylus/colors"
.header
  width 100%
  border 1px dashed cornflowerblue
  line-height 3.52rem
  background $header-bg-color
  display flex
  justify-content center
  position relative
  z-index 10
  h1
    color $header-font-color
    font-size 1.6rem
    font-weight 700
  .logo
    width 3.36rem
    height 100%
    position absolute
    right 0
    display flex
    justify-content center
    align-items center
    &:before
      content: "\e641"
      width 80%
      height 80%
      color $header-logo-color
      display flex
      justify-content center
      align-items center
      font-size 2.5296rem
</style>
