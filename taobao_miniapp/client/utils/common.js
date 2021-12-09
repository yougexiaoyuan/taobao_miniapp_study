export default {
    computeRpxFromRem: function(rem) {
        return (parseFloat(rem) * 46.875) + "rpx"       // 750 / (320 / 20)
    },
    computeRpxFromPx: function(px) {
        return parseFloat(px) * 750 / my.getSystemInfoSync().windowWidth
    },
    computePx: function(rpx) {
        return parseFloat(rpx) / 750 * my.getSystemInfoSync().windowWidth
    },
    formatDate: function(date, fmt) {
        if(/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
        }
        let o = {
            'M+':date.getMonth() + 1,
            'd+':date.getDate(),
            'h+':date.getHours(),
            'm+':date.getMinutes(),
            's+':date.getSeconds()
        };

        for(let k in o){
            if(new RegExp(`(${k})`).test(fmt)){
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str : ('00' + str).substr(str.length));
            }
        }
        return fmt;
    },
    measureText:function (text, fontSize=10) {
    text = String(text);
    var text = text.split('');
    var width = 0;
    text.forEach(function(item) {
        if (/[a-zA-Z]/.test(item)) {
            width += 7;
        } else if (/[0-9]/.test(item)) {
            width += 5.5;
        } else if (/\./.test(item)) {
            width += 2.7;
        } else if (/-/.test(item)) {
            width += 3.25;
        } else if (/[\u4e00-\u9fa5]/.test(item)) {  //中文匹配
            width += 10;
        } else if (/\(|\)/.test(item)) {
            width += 3.73;
        } else if (/\s/.test(item)) {
            width += 2.5;
        } else if (/%/.test(item)) {
            width += 8;
        } else {
            width += 10;
        }
    });
    return width * fontSize / 10;
}
}
