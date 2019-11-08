import {debounce} from "js/util"
const time=500; //actions的缓冲时间

export default {
    actionsTabList({commit},list){
        debounce(()=>{
            commit('changeTabList',list)  //调用mutations的设置tablist的方法
        },time)()
    }
}
