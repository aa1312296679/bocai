<template>
    <iScroll ref="isCroll" :contentOuter="iscrollOptions['contentOuter']" :probeType="iscrollOptions['probeType']" :listenScroll="iscrollOptions['isListen']" :contentInner="iscrollOptions['contentInner']" :scrollX="iscrollOptions['scrollX']">
        <div ref="content" :class="['content']" v-if="contentInfors.length">
            <template v-for="(item,index) in contentInfors">
                <div :class="[txtClasses,{contentAnimation:isContentAnimation}]" :key="index" :style="setTranslateX(index)">{{item['txt']}}</div>
            </template>
        </div>
    </iScroll>
</template>

<script>
    import iScroll from "components/iScroll";
    export default {
        name: "horseLamp",
        props:{
            contentInfors: { //所有内容滚动内容
                type: Array,
                default:() => []
            },
            txtClasses:{ //所有文字信息盒子的类名
                type: Array,
                default:()=>['content_txt'],
                validator(value){
                    return value.length&&value||!value.length&&['content_txt']
                }
            }
        },
        data(){
          return {
              isCroll:null,
              iscrollOptions: {
                  contentInner:['isCroll_inner'],
                  contentOuter:['isCroll_outer'],
                  probeType:2,
                  scrollX:true,
                  isListen:true
              },
              maxScrollX:0, //横向滚动最大滚动值
              curX:427, //当前的横向偏移值
              updateScrollXTimer:500, //更新x的缓冲
              isContentAnimation:false //content横向偏移的css3动画开关
          }
        },
        beforeCreated(){

        },
        mounted(){

            // 初始化滚动动画最大偏移值
            this.initialMaxScrollX(this.$refs.content.offsetWidth);
            this.updateScrollX();
            // this.updateScrollX();
            // console.log(this.getCurx)
            // console.log(this.updateScrollX)
        },
        components:{
            iScroll
        },
        methods:{
            /**获取iscroll对象**/
            iscrollHandle(iscroll){
                this.isCroll = iscroll;
                this.initialMaxScrollX(this.isCroll);
                this.updateScrollX();
            },
            /**
             * 初始化scrollX的最大滚动值
             * @param itemMax 内容盒子的最大宽
             * **/
            initialMaxScrollX(itemMax){
                this.maxScrollX = (itemMax-50);
            },
            /***
             * 更新scrollX的偏移值
             * **/
            updateScrollX() {
                if(!this.maxScrollX){
                    return false
                }

                if(this.curX>=this.maxScrollX){
                    this.isContentAnimation=false;
                    this.curX=0;
                    // this.isCroll.scrollTo(this.curIsCrollX,this.isCroll.y)
                }else {
                    this.isContentAnimation=true;
                    // 动态计算并更新iscroll的X偏移值
                    this.curX = this.curX+this.scrollX;
                    //处理滚动条的x偏移值
                    // this.isCroll.scrollTo(-this.curIsCrollX,this.isCroll.y,500,"elastic")
                }

                // console.log(this.curX);

                setTimeout(()=>{
                    this.updateScrollX();
                },this.updateScrollXTimer)
            },
            setTranslateX(index){
                return ((!index)&&{transform:`translateX(${this.getCurx})`})||(index&&{transform:"translateX(0px)"})
            }
        },
        computed:{
            /**每次递增的横向滚动x偏移值**/
            scrollX(){
                return ((!this.maxScrollX)&&0)||(this.maxScrollX*(5/100))
            },
            /**
             *横向广告的偏移值
             * **/
            getCurx(){
                return (!this.curX&&`${this.curX}px`)||(this.curX&&`-${this.curX}px`)
            }
        }
    }
</script>

<style lang="stylus" scoped>
.isCroll_outer,.isCroll_outer >>> .isCroll_inner
    width: 100vw
.isCroll_outer
    border 1px dashed red
    height 3.6rem
    position relative
    >>> .isCroll_inner
            position:absolute
            height:100%
            overflow-x:scroll
            overflow-y:hidden
            white-space: nowrap
            &::-webkit-scrollbar
                display: none
            .content
                height 100%
                display flex
                float: left //解决子元素宽度受flex影响，导致父元素宽不能自动增长问题
                .contentAnimation
                    transition ease transform 5s
                .content_txt
                    height 100%
</style>