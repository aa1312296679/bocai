<template>
    <div ref="tab" class="tab">
        <slot v-for="(item,index) in list" :index="index" :tabInfor="item"></slot>
        <span v-if="options.isUnderLine" :style="[{width:`${underLineWidth}%`},{left:`${left}%`}]" :class="['underline',{underlineAnimation:options.isUnderLineAmimation}]"></span>
    </div>
</template>

<script>
import {getWidthPercentage,getTabWidth} from "./js/tab"
export default {
    name: "tab",
    props:{
    list:{ //tab信息
         type: Array,
         default(){
             return []
         }
     },
     tabActive:{ //已选中的tab索引
         type:Number,
         default: 0
     },
     options:{
        type:Object,
         default() {
             return {
                 underLinePer:80, //下划线百分比
                 isUnderLine:true, //是否开启下划线
                 isUnderLineAmimation:true //下划线动画是否开启
             };
         },
         validator(value){
            if(value.underLinePer>=100){ //限制百分比
                value.underLinePer=100
            }
            return value
         }
     }
   },
    data(){
        return {
            tabMaxWidth:0, //tab导航最大宽
            underLineWidth:0, //下划线宽度
            underLineLeft:0, //下划线的默认左边距
            maxPer:100 //最大百分比
        }
    },
   mounted(){
         // 初始化下划线宽度
         this.initialWitdh();
         // 初始化下划线默认left
         this.initialLeft();
   },
    methods:{
        /**初始化下划线宽度**/
        initialWitdh(){
            // 初始化tab最大宽
            this.tabMaxWidth=this.$refs.tab.offsetWidth;
            let widthPercentage=(this.options.underLinePer/this.maxPer);
            //tab-item的下划线宽度的像素值
            let underLineWidth=Math.round(getTabWidth(this.tabMaxWidth,this.list.length)*widthPercentage);
            //tab-item的下划线宽转号为百分比
            this.underLineWidth=getWidthPercentage(underLineWidth,this.tabMaxWidth);
        },
        /**初始化下划线默认left**/
        initialLeft(){
           // tab-item宽度
           let itemWidth = getTabWidth(this.tabMaxWidth,this.list.length);
           // tab-item宽度百分比
           let widthPercentage=((this.maxPer-this.options.underLinePer)/2/this.maxPer);
           // tab-item的left像素值
           let tabLeft=(widthPercentage*itemWidth);
           // tab-item的left转换为百分比
           this.underLineLeft=getWidthPercentage(tabLeft,this.tabMaxWidth);
      }
    },
    computed:{
        left(){
            let left=this.underLineLeft;
            if(!this.tabActive){ //选中项为默认第一项
                return left
            }
            // 计算基于元素索引需要偏移的像素值
           let tabWidth =getTabWidth(this.tabMaxWidth,this.list.length)*this.tabActive;
           return (getWidthPercentage(tabWidth,this.tabMaxWidth)+left)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/colors"
.tab
    display flex
    width 100%
    position relative
    .underline
        display block
        position absolute
        height .2rem
        background $tab-item-active-color
        bottom 0
        z-index 99
    .underlineAnimation
        transition left 0.5s
</style>