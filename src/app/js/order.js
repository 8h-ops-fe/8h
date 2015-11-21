/**
 * 订单管理
 */
define(function(require, exports, module){
    //创建对象
    var oOrder = {};
    /**
     * 初始化
     */
    oOrder.init = function(){
        this.list();    //初始化订单列表
        this.detail();  //订单详情
        this.close();   //关闭
        this.query();   //订单查询
        this.edit();    //订单编辑
    };
    /**
     * 订单列表
     * @param data
     */
    oOrder.list = function(data){
        var json = JSON.stringify({
            pageNum: 1,
            pageSize: 10
        });
        var data = data || json;
        $.ajax({
            url : eightUrl+'order/orderList',
            type : 'post',
            dataType : 'json',
            data : data,
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
                $('.order-list-box').html('');
                console.log(json);
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
    /**
     * 订单查询(默认没有限制条件)
     */
    oOrder.query = function(){
        var that = this;
        $('.order-search').live('click', function(){

            var orderSn = $('.orderSn').val(),            //订单号
                receiverName = $('.receiverName').val(),  //收件人
                receiverPhone = $('.receiverPhone').val(),//联系电话
                startTime = $('.start-time').val(),       //开始时间
                endTime = $('.end-time').val(),           //结束时间
                minAmount = $('.min-price').val(),         //最小价钱
                maxAmount = $('.max-price').val(),         //最大价钱
                status = 0;                               //状态码
                // 更新状态码
                $('.order-radio').each(function(){
                    if( $(this).attr('checked') ){
                        status = $(this).val();
                    }
                });
            var data = JSON.stringify({
                maxAmount : maxAmount,
                minAmount : minAmount,
                maxTime : endTime,
                minTime : startTime,
                orderSn : orderSn,
                phone : receiverPhone,
                receiverName : receiverName,
                status : status
            });
            console.log(data);
            that.list(data);
        });
    };
    /**
     * 订单详情
     */
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
                    var order = json;
                    $('#order-details,.mask-bg').show();
                    $('#order-details').css({top: ($(document).scrollTop()+20)+'px'});
                    console.log(json);
                    var orderSn = order.orderGoodsInfo.orderSn,  //订单号
                        statusDesc = order.orderGoodsInfo.statusDesc,       //订单状态
                        orderPeople = order.orderInfo[0],                   //下单人
                        orderTime= order.orderGoodsInfo.createTime,         //下单时间
                        receivePeople = order.orderGoodsInfo.receiverName || '未填写',  //收货人姓名
                        receiveAddress = order.orderGoodsInfo.receiverAddress || '未填写',//收货地址
                        receiveMobile = order.orderGoodsInfo.receiverMobile || '未填写',//收货人电话
                        receiverPhone = order.orderGoodsInfo.receiverPhone || '未填写'; //收货人座机
                    // 商品详情弹窗
                    $('#order-details').html('\
                        <div>\
                            <h1 class="title">订单详情</h1>\
                            <div class="close-x"></div>\
                        </div>\
                        <div class="order-details-content">\
                            <div class="order-details-content">\
                            <p class="order-mes">订单号：<span>'+orderSn+'</span></p>\
                            <p class="order-mes">订单状态：<span class="red">'+statusDesc+'</span></p>\
                            <ul class="process">\
                                <li class="active">\
                                    <i class="order"></i>\
                                    <span class="mes">下单</span>\
                                    <span class="time">'+orderTime+'</span>\
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
                                <li>'+orderPeople+'</li>\
                                <li>下单时间：'+orderTime+'</li>\
                                <li>收货人：'+receivePeople+'</li>\
                                <li>手机号：'+receiveMobile+'</li>\
                                <li>座机号：'+receiverPhone+'</li>\
                                <li>收货人地址：'+receiveAddress+'</li>\
                            </ul>\
                        </div>');
                }
            })
        });
    };
    /**
     * 订单编辑
     */
    oOrder.edit = function(){
        $('.order-edit-btn').live('click', function(){
            var orderSn = $(this).parents('.order-list').attr('data-orderSn');
            $.ajax({
                url: eightUrl + 'order/myOrderDetail',
                type: 'get',
                data: {
                    id: orderSn
                },
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (xhr) {
                    // json格式传输，后台应该用@RequestBody方式接受
                    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    var token = $.cookie("token");
                    if (token) {
                        xhr.setRequestHeader("X-Access-Auth-Token", token);
                    }
                },
                success : function(json){
                    
                    console.log(json);
                }
            });
        });
    };
    /**
     * 关闭
     */
    oOrder.close = function(){
        $('.close-x,.canle').live('click', function(){
            $('.edit-order,.mask-bg').hide();
        });
    };



    exports.oOrder = oOrder;
});