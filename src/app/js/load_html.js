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
            $(".condition-box").load("common/order/order_condition.html");
            $(".condition-list").load("common/order/order_list.html");
            $(".order-edit").load("common/order/order_edit.html");
            $(".icon1").on("click", function(){
                $(".condition-box").load("common/order/order_condition.html");
                $(".condition-list").load("common/order/order_list.html");
                $(".order-edit").load("common/order/order_edit.html");
            });
            $(".icon2").on("click", function(){
                $(".condition-box").load("common/customer/cus_condition.html");
                $(".condition-list").load("common/customer/cus_list.html");
            });
            $(".icon3").on("click", function(){
                $(".condition-box").load("common/commodity/com_condition.html");
                $(".condition-list").load("common/commodity/com_list.html");
            });
            $(".icon4").on("click", function(){
                $(".condition-box").load("common/user/user_condition.html");
                $(".condition-list").load("common/user/user_list.html");
                $(".user-pop").load("common/user/user_pop.html");
            });
            $(".icon5").on("click", function(){
                $(".condition-box").load("common/admin/admin_condition.html");
                $(".condition-list").load("common/admin/admin_list.html");
                $(".user-pop").load("common/admin/admin_pop.html");
            });
        })();
    });
    exports.loadHtml = loadHtml;
});