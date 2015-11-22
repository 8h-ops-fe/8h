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

            var orderSn = $('.orderSn').val(),             //订单号
                receiverName = $('.receiverName').val(),   //收件人
                receiverPhone = $('.receiverPhone').val(), //联系电话
                startTime = $('.start-time').val(),        //开始时间
                endTime = $('.end-time').val(),            //结束时间
                minAmount = $('.min-price').val(),         //最小价钱
                maxAmount = $('.max-price').val(),         //最大价钱
                status = 0;                                //状态码
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
                        orderTime= order.orderGoodsInfo.createTime;         //下单时间
                    var orderGoodsInfo = '';
                    for(var i=0 ; i<order.orderInfo.length ; i++){
                        orderGoodsInfo+='<li>'+order.orderInfo[i]+'</li>';
                    }
                    console.log(orderGoodsInfo)
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
                                '+orderGoodsInfo+'\
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
        var that = this;
        // 商品数量加减、颜色、大小
        this.operation();

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
                    $('#edit-order,.mask-bg').show();
                    $('#edit-order').css({top: ($(document).scrollTop()+10)+'px'});
                    var orderSn = json.orderGoodsInfo.orderSn,      //订单号
                        statusDesc = json.orderGoodsInfo.statusDesc,//订单状态
                        totalPrice = json.orderGoodsInfo.totalPrice,//价钱
                        receiverName = json.orderGoodsInfo.receiverName,//收货人姓名
                        receiverPhone = json.orderGoodsInfo.receiverPhone,//收货人座机
                        receiverMobile = json.orderGoodsInfo.receiverMobile || receiverPhone,//收货人电话
                        receiverAddress = json.orderGoodsInfo.receiverAddress,//收货人地址
                        goodsInfoList = json.orderGoodsInfo.goodsInfoList,    //商品信息
                        orderStatusTimeMap = json.orderStatusTimeMap;         //订单状态

                    //商品列表
                    var GoodsList = '';
                    for(var i=0 ; i<goodsInfoList.length ; i++){
                        var goodsImg = goodsInfoList[i].imageUrl,     //商品图片
                            goodsSize = goodsInfoList[i].goodsSize,   //商品大小
                            goodsName = goodsInfoList[i].goodsName,   //商品名字
                            goodsColor = goodsInfoList[i].goodsColor, //商品颜色
                            goodsAmount = goodsInfoList[i].goodsAmount;//商品个数

                        GoodsList+='\
                            <ul class="list-e">\
                                <li class="image"><img src="../images/order_e.jpg" /></li>\
                                <li class="num">\
                                    <p class="line1"><span>*</span>选择数量</p>\
                                    <p class="line2 order-num-box"><a href="javascript:;" class="subtraction">-</a><input type="text" value="'+goodsAmount+'" class="order-num"/><a href="javascript:;" class="plus">+</a></p>\
                                </li>\
                                <li class="model">\
                                    <p class="line1"><span>*</span>选择型号</p>\
                                    <p class="line2"><a href="javascript:;" class="order-size-btn">1.5m*2.0m</a><a href="javascript:;" class="order-size-btn">1.8m*2.0m</a></p>\
                                </li>\
                                <li class="color">\
                                    <p class="line1"><span>*</span>选择颜色</p>\
                                    <p class="line2"><a href="javascript:;" class="order-color-btn">玫瑰金</a><a href="javascript:;" class="order-color-btn">素蓝灰</a></p>\
                                </li>\
                                <li class="money">\
                                    <p class="line1"><span>*</span>商品价格（元）</p>\
                                    <p class="line2"><input type="text" /></p>\
                                </li>\
                            </ul>';
                    }
                    //订单状态
                    var bayTime = '',     //下单时间
                        payTime = '',     //支付时间
                        distribuTime = '',//配货时间
                        outTime= '',      //出库时间
                        succTime = '';    //完成时间
                    for(var i=0 ; i<orderStatusTimeMap.length ; i++){
                        switch(orderStatusTimeMap[i].status){
                            case 1:
                                bayTime = orderStatusTimeMap[i].time;
                                break;
                            case 2:
                                payTime = orderStatusTimeMap[i].time;
                                break;
                            case 3:
                                distribuTime = orderStatusTimeMap[i].time;
                                break;
                            case 4:
                                outTime = orderStatusTimeMap[i].time;
                                break;
                            case 5:
                                succTime = orderStatusTimeMap[i].time;
                                break;
                        }
                    }
                    // 选择城市
                    var prov = '';
                    $.ajax({
                        url : eightUrl+'region/allProvince',
                        type : 'get',
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
                            that.city();
                            for(var i=0 ; i<json.length ; i++){
                                prov += '<option value="'+json[i].regionId+'">'+json[i].regionName+'</option>';
                            }
                            var orderCity = '\
                                    <select class="prov" id="prov">'+prov+'\
                                    </select>\
                                    <select class="city" id="city">\
                                    </select>\
                                    <select class="dist" id="dist">\
                                    </select>';

                            var orderStatus = '\
                            <li class="active">\
                                <i class="order"></i>\
                                <span class="mes">下单</span>\
                                <span class="time">'+bayTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow"></i>\
                            </li>\
                            <li>\
                                <i class="pay"></i>\
                                <span class="mes">支付</span>\
                                <span class="time">'+payTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow"></i>\
                            </li>\
                            <li>\
                                <i class="distribution"></i>\
                                <span class="mes">配货</span>\
                                <span class="time">'+distribuTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow"></i>\
                            </li>\
                            <li>\
                                <i class="retrieval"></i>\
                                <span class="mes">出库</span>\
                                <span class="time">'+outTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow"></i>\
                            </li>\
                            <li>\
                                <i class="finish"></i>\
                                <span class="mes">完成</span>\
                                <span class="time">'+succTime+'</span>\
                            </li>';

                            // 编辑列表
                            $('#edit-order').html('\
                                <div>\
                                    <h1 class="title">订单编辑</h1>\
                                    <div class="close-x"></div>\
                                </div>\
                                <p class="order-mes">订单号：<span>'+orderSn+'</span></p>\
                                <p class="order-mes">订单状态：<span class="red">'+statusDesc+'</span></p>\
                                <ul class="process">'+orderStatus+'\
                                </ul>\
                                <div class="editable">\
                                    <p class="title-e">商品信息：</p>'+GoodsList+'\
                                </div>\
                                <p class="title-e">下单信息：</p>\
                                <ul class="user-e">\
                                    <li>\
                                        <p class="left"><span>*</span>收货人：</p>\
                                        <p class="right"><input type="text" value='+receiverName+'></p>\
                                    </li>\
                                    <li>\
                                        <p class="left"><span>*</span>联系电话：</p>\
                                        <p class="right"><input type="text" value='+receiverMobile+'></p>\
                                    </li>\
                                    <li>\
                                        <p class="left"><span>*</span>收货地址：</p>\
                                        <p class="right order-city-box">'+orderCity+'</p>\
                                    </li>\
                                    <li>\
                                        <p class="left"></p>\
                                        <p class="right">\
                                            <input type="text" value='+receiverAddress+'>\
                                        </p>\
                                    </li>\
                                    <li>\
                                        <p class="left"><span>*</span>发票抬头：</p>\
                                        <p class="right"><input type="text" /></p>\
                                    </li>\
                                </ul>\
                                <p class="btn-e">\
                                    <a href="javascript:;" class="save">保存</a>\
                                    <a href="javascript:;" class="canle">取消</a>\
                                </p>');
                        }
                    });

                }
            });
        });
    };
    /**
     * 商品数量加减、选择型号、选择颜色
     */
    oOrder.operation = function(){
        //减
        $('.subtraction').live('click', function(){
            var orderNum = parseInt($(this).parents('.order-num-box').find('.order-num').val());
            if( orderNum>1 ){
                $(this).parents('.order-num-box').find('.order-num').val(orderNum-1);
            }
        });
        //加
        $('.plus').live('click', function(){
            var orderNum = parseInt($(this).parents('.order-num-box').find('.order-num').val());
            $(this).parents('.order-num-box').find('.order-num').val(orderNum+1);
        });
        //选择颜色
        $('.order-color-btn').live('click', function(){
            $('.order-color-btn').removeClass('active-color');
            $(this).addClass('active-color');
        });
        //选择大小
        $('.order-size-btn').live('click', function(){
            $('.order-size-btn').removeClass('active-size');
            $(this).addClass('active-size');
        });

    };
    /**
     * 城市联动选择
     */
    oOrder.city = function(){
        $('#prov').live('change', function(){
            var that = $(this),
                id = that.val();
            $.ajax({
                url : eightUrl+'region/children/'+id,
                type : 'get',
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
                    $('#city,#dist').html('');
                    console.log($('#city').html());
                    var city = '';
                    for(var i=0 ; i<json.length ; i++){
                        city += '<option value="'+json[i].regionId+'">'+json[i].regionName+'</option>';
                    }

                    $('#city').html(city);
                    $.ajax({
                        url : eightUrl+'region/children/'+json[0].regionId,
                        type : 'get',
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
                            var dist = '';
                            for(var i=0 ; i<json.length ; i++){
                                dist += '<option value="'+json[i].regionId+'">'+json[i].regionName+'</option>';
                            }
                            $('#dist').html(dist);
                        }
                    });
                }
            })
        });
        $('#city').live('change', function(){
            var that = $(this),
                id = that.val();
            $.ajax({
                url : eightUrl+'region/children/'+id,
                type : 'get',
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
                    var dist = '';
                    for(var i=0 ; i<json.length ; i++){
                        dist += '<option value="'+json[i].regionId+'">'+json[i].regionName+'</option>';
                    }
                    $('#dist').html(dist);
                }
            })
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