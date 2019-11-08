<template>
    <div :class="contentOuter">
     <div :class="contentInner" ref="wrapper">
         <slot></slot>
     </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    var timer=null;
    export default {
        name: "list",
        props: {
            /**
             * 1 滚动的时候会派发scroll事件，会截流。
             * 2 滚动的时候实时派发scroll事件，不会截流。
             * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
             */
            probeType: {
                type: Number,
                default: 3
            },
            /**
             * 点击列表是否派发click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否开启横向滚动
             */
            scrollX: {
                type: Boolean,
                default: false
            },
            /**
             * 是否启用纵向滚动
             * **/
            scrollY:{
              type:Boolean,
              default:false
            },
            /**
             * 是否派发滚动事件
             */
            listenScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 列表的数据
             */
            data: {
                type: Array,
                default: null
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullup: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pulldown: {
                type: Boolean,
                default: false
            },
            /***
             * 是否派发横向靠左触碰边界
             */
             pullLeft:{
               type:Boolean,
               default:false
             },
             /**
             * 是否派发横向靠右触碰边界
             */
             pullRight:{
                type:Boolean,
                 default:false
             },
            /**
             * 是否派发列表滚动开始的事件
             */
            beforeScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 是否启用触摸离开监听
             **/
            touchEnd:{
                type:Boolean,
                default:false
            },
            /**
             * 当数据更新后，刷新scroll的延时。
             */
            refreshDelay: {
                type: Number,
                default: 20
            },
            /***
             * content_outer的类名
             * **/
            contentOuter:{
                type:Array,
                default() {
                    return ["content_outer"];
                },
                validator(data){
                    return data.length>0&&data||!data.length&&['content_outer']
                }
            },
            /***
             * content_inner的所有类名
             * **/
            contentInner:{
                type:Array,
                default(){
                 return ['content_inner']
                },
                validator(data){
                    return data.length>0&&data||!data.length&&['content_inner']
                }
            },
            /**
             * 是否获取内部的isCroll对象
             * **/
            isIsCroll:{
                type:Boolean,
                default:false
            }
        },
       mounted() {
            // 保证在DOM渲染完毕后初始化better-scroll
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        watch: {
          data(){
              timer=setTimeout(()=>{
                  clearTimeout(timer)
                  timer=null
                  this.refresh()
              },this.refreshDelay)
          }
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }

                // better-scroll的初始化
                this.scroll = new BScroll(this.$refs.wrapper, {
                    startX: 0,
                    probeType: this.probeType,
                    click: this.click,
                    scrollX: this.scrollX,
                    scrollY:this.scrollY
                })

                // 是否派发滚动事件
                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        this.$emit('scroll', pos)
                    })
                }

                if (this.pulldown||this.pullup||this.pullLeft||this.pullRight){
                    this.scroll.on('scrollEnd', (pos) => {
                        let posY=Math.abs(pos.y);
                        let posX=Math.abs(pos.x);
                        //下拉刷新
                        if(posY===0&&this.pulldown) {
                            this.$emit('pulldown')
                        // 上拉加载
                        }else if(this.pullup&&posY>=(this.scroll.maxScrollY - 50)){
                            this.$emit('scrollToEnd')
                        }else if(posX===0&&this.pullLeft) {
                            this.$emit("onScrollToLeft")
                        }else if(this.pullRight&&posX>=(this.scroll.maxScrollX - 50)){
                            this.$emit("onScrollToRight")
                        }
                    })
                }

                // 是否派发列表滚动开始的事件
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll')
                    })
                }

                // 是否启用触摸离开监听
                if(this.touchEnd){
                     this.scroll.on('touchEnd',(pos)=>{
                         this.$emit("touchEnd",pos)
                     })
                }

                //是否获取内部的iscroll对象
                if(this.isIsCroll){
                    this.$emit("onIscroll",this.scroll)
                }
            },
            // 代理better-scroll的disable方法
            disable() {
                this.scroll && this.scroll.disable()
            },
            // 代理better-scroll的enable方法
            enable() {
                this.scroll &&this.scroll.enable()
            },
            // 代理better-scroll的refresh方法
            refresh(){
                this.scroll &&this.scroll.refresh()
            },
            // 代理better-scroll的scrollTo方法
            scrollTo(){
                this.scroll &&this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            // 代理better-scroll的scrollToElement方法
            scrollToElement(){
                this.scroll &&this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        }
    }
</script>

<style lang="stylus" scoped>
.content_outer
  position relative;
  .content_inner //显示刷新动画的iscroll
     position:absolute;
     width:100%;
     border:1px dashed blue;
     height:100%;
     overflow: hidden;
     left: 0;
     top: 0;
</style>