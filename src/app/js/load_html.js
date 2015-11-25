/**
 * Created by hantengfei on 15/11/16.
 */
define(function(require, exports, module){
    require('jCookie');

    var loadHtml = $(function(){
        // 动态加载内容
        ;(function tpl(){
            var name = $.cookie('name');
            $('.username').html(name);
            $(".nav li").on('click', function(){
                $(".nav li").removeClass("active");
                $(this).addClass("active");
            });
            $('.login-out').live('click', function(){
                $.ajax({
                    url : eightUrl+'staff/logout',
                    success : function(){
                        $.removeCookie("token");
                        window.location.href = "login.html";
                    },
                    error : function(json){
                        console.log(json);
                    }
                });
            });
            $(".wrap").load("common/order.html",function(){
                myRadio('status');
                var oOrder = require('order').oOrder;
                oOrder.init();
            });

            // 订单管理
            $(".order").on("click", function(){
                $(".wrap").load("common/order.html", function(){
                    myRadio('status');
                    var oOrder = require('order').oOrder;
                    oOrder.init();
                });
            });
            //售后管理
            $(".icon2").on("click", function(){
                $(".wrap").load("common/afterSale.html", function(){
                    myRadio('type');
                    myRadio('state');
                    myRadio('result');
                    var after = require("../js/afterSale.js").after;
                    after.init();
                });
            });
            //商品管理
            $(".goods").on("click", function(){
                $(".wrap").load("common/goods.html",function(){
                    myRadio('state');
                    var goods = require("../js/goods.js").goods;
                    goods.init();

                });
            });
            //用户管理
            $(".user").on("click", function(){
                $(".wrap").load("common/user.html",function(){
                    myRadio('state');
                    var user = require('../js/user.js').user;
                    user.init();
                });
            });
            //系统管理
            $(".icon5").on("click", function(){
                $(".wrap").load("common/admin.html",function(){
                    myRadio('state');
                });
            });
        })();
    });
    exports.loadHtml = loadHtml;
});