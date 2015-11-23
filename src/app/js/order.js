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
                var arr = json;
                console.log(arr);
                $('.order-list-box').html('');
                for(var i=0 ; i<arr.length ; i++){
                    var orderSn = arr[i].orderSn,      //订单号
                        createTime = arr[i].createTime,//下单时间
                        userName = arr[i].userName,    //收货人
                        statusDesc = arr[i].statusDesc;//订单状态
                    // 商品信息
                    var goodsInfo = '';
                    if(arr[i].goodsInfoList)
                    for(var j=0 ; j<arr[i].goodsInfoList.length ; j++){
                        var goodsImg = arr[i].goodsInfoList[j].imageUrl,      //商品图片
                            goodsSize = arr[i].goodsInfoList[j].goodsSize,    //商品大小
                            goodsName = arr[i].goodsInfoList[j].goodsName,    //商品名字
                            goodsColor = arr[i].goodsInfoList[j].goodsColor,  //商品颜色
                            goodsAmount = arr[i].goodsInfoList[j].goodsAmount;//商品个数
                        goodsInfo += '\
                                <dl class="detial-commodity">\
                                    <dt><img src="'+goodsImg+'"></dt>\
                                    <dd class="second-w">\
                                        <dl>\
                                        <dd>'+goodsName+'×'+goodsAmount+'</dd>\
                                        <dd>'+goodsSize+'</dd>\
                                        <dd>'+goodsColor+'</dd>\
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
                                </dl>';
                    }
                    $('.order-list-box').append('\
                            <div class="order-list" data-orderSn="'+arr[i].orderSn+'">\
                                <ul class="detial-state">\
                                    <li><span class="detial-n">订单号：</span><span class="detial-w">'+orderSn+'</span></li>\
                                    <li><span class="detial-n">下单时间：</span><span class="detial-w">'+createTime+'</span></li>\
                                    <li><span class="detial-n">下单用户：</span><span class="detial-w">'+12112345678+'</span></li>\
                                    <li><span class="detial-n">收货人：</span><span class="detial-w">'+userName+'</span></li>\
                                    <li><span class="detial-n">联系电话：</span><span class="detial-w">12112112121</span></li>\
                                    <li class="detial-z"><span class="detial-n">'+statusDesc+'</span></li>\
                                </ul>'+goodsInfo+'\
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
                    var orderSn = order.orderGoodsInfo.orderSn,  //订单号
                        statusDesc = order.orderGoodsInfo.statusDesc;       //订单状态

                    var orderGoodsInfo = '';    //商品信息列表
                    for(var i=0 ; i<order.orderInfo.length ; i++){
                        orderGoodsInfo+='<li>'+order.orderInfo[i]+'</li>';
                    }
                    // 商品信息
                    var goodsInfo = '';
                    for(var i=0 ; i<order.orderGoodsInfo.goodsInfoList.length ; i++){
                        var goodsAmount = order.orderGoodsInfo.goodsInfoList[i].goodsAmount,      //商品数量
                            goodsColor = order.orderGoodsInfo.goodsInfoList[i].goodsColor,        //商品颜色
                            goodsName = order.orderGoodsInfo.goodsInfoList[i].goodsName,          //商品名字
                            goodsSize = order.orderGoodsInfo.goodsInfoList[i].goodsSize,          //商品大小
                            imageUrl = order.orderGoodsInfo.goodsInfoList[i].imageUrl;            //商品图片

                            goodsInfo += '<ul class="list-e">\
                                    <li class="image"><img class="goods-detial-img" src="'+imageUrl+'" /></li>\
                                    <li>'+goodsName+' × '+goodsAmount+'</li>\
                                    <li>'+goodsSize+'</li>\
                                    <li>'+goodsColor+'</li>\
                                    <li>¥2799</li>\
                                    <li class="money">订单总额：<span>¥2799</span></li>\
                                </ul>';
                    }
                    //商品状态
                    //订单状态
                    var bayTime = '',     //下单时间
                        payTime = '',     //支付时间
                        distribuTime = '',//配货时间
                        outTime= '',      //出库时间
                        succTime = '',    //完成时间
                        orderStatus = order.orderStatusTimeMap;    //商品状态码

                    for(var i=0 ; i<orderStatus.length ; i++){
                        switch(orderStatus[i].status){
                            case 1:
                                bayTime = orderStatus[i].time;
                                break;
                            case 2:
                                payTime = orderStatus[i].time;
                                break;
                            case 3:
                                distribuTime = orderStatus[i].time;
                                break;
                            case 4:
                                outTime = orderStatus[i].time;
                                break;
                            case 5:
                                succTime = orderStatus[i].time;
                                break;
                        }
                    }
                    var orderStatusContent = '\
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
                            <ul class="process">'+orderStatusContent+'\
                            </ul>\
                            <div class="edit-detial">\
                                <p class="title-e">商品信息：</p>'+goodsInfo+'\
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
                url: eightUrl + 'order/orderEditInfo',
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
                    // 保存
                    $('#edit-order .save').die().live('click', function(){
                        that.editEnter();
                    });
                    $('#edit-order').css({top: ($(document).scrollTop()+10)+'px'});
                    var orderSn = json.orderSn,      //订单号
                        statusDesc = json.statusDesc,//订单状态
                        totalPrice = json.totalPrice,//总价
                        receiverName = json.receiverName,//收货人姓名
                        receiverPhone = json.receiverPhone,//收货人座机
                        receiverMobile = json.receiverMobile || receiverPhone,//收货人电话
                        receiverAddress = json.receiverAddress,               //收货人地址
                        goodsInfoList = json.orderGoodsInfoList,              //商品信息
                        orderStatusTimeMap = json.orderStatusTimeMap,         //订单状态
                        provinceId = json.provinceId,                         //省编号
                        cityId = json.cityId,                                 //市编号
                        districtId = json.districtId,                         //区编号
                        invoiceTitle = json.invoiceTitle,                     //发票抬头
                        invoiceType = json.invoiceType;                       //发票类别


                    //商品列表
                    var GoodsList = '';
                    for(var i=0 ; i<goodsInfoList.length ; i++){
                        var goodsImg = goodsInfoList[i].imageUrl,     //商品图片
                            goodsName = goodsInfoList[i].name,        //商品名字
                            goodsAmount = goodsInfoList[i].amount,    //商品个数
                            singlePrice = goodsInfoList[i].singlePrice,//单价
                            sizeIndex = goodsInfoList[i].sizeIndex,   //当前选择尺寸index
                            colorIndex = goodsInfoList[i].colorIndex, //当前选择颜色index
                            totalPrice = goodsInfoList[i].totalPrice, //总价
                            goodsListInSize = goodsInfoList[i].goodsDomensionListInSize;



                        GoodsList+='\
                            <ul class="list-e">\
                                <li class="image"><img width="98" height="105" src="'+goodsImg+'" /></li>\
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
                                    <p class="line2"><input type="text" value="'+singlePrice+'" class="singlePrice"/></p>\
                                </li>\
                            </ul>\
                            <p class="order-price-box">订单总额：<span class="order-price">'+totalPrice+'</span></p>\
                            ';
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
                            that.prov(json[0].regionId);
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
                                        <p class="right"><input type="text" value='+receiverName+' class="receiverName"></p>\
                                    </li>\
                                    <li>\
                                        <p class="left"><span>*</span>联系电话：</p>\
                                        <p class="right"><input type="text" value='+receiverMobile+' class="receiverMobile"></p>\
                                    </li>\
                                    <li>\
                                        <p class="left"><span>*</span>收货地址：</p>\
                                        <p class="right order-city-box">'+orderCity+'</p>\
                                    </li>\
                                    <li>\
                                        <p class="left"></p>\
                                        <p class="right">\
                                            <input type="text" value='+receiverAddress+' class="receiverAddress">\
                                        </p>\
                                    </li>\
                                    <li>\
                                        <p class="left">发票抬头：</p>\
                                        <p class="right"><input type="text" value="'+invoiceTitle+'" class="invoice"/></p>\
                                    </li>\
                                </ul>\
                                <p class="btn-e">\
                                    <a href="javascript:;" class="save">保存</a>\
                                    <a href="javascript:;" class="canle">取消</a>\
                                </p>');
                            // 默认选中
                            $('#prov option').each(function(){
                                if ($(this).val() == provinceId){
                                    $(this).attr('selected','true');
                                }
                            });
                            $('#city option').each(function(){
                                if($(this).val() == cityId){
                                    $(this).attr('selected','true');
                                }
                            });
                            $('#dist option').each(function(){
                                if ($(this).val() == districtId){
                                    $(this).attr('selected','true');
                                }
                            });
                            // 选中默认颜色和大小
                            for(var i=0 ; i<goodsInfoList.length ; i++){
                                $('.list-e').eq(i).find('.model .line2 a').eq(sizeIndex).addClass('active-size');
                                $('.list-e').eq(i).find('.color .line2 a').eq(sizeIndex).addClass('active-color');
                            }
                        }
                    });

                }
            });
        });
    };
    /**
     * 确定修改订单
     */
    oOrder.editEnter = function(){
        var amount = $('.order-num').val(),    //订单数量
            provinceId = $('#prov').val(),     //收货人省编码
            cityId = $('#city').val(),     //收货人城编码
            districtId = $('#dist').val(),     //收货人区编码
            invoiceTitle = $('.invoice').val(),//发票抬头
            orderSn = $('.order-mes span').html(),//订单号
            receiverAddress = $('.receiverAddress').val(),//收货人地址
            receiverMobile = $('.receiverMobile').val(),  //收货人手机
            receiverName = $('.receiverName').val(),      //收货人
            singlePrice = $('.singlePrice').val();        //单价
        var data = JSON.stringify({
            amount : amount,
            provinceId : provinceId,
            cityId : cityId,
            districtId : districtId,
            invoiceTitle : invoiceTitle,
            orderSn : orderSn,
            receiverAddress : receiverAddress,
            receiverMobile : receiverMobile,
            receiverName : receiverName,
            singlePrice : singlePrice
        });
        $.ajax({
            url : eightUrl+'order/orderEdit',
            type : 'post',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            xhrFields: {
                withCredentials: true
            },
            data : data,
            beforeSend: function (xhr) {
                // json格式传输，后台应该用@RequestBody方式接受
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                var token = $.cookie("token");
                if (token) {
                    xhr.setRequestHeader("X-Access-Auth-Token", token);
                }
            },
            success : function(json){
                console.log('success'+json);
            },
            error : function(json){
                var json = JSON.parse(json.responseText);
                alert(json.message);
            }
        })

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
                $('.order-price').html($(this).parents('.list-e').find('.singlePrice').val()*(orderNum-1));
            }
        });
        //加
        $('.plus').live('click', function(){
            var orderNum = parseInt($(this).parents('.order-num-box').find('.order-num').val());
            $(this).parents('.order-num-box').find('.order-num').val(orderNum+1);
            $('.order-price').html($(this).parents('.list-e').find('.singlePrice').val()*(orderNum+1));
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
        //更改总价
        $('.singlePrice').live('keyup', function(){
            $('.order-price').html($(this).val()*$(this).parents('.list-e').find('.order-num').val());
        });

    };
    /**
     * 城市联动选择
     */
    oOrder.city = function(){
        var _this = this;
        // 城市
        $('#prov').live('change', function(){
            var that = $(this),
                id = that.val();
            _this.prov(id);
        });
        // 区县
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
     * 省选择
     * @param id
     */
    oOrder.prov = function(id){
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