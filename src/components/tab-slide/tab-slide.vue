<template>
    <div class="tab_slide_wrapper">
        <template v-for="(item,index) in list">
            <div class="tab_slide_item" :key="`tabSlide${index}`">
                <div class="img_wrapper">
                    <img src="">
                </div>
                <span class="txt">{{item.txt}}</span>
            </div>
        </template>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "tab-slide",
        computed:{
            ...mapGetters({ //列表信息
                list: 'getTabList'
            })
        }
    }
</script>

<style lang="stylus" scoped>
.tab_slide_wrapper,.tab_slide_item  .img_wrapper,.tab_slide_item .txt
    display flex
    justify-content center
    align-items center
.tab_slide_wrapper
    flex-wrap: wrap;
.tab_slide_item
    width 33.333%
    height 9.9516rem
    border 1px dashed blue
    @media screen and (min-device-width: 768px)
     width 25%
     height 13.9516rem
    .img_wrapper
        width 100%
        height 80%
        background orange
        img
            border 1px dashed greenyellow
            width 80%
            height 80%
            display block
    .txt
        border 1px dashed blue
        width 100%
        font-size 1.12rem
</style>