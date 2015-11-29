/**
 * Created by hantengfei on 15/11/16.
 */
define(function(require, exports, module){
    require('jCookie');

    var loadHtml = $(function(){
        // 动态加载内容
        ;(function tpl(){
            // 用户名
            var name = $.cookie('name');
            $('.username').html(name);
            $(".nav li").on('click', function(){
                $(".nav li").removeClass("active");
                $(this).addClass("active");
            });
            // 登出
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
            // 首页
            $(".wrap").load("common/order.html",function(){
                myRadio('status');
                var oOrder = require('order').oOrder;
                oOrder.init();
                // 未处理售后订单
                var json = JSON.stringify({
                    pageNum: 1,
                    pageSize: 9999999
                });
                $.ajax({
                    url : eightUrl+'afterSale/query',
                    type : 'post',
                    dataType : 'json',
                    data : json,
                    contentType: "application/json; charset=utf-8",
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend : function(xhr) {
                        // json格式传输，后台应该用@RequestBody方式接受
                        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                        var token = $.cookie("token");
                        if (token) {
                            xhr.setRequestHeader("X-Access-Auth-Token", token);
                        }
                    },
                    success : function(json){
                        var content = json.content,
                            num = 0;
                        for(var i=0 ; i<content.length ; i++){
                            if( content[i].result == 0 ){
                                num++;
                            }
                        }
                        if(num >0)$('.after-num').html(' (<span class="red">'+num+'</span>)');
                    },
                    error : function(json){
                        var json = JSON.parse(json.responseText);
                        alert(json.message);
                    }
                });
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
                    var admin = require('../js/admin.js').admin;
                    admin.init();
                });
            });
        })();
    });
    exports.loadHtml = loadHtml;
});