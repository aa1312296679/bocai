/**
 * 缓存信息读取
 * @method getInfor
 * 1.localstorage对象
 * 2.localstorage的key值
 * 3.默认的vuex属性信息
 * **/
let getInfor=(...infors)=>{
    if(infors.length>3){
        return false
    }
   let localStorage = infors[0];//localstorage对象
   let localKey = infors[1];//localstorage的键名
   let defaultValue = infors[2];//默认信息
   //返回localstorage信息或默认信息
   return (defaultValue)&&(localStorage[localKey]||defaultValue)||(localStorage[localKey])
}

/**
 * 写入缓存信息
 * @method setInfor
 * @params infors所有需要写入缓存的缓存信息和所有缓存信息对应的缓存名称
 */
let setLocalInfor = (...infors) => {

    if(!infors.length){
        return false
    }

    /**
     * 遍历所有需要构建的缓存属性属性名
     * **/
    infors[0].forEach((item,index)=>{
        try {
            localStorage[item['key']] = JSON.stringify(infors[1][index].infor)
        }catch (e) {
            console.log(e)
        }
    })
}


/**
 * 防抖处理函数
 * @method debounce
 * @param fn 需要进行防抖处理的函数
 * @param delay 防抖处理的缓冲时间
 * **/
let debounce = (fn, delay = 300)=> {
    let timer;
    return (...args) => {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

export {
    getInfor,
    debounce,
    setLocalInfor
}

