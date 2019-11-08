<template>
    <div class="footer">
     <template v-for="(item,index) in footerInfors">
         <slot :index="index" :infor="item"></slot>
     </template>
    </div>
</template>

<script>
    export default {
        name: "f-footer",
        props: {
            footerInfors:{ //底部信息
                type:Array,
                default:function () {
                    return []
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
.footer
 border 1px solid green
 position fixed
 bottom 0
 width 100vw
 height:4.48rem
 display flex
 background #fff
 .ico
   width 1.6rem
   height 1.6rem
   display block
   border 1px dashed blue
 .txt
   width 1.84rem
   height 1.248rem
   border 1px dashed blue
   font-size 0.832rem
</style>