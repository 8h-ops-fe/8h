/**
 * Created by hantengfei on 15/11/16.
 */
define(function(require, exports, module){
    var $ = require("jquery");
    var loadHtml = $(function(){
        // 动态加载内容
        ;(function tpl(){
            $(".nav li").on('click', function(){
                $(".nav li").removeClass("active");
                $(this).addClass("active");
            });

            $(".wrap").load("common/order/order.html");

            $(".icon1").on("click", function(){
                $(".wrap").load("common/order/order.html");
            });
            $(".icon2").on("click", function(){
                $(".wrap").load("common/customer/customer.html");
            });
            $(".icon3").on("click", function(){
                $(".wrap").load("common/commodity/commodity.html");
            });
            $(".icon4").on("click", function(){
                $(".wrap").load("common/user/user.html");
            });
            $(".icon5").on("click", function(){
                $(".wrap").load("common/admin/admin.html");
            });
        })();
    });
    exports.loadHtml = loadHtml;
});