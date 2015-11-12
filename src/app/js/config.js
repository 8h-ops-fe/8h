/**
 * Created by Administrator on 2015/9/1 0001.
 */

seajs.config({

    alias: {
        // JQuery 相关插件
        "jquery": "jquery/1.7.2/jquery",
        "jqueryui":"jqueryui/jquery-ui",
        "jCookie": "j.cookie",
        "smoothscroll":"j.smooth.scroll",
        "bxslider": "j.bxslider",
        "RXRadiobox":"j.RXRadiobox",
        "hdate":"j.hDate",
        "artTemplate":"template",
        "marquee":"marquee.source",
        "select":"j.select",
        "pagination":"j.pagination",
        "validate":"j.validate",
        "validate_extend":"j.validate.extend",
        "fancybox":"fancybox/1.3.1/j.fancybox",

        // 页面脚本
        "common":"../js/common",
        "http":"../js/httpClient",
        "analytics": "../js/analytics",
        "filter": "../js/filter",
        "menu":"../js/menu"
    },

    // 预加载, 在使用use时生效
    preload: ["jquery","artTemplate"]
});

// 当前系统环境说明（option: DEV、TEST、STAGE、PROD）, 跨域配置：当dev、test配置时开启跨域功能、stage和prod配置关闭跨域功能
seajs.env="PROD";
seajs.host="http://121.42.194.249:22000";
