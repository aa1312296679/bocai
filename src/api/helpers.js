import axios from 'axios'
// 请求状态
const ERR_OK = 0

/**
 * get请求
 * @param url 请求地址
 * @param params 请求参数
 * **/
export function get(url) {
  return function(params = {}) {
    return axios.get(url, {
      params
    }).then((res) => {
      const {errno, data} = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e) => {
      console.log(e)
    })
  }
}

/**
 * post请求
 * @param url 请求地址
 * @param params 请求参数
 * **/
export function post(url) {
  return function(params = {}) {
    return axios.post(url, {
      params
    }).then((res) => {
      const {errno, data} = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e) => {
      console.log(e)
    })
  }
}

