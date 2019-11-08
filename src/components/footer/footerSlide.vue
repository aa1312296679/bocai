<template>
    <div :class="['footer_btn',{selected_footer_btn:setAtiveIndex}]" @click="getCurIndex">
        <div :class="['ico','iconfont',infor.ico]"></div>
        <div class="txt"><span>{{infor.txt}}</span></div>
    </div>
</template>

<script>
    export default {
        name: "footerBtn",
        props: {
            curIndex: Number, //当前底部索引
            secletedIndex: Number, //被选中的底部索引
            infor: Object // 底部文字
        },
        created() {

        },
        computed:{
            // 设置被选中的底部样式
            setAtiveIndex () {
              return this.secletedIndex===this.curIndex
            }
        },
        methods:{
            getCurIndex() {
                this.$emit("onActiveIndex",this.curIndex);
            }
        }
    }
</script>

<style lang="stylus" scoped>
.footer_btn,.footer_btn .ico,.footer_btn .txt,.footer_btn .ico:before
    display flex
    flex-direction column
    justify-content center
    align-items center
.selected_footer_btn .txt,.selected_footer_btn .ico:before
    color orange
.footer_btn
    flex 1
    .txt,.ico
      width 2rem
    .ico
      height 2rem
      &:before
        font-size 1.608rem
        width 80%
        height 80%
    .txt
      height 1.28rem
      font-size .816rem
</style>