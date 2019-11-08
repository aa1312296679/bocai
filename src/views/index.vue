<template>
  <div class="home">
    <h-header :title="headerTitle"/>
    <iScroll :listenScroll="iscrollOptions['listenScroll']" :contentInner="iscrollOptions['iScrollInnerClass']" :animationIsShow="iscrollOptions['showState']" :probeType="iscrollOptions['probeType']" :touchEnd="iscrollOptions['isTouchEnd']" :animationHideClass="this.iscrollOptions['iscrollClass']" :scrollY="this.iscrollOptions['scrollY']" @scroll="scrollHandle"  @touchEnd="touchHandle">
       <div class="content">
           <!--积分状态位下分时显示的头部模块-->
               <animation-header :loadingState="animationHeader['animationState']"></animation-header>
               <user :infor="userInfor" @onPointState="pointHandle"></user>
               <horseLamp :contentInfors="horseLampOptions['infors']" :txtClasses="horseLampOptions['classes']"></horseLamp>
                <!--tab导航-->
                <Tab v-show="pointsState" :list="tabList" :tabActive="tabActiveIndex" :options="tabOptions">
                   <template scope="infors">
                     <!--tab选项卡-->
                     <div @click="tabHandle(infors['index'])" :class="[{tab_item:infors['index']!==tabActiveIndex},{tab_active_item:infors['index']===tabActiveIndex}]" :key="`key${infors['index']}`">{{infors.tabInfor.tabName}}</div>
                   </template>
                </Tab>
            <!--tab页面-->
            <router-view/>
      </div>
    </iScroll>
    <!--底部信息-->
    <f-footer :footerInfors="bottomInfors">
      <template scope="infors">
        <!--底部按钮-->
        <footer-btn :infor="infors['infor']" :curIndex="infors['index']" :secletedIndex="footerActiveIndex" @onActiveIndex="upActiveIndex"></footer-btn>
      </template>
    </f-footer>
  </div>
</template>

<script>
// 首页的局部组件
import HHeader from "components/Header.vue";
import iScroll from "components/iScroll";
import FFooter from "components/footer/Footer";
import FooterBtn from  "components/footer/footerSlide";
import user from "components/user";
import horseLamp from "components/horseLamp";
import Tab from "components/tab/tab";
import animationHeader from "components/animation-header/animation-header";
// 底部信息
import footer from "common/mixins/footer";
//vuex辅助函数
import {mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: "index",
  mixins:[footer],
  data() {
    return {
       pointsState:true //上下分状态 true下分 false上分 默认位true
      ,horseLampOptions: {
            infors:[{txt:"滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字滚动文字",color:"orange"},{txt:"滚动文字",color:"orange"}],
            classes:['content_txt','add_content_txt']
      },
      iscrollOptions:{
          listenScroll:true,
          probeType:3,
          showState:false, //刷新动画动画显示状态 1.默认为false 2.刷新成功后为false 3.释放时动画文字为上拉刷新提示时为false  1.刷新中为true 2.滚动条滑动>0时为true
          isTouchEnd:true, //是否监听iscroll模块的手指离开
          iScrollInnerClass:["hide_content_inner"], //刷新动画显示或隐藏时的类名 刷新状态为中时使用默认样式，刷新状态为其他状态时使用隐藏刷新动画的样式
          scrollY:true
      },
      animationHeader:{ //头部动画
          animationState:0 //动画状态 0提示上拉刷新状态 1刷新中状态 2手指释放时的刷新状态
      },
      tabActiveIndex: 0, //已选中的tab索引
      footerActiveIndex: 0, //已选中的底部索引
      headerTitle: "彩票名称",
      tabList: [{tabName:"彩票",children:[{img:"",txt:"文字"},{img:"",txt:"文字"}]},{tabName:"快三",children:[{img:"",txt:"快三"}]}],
      tabOptions: {
            underLinePer:80, //下划线百分比
            isUnderLine:true, //是否开启下划线
            isUnderLineAmimation:true //下划线动画是否开启
      }
    }
  },
  async activated() {
      this.tabHandle(0);
      //如果vuex中的底部信息不存在则初始化底部信息
      (this.bottomInfors.length===0)&&(await this.initialBottomInfors());
  },
  watch:{
      animationHeader:{ //监听头部动画状态码
          handler(newValue){
              // 更新刷新动画的显示状态的状态码
              (newValue.animationState!==1)?(this['iscrollOptions']['iScrollInnerClass']=["hide_content_inner"]):(this['iscrollOptions']['iScrollInnerClass']=["content_inner"]);
          },
          deep:true //启用深度监听
      }
  },
  methods: {
    upActiveIndex(index){
      if(index===this.selectedIndex){
        return false
      }
      //跳转至其他tabbar页面
      this.$router.push({path:this.footerItems[index].routerPath})
    },
    /**
     * 退出登录
     **/
    loginOut(){
      //清除用户登录信息
      this.cleanUser(['user','token']);
    },
    ...mapMutations({
      cleanUser: 'cleanInfors' //清除用户登录信息
    }),
    ...mapActions({
       setTabList:'actionsTabList'
    }),
    tabHandle(index){
      // 更新被选中的tab索引
      this.tabActiveIndex=index;
      // 设置被选中的tab对应的tabList信息
      this.setTabList(this.tabList[this.tabActiveIndex].children)
    },
      /**
       * 滚动监听
       * @param pos滚动条坐标
       * **/
     scrollHandle(pos){
         // 已处于刷新状态时限制不执行下拉状态监听
         if( this['animationHeader']['animationState']===1){
             return false
         }
         // 更新下拉提示动画状态的状态码
         (pos.y>=117)&&this.setAnimationState(2)||(pos.y>=0&&pos.y<117)&&this.setAnimationState(0)
     },
     /**
      * 屏幕释放
      * **/
     touchHandle(){
         if(this['animationHeader']['animationState']===2){
             this.setAnimationState(1)
         }
     },
     /**
      * 设置动画状态
      * 动画state 状态码0下拉刷新提示 1下拉刷新提示 2
      * **/
     setAnimationState(state){
          this['animationHeader']['animationState']=state;
     },
      pointHandle(pointState){
          (pointState==="up")&&(this.pointsState=false)||(pointState==="down")&&(this.pointsState=true);
          if(pointState==="up"){
              this.$router.push({path:"/recharge"});
              return false
          }
          this.$router.push({path:"/index"});
         // console.log(pointState);
      }
  },
  computed:{
    ...mapGetters({ //用户信息
      userInfor: 'getUser',
      token: 'getToken'
    })
  },
  components: {
    HHeader,
    iScroll,
    FFooter,
    FooterBtn,
    user,
    Tab,
    animationHeader,
    horseLamp
  }
};
</script>

<style lang="stylus" scoped>
@import "~common/stylus/colors"
.content_outer //设置弹性滚动盒子的外层盒子的宽高
  height:85vh
  width:100vw
  @media screen and (min-device-height: 812px)
    height:87.5vh
  @media screen and (min-device-height: 1024px)
    height 90vh
  >>> .hide_content_inner //不显示刷新动画的iscroll
      width 100%
      position absolute
      top -7.2rem
      height 100%
.tab
  .tab_item,.tab_active_item
      display flex
      flex 1
      height 4rem
      background $tab-item-bg-color
      justify-content center
      align-items center
      font-size 1.12rem
      font-weight 700
      position relative
  .tab_item
      color $tab-item-color
  .tab_active_item
      color $tab-item-active-color
.animation_wrapper
    width 100%
    display flex
    justify-content center
    align-items center
    height 7.2rem
.animation_wrapper >>> .logo
      height auto
      font-size 1.28rem
      font-weight bold
      color orangered
/**footerBtn的图标**/
.footer_btn >>> .index
  &:before
    content: "\e615"
.footer_btn >>> .member
  &:before
    content: "\e65c"
.footer_btn >>> .customer_service
  &:before
    content: "\e665"
.footer_btn >>> .about_me
  &:before
    content: "\e634"
>>> .isCroll_outer .isCroll_inner .add_content_txt
    color red
    display flex
    justify-content center
    align-items center
</style>