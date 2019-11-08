//公共文件
import { setLocalInfor } from "js/util"

export default {
  // 存储用户信息
  changeUser (state, user) {
    state.user = user;
    setLocalInfor([{ key: "user" }],[{infor:JSON.stringify(user)}]);
  },
  // 存储token信息
  changeToken (state, token) {
    state.token = token
    setLocalInfor([{ key: "token" }],[{infor:JSON.stringify(token)}]);
  },
  /**
   * 设置tab页的list信息
   * **/
   changeTabList(state,list){
      state.tabList=list
   },
  /**
   * 清除缓存信息
   * infors 所有需要清除的vuex的键名
   * **/
  cleanInfors(state,infors){
    infors.forEach(key=>{
      state[key] = "";
      localStorage.removeItem(key);
    })
  },
  /***
   * 存储底部信息
   */
  changeBottomInfors(state,infors){
    state.bottomInfors = infors;
  }
}
