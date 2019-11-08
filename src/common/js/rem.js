(function(doc, win) {

    var _rootFontSize = window._rootFontSize || 25;

    // 默认不支持缩放
    var _remMetaScalable = typeof window._remMetaScalable === 'undefined'
        ? false
        : !!window._remMetaScalable;

    var docEl = doc.documentElement,
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),

        // 只针对IOS设备
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,

        // 计算缩放比
        scale = 1 / dpr,

        // 检测支持的"缩放"事件
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = dpr;

    // 被iframe引用时，禁止缩放
    dpr = window.top === window.self ? dpr : 1;

    var metaEl = doc.createElement('meta');
    metaEl.name = 'viewport';
    var metaElContent = 'width=device-width, ';

    // 支持缩放
    if (_remMetaScalable) {
        metaElContent += 'initial-scale=' + scale;
    } else {
        metaElContent += (
            'initial-scale=' + scale
            + ',maximum-scale=' + scale
            + ', minimum-scale=' + scale
            + ', user-scalable=no');
    }
    metaEl.content = metaElContent;
    docEl.firstElementChild.appendChild(metaEl);

    // 处理font-size
    var recalc = function() {
        // 获取当前设备宽的物理像素
        var width = docEl.clientWidth;
        //兼容手机
        if(width<1536&&!isPC()){
            // 750为375设备对应的物理像素  具体值取决于设计稿 设计稿为750才除以750
            docEl.style.fontSize=getFontSize(_rootFontSize,width,750)
            return
        //兼容平板
        }else if(width>=1536&&!isPC()){
            docEl.style.fontSize=getFontSize(_rootFontSize,width,1536)
            return
        }
        //兼容PC
        docEl.style.fontSize=getFontSize(_rootFontSize,2)
    };

    //判断pc和移动
    function isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

   // 动态计算fomt-size
   function getFontSize() {
        var argumentsLength=arguments.length;
        if(argumentsLength<3){
          return arguments[0]/2+ 'px'
        }
        return  (arguments[0]*(arguments[1] / arguments[2])) + 'px';
   }

    recalc();

    if (!doc.addEventListener) return;

    win.addEventListener(resizeEvt, recalc, false);
})(document, window);
