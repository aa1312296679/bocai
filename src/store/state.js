//公共文件
import {getInfor} from "js/util"

//用户信息
let defaultUser;
//token信息
let defaultToken;
//tabList信息
let defaultTabSlideList;
//底部信息
let bottomInfors=[];

try {
  //初始化缓存数据
  defaultUser = JSON.parse(JSON.parse(getInfor(localStorage,'user')));
  defaultToken = getInfor(localStorage,'token');
} catch (e) {
  console.log(e)
}

export default {
  user: defaultUser,
  token: defaultToken,
  tabList:defaultTabSlideList,
  bottomInfors
}
