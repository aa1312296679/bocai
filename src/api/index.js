import { get,post } from './helpers'
// 定义多个数据接口的请求函数
const postTest = post('/test')
const getTest = get('/test')
//底部信息请求接口
const getBottomInfors=get('/footerInfors')

export {
  postTest,
  getTest,
  getBottomInfors
}
