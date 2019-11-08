/**
 * 计算宽度百分比
 * @param curValue 当前像素
 * @param maxValue 最大像素
 * **/
let getWidthPercentage = (curValue,maxValue) => ((curValue/maxValue)*100);

/**
 * 计算tab元素宽
 * @param tabMax
 * @param tabTotal
 */
let getTabWidth=(tabMax,tabTotal)=>{
    return  Math.round(Math.round(tabMax/tabTotal))
}

export {
    getWidthPercentage,
    getTabWidth
}