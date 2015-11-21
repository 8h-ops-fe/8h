/**
 * 订单管理
 */
define(function(require, exports, module){
    var oOrder = {};


    oOrder.init = function(){
        this.query();
        this.detail();
        this.close();
    };
    oOrder.query = function(){
        $.ajax({
            url : eightUrl+'order/orderList',
            type : 'post',
            dataType : 'json',
            data : JSON.stringify({
                pageNum: 1,
                pageSize: 10
            }),
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
                var arr = json;
                console.log(arr);
                for(var i=0 ; i<arr.length ; i++){
                    $('.order-list-box').append('\
                        <div class="order-list" data-orderSn="'+arr[i].orderSn+'">\
                            <ul class="detial-state">\
                                <li><span class="detial-n">订单号：</span><span class="detial-w">'+arr[i].orderSn+'</span></li>\
                                <li><span class="detial-n">下单时间：</span><span class="detial-w">'+arr[i].createTime+'</span></li>\
                                <li><span class="detial-n">下单用户：</span><span class="detial-w">'+12112345678+'</span></li>\
                                    <li><span class="detial-n">收货人：</span><span class="detial-w">'+arr[i].userName+'</span></li>\
                                    <li><span class="detial-n">联系电话：</span><span class="detial-w">12112112121</span></li>\
                                    <li class="detial-z"><span class="detial-n">'+arr[i].statusDesc+'</span></li>\
                                </ul>\
                                <dl class="detial-commodity">\
                                    <dt><img src="../images/img.jpg"></dt>\
                                    <dd class="second-w">\
                                        <dl>\
                                        <dd>8H床垫×1</dd>\
                                        <dd>1.5m×2.0m</dd>\
                                        <dd>咖啡金</dd>\
                                        <dd>￥2799</dd>\
                                        <dd>订单总额：<span>￥2799</span></dd>\
                                        </dl>\
                                    </dd>\
                                    <dd class="third-w">\
                                        <ul class="three">\
                                            <li class="order-edit-btn">编辑订单</li>\
                                            <li class="order-details-btn">订单详情</li>\
                                            <li class="order-logist-btn">物流状态</li>\
                                        </ul>\
                                    </dd>\
                                    <dd class="forth-btn">\
                                        <ul class="detial-button">\
                                        </ul>\
                                    </dd>\
                                </dl>\
                            </div>');
                    for(var j=0 ; j<arr[i].buttons.length ; j++){
                        var oButton = arr[i].buttons[j];

                        if(arr[i].buttons.length == 1){
                            $('.order-list').eq(i).find('.detial-button').addClass('one');
                        }else if(arr[i].buttons.length == 2){
                            $('.order-list').eq(i).find('.detial-button').addClass('two');
                        }else if(arr[i].buttons.length == 3){
                            $('.order-list').eq(i).find('.detial-button').addClass('three');
                        }
                        $('.order-list').eq(i).find('.detial-commodity .detial-button').append('<li>\
                        <span data-url="'+oButton.url+'">'+oButton.text+'</span>\
                    </li>');
                    }
                }
            }
        });
    };
    oOrder.detail = function(){
        $('.order-details-btn').live('click', function(){
            var orderSn = $(this).parents('.order-list').attr('data-orderSn');
            $.ajax({
                url : eightUrl+'order/myOrderDetail',
                type : 'get',
                data : {
                    id : orderSn
                },
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
                    $('#order-details,.mask-bg').show();
                    $('#order-details').css({top: ($(document).scrollTop()+20)+'px'});
                    console.log(json);
                    $('#order-details').append('\
                    <div class="order-details-content">\
                        <div class="order-details-content">\
                        <p class="order-mes">订单号：<span>2015 1031 1349 2312</span></p>\
                        <p class="order-mes">订单状态：<span class="red">已支付</span></p>\
                        <ul class="process">\
                            <li class="active">\
                                <i class="order"></i>\
                                <span class="mes">下单</span>\
                                <span class="time">10-14&nbsp;&nbsp;15:32</span>\
                            </li>\
                            <li>\
                                <i class="arrow"></i>\
                            </li>\
                            <li>\
                                <i class="pay"></i>\
                                <span class="mes">支付</span>\
                                <span class="time">10-14&nbsp;&nbsp;15:32</span>\
                            </li>\
                            <li>\
                                <i class="arrow"></i>\
                            </li>\
                            <li>\
                                <i class="distribution"></i>\
                                <span class="mes">配货</span>\
                                <span class="time">10-14&nbsp;&nbsp;15:32</span>\
                            </li>\
                            <li>\
                                <i class="arrow"></i>\
                            </li>\
                            <li>\
                                <i class="retrieval"></i>\
                                <span class="mes">出库</span>\
                                <span class="time">10-14&nbsp;&nbsp;15:32</span>\
                            </li>\
                            <li>\
                                <i class="arrow"></i>\
                            </li>\
                            <li>\
                                <i class="finish"></i>\
                                <span class="mes">完成</span>\
                                <span class="time">10-14&nbsp;&nbsp;15:32</span>\
                            </li>\
                        </ul>\
                        <div class="edit-detial">\
                            <p class="title-e">商品信息：</p>\
                            <ul class="list-e">\
                                <li class="image"><img class="goods-detial-img" src="../images/order_e.jpg" /></li>\
                                <li>8H床垫 × 1</li>\
                                <li>1.5m× 2.0m</li>\
                                <li>咖啡金</li>\
                                <li>¥2799</li>\
                                <li class="money">订单总额：<span>¥2799</span></li>\
                            </ul>\
                        </div>\
                        <p class="title-e">下单信息：</p>\
                        <ul class="user-de">\
                            <li>下单人：13145347865</li>\
                            <li>下单时间：2015-10-31</li>\
                            <li>收货人：张一</li>\
                            <li>手机号：13267548976</li>\
                            <li>座机号：010-88889999</li>\
                            <li>收货人地址：北京市海淀区上地十街辉煌国际</li>\
                        </ul>\
                    </div>');




                }
            })
        });
    };
    oOrder.close = function(){
        $('.close-x,.canle').live('click', function(){
            $('.edit-order,.mask-bg').hide();
        });
    };



    exports.oOrder = oOrder;
});