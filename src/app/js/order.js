/**
 * 订单管理
 */
define(function(require, exports, module){
    var operation = require('operation');   // 权限管理

    //创建对象
    var oOrder = {};
    /**
     * 初始化
     */
    oOrder.init = function(){
        this.list();    //初始化订单列表
        this.page();    //分页
        this.detail();  //订单详情
        this.close();   //关闭
        this.query();   //订单查询
        this.edit();    //订单编辑
        this.export();  //导出订单
    };
    /**
     * 订单列表
     * @param data
     */
    oOrder.list = function(pageNum, data){
        var that = this;
        pageNum = pageNum || 1;
        var json = JSON.stringify({
            pageNum: pageNum,
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
                var arr = json.content,  // 订单信息
                    totalPages = json.totalPages; // 总页数
                // 权限管理
                operation.order();
                $('.order-list-box').html('');
                $('#order-page').remove();
                if( json.content == ''){
                    $('.order-list-box').html('<h1 class="no-data">暂无数据</h1>');
                    return;
                }
                // 如果有数据则显示分页
                if( totalPages > 1 ){
                    //分页
                    var pageList = '';
                    for(var i=0 ; i<totalPages ; i++){
                        pageList += '<li>'+(i+1)+'</li>';
                    }
                    var pageHTML = '<ul class="clearfix" id="order-page">'+pageList+'</li>';
                    $('.list').append(pageHTML);
                    $('#order-page li').eq(pageNum-1).addClass('active');
                }

                for(var i=0 ; i<arr.length ; i++) {
                    var orderSn = arr[i].orderSn,      //订单号
                        createTime = arr[i].createTime,//下单时间
                        oDate = new Date(createTime);              //注册时间格式化
                        oDateYear = oDate.getFullYear(),           //年
                        oDateMonth = (oDate.getMonth()+ 1),        //月
                        oDateDay = oDate.getDate(),                //日
                        oHours = oDate.getHours(),                 //小时
                        oMinutes  = oDate.getMinutes(),            //分钟
                        userName = arr[i].userName,    //下单用户
                        receiverName = arr[i].receiverName,     //收货人
                        receiverPhone = arr[i].receiverPhone,   //收货人座机
                        receiverMobile = arr[i].receiverMobile || receiverPhone,  //收货人手机
                        statusDesc = arr[i].statusDesc,//订单状态描述
                        status = arr[i].status,    //订单状态码，1下单，2支付，3配货，4出库，5完成，6取消
                        totalPrice = arr[i].totalPrice/100,//商品价钱，元转分
                        orderPrice = '';               //商品总价
                    var oTime = oDateYear+'-'+oDateMonth+'-'+oDateDay+' '+oHours+':'+oMinutes;

                    // 商品信息
                    var goodsInfo = '';
                    if (arr[i].goodsInfoList) {
                        for (var j = 0; j < arr[i].goodsInfoList.length; j++) {
                            var goodsImg = arr[i].goodsInfoList[j].imageUrl == null ? '' : arr[i].goodsInfoList[j].imageUrl,      //商品图片
                                goodsSize = arr[i].goodsInfoList[j].goodsSize,    //商品大小
                                goodsName = arr[i].goodsInfoList[j].goodsName,    //商品名字
                                goodsColor = arr[i].goodsInfoList[j].goodsColor,  //商品颜色
                                goodsAmount = arr[i].goodsInfoList[j].goodsAmount,//商品个数
                                singlePrice = arr[i].goodsInfoList[j].singlePrice/100,//商品单价，元转分
                                expressInfo = arr[i].expressInfo,                 //快递信息
                                expressInfoC = '',                                //快递公司
                                expressInfoN = '';                                //快递号
                            if (expressInfo) {
                                expressInfoC = expressInfo[0];
                                expressInfoN = expressInfo[1];
                            }
                            var operationBtn = '';
                            //订单详情
                            var orderDetails = '';
                            //1下单，2支付，3配货
                            if (status == 1 || status == 2 || status == 3) {
                                orderDetails = '<ul class="two">\
                                                <li class="order-edit-btn">编辑订单</li>\
                                                <li class="order-details-btn">订单详情</li>\
                                            </ul>';
                                //4出库
                            } else if (status == 4 ) {
                                orderDetails = '<ul class="three">\
                                                <li class="order-edit-btn">编辑订单</li>\
                                                <li class="order-details-btn">订单详情</li>\
                                                <li class="order-logist-btn">\
                                                    <div class="order-express-box">\
                                                        <span class="order-express">物流状态</span>\
                                                        <div class="express-box">\
                                                            <span id="triangle-up"></span>\
                                                            <p><span class="express-company">' + expressInfoC + '</span></p>\
                                                            <p><span class="express-num">' + expressInfoN + '</span></p>\
                                                        </div>\
                                                    </div>\
                                                </li>\
                                            </ul>';
                                //5完成
                            }else if( status ==5 ){
                                orderDetails = '<ul class="three order-operation-box">\
                                                <li class="order-details-btn">订单详情</li>\
                                                <li class="order-logist-btn">\
                                                    <div class="order-express-box">\
                                                        <span class="order-express">物流状态</span>\
                                                        <div class="express-box">\
                                                            <span id="triangle-up"></span>\
                                                            <p><span class="express-company">' + expressInfoC + '</span></p>\
                                                            <p><span class="express-num">' + expressInfoN + '</span></p>\
                                                        </div>\
                                                    </div>\
                                                </li>\
                                            </ul>';
                                //6取消
                            } else {
                                orderDetails = '<ul class="one">\
                                                <li class="order-details-btn">订单详情</li>\
                                            </ul>';
                            }

                            // 订单列表
                            goodsInfo += '\
                                <dl class="detial-commodity">\
                                    <dt><img class="order-list-img" src="' + goodsImg + '"></dt>\
                                    <dd class="second-w">\
                                        <dl>\
                                            <dd>' + goodsName + '×' + goodsAmount + '</dd>\
                                            <dd>' + goodsSize + '</dd>\
                                            <dd>' + goodsColor + '</dd>\
                                            <dd>￥' + singlePrice + '</dd>\
                                            <dd>订单总额：<span>￥' + totalPrice + '</span></dd>\
                                        </dl>\
                                    </dd>\
                                    <dd class="third-w">' + orderDetails + '</dd>\
                                    <dd class="forth-btn">\
                                        <ul class="detial-button"></ul>\
                                    </dd>\
                                </dl>';

                            var statusDescT = '';
                            if (status == 5) {
                                statusDescT = '<span class="detial-n blank">' + statusDesc + '</span>'
                            } else if (status == 6) {
                                statusDescT = '<span class="detial-n ccc">' + statusDesc + '</span>'
                            } else {
                                statusDescT = '<span class="detial-n orange">' + statusDesc + '</span>'
                            }
                        }
                    }
                    // 添加商品信息
                    $('.order-list-box').append('\
                            <div class="order-list" data-orderSn="' + arr[i].orderSn + '">\
                                <ul class="detial-state">\
                                    <li><span class="detial-n">订单号：</span><span class="detial-w">' + orderSn + '</span></li>\
                                    <li><span class="detial-n">下单时间：</span><span class="detial-w">' + createTime + '</span></li>\
                                    <li><span class="detial-n">收货人：</span><span class="detial-w">' + receiverName + '</span></li>\
                                    <li><span class="detial-n">联系电话：</span><span class="detial-w">' + receiverMobile + '</span></li>\
                                    <li class="detial-z">' + statusDescT + '</li>\
                                </ul>' + goodsInfo + '\
                            </div>');

                    // 调整距离
                    var orderBtn = '';
                    if (arr[i].buttons) {
                        for (var k = 0; k < arr[i].buttons.length; k++) {
                            var oButton = arr[i].buttons[k];
                            if (arr[i].buttons.length == 1) {
                                $('.order-list').eq(i).find('.detial-button').addClass('one');
                            } else if (arr[i].buttons.length == 2) {
                                $('.order-list').eq(i).find('.detial-button').addClass('two');
                            } else if (arr[i].buttons.length == 3) {
                                $('.order-list').eq(i).find('.detial-button').addClass('three');
                            }

                            var sTip = '',
                                iStatus = 0;
                            if (oButton.text == '取消订单') {
                                sTip = '确认取消订单么？';
                                iStatus = 6;
                            } else if (oButton.text == '配货订单') {
                                sTip = '确定已完成配货？';
                                iStatus = 4;
                            }

                            var tipClass = '';
                            if (oButton.text == '填写物流信息') {
                                tipClass = 'tip-btn-info';
                            } else {
                                tipClass = 'tip-btn';
                            }
                            orderBtn += '<li data-orderSn="' + orderSn + '" data-status="' + iStatus + '" data-url="' + oButton.url + '" data-top="' + sTip + '" class="' + tipClass + '">\
                                            <span>' + oButton.text + '</span>\
                                        </li>';
                            $('.tip-btn').die().live('click', function () {
                                that.tip($(this), $(this).attr('data-orderSn'), $(this).attr('data-url'), $(this).attr('data-status'));
                            });
                            $('.tip-btn-info').die().live('click', function () {
                                that.distri($(this).attr('data-orderSn'));
                            });
                        }
                        $('.order-list').eq(i).find('.detial-commodity .detial-button').html(orderBtn);
                    }
                }
            },
            error : function(json){
                var json = JSON.parse(json.responseText);
                alert(json.message);
            }
        });
    };
    /**
     * 分页
     */
    oOrder.page = function(){
        var that = this;
        $('#order-page li').die().live('click', function(){
            $('#order-page li').removeClass('active');
            $(this).addClass('active');
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
                status : status,
                pageNum: $(this).html(),
                pageSize: 10
            });
            that.list($(this).html() ,data);
        });
    };
    /**
     * 提示信息
     */
    oOrder.tip = function(that, orderSn, url, status){
        var _this = this;
        // 弹窗、遮罩层出现
        $('.order-tip,.mask-bg').show();
        $('.order-tip').css({top: ($(document).scrollTop()+20)+'px'});
        $('.order-tip-text').html(that.attr('data-top'));
        // 点击取消
        $('.order-tip .cancel').die().live('click', function(){
            $('.order-tip,.mask-bg').hide();
        });
        $('.order-tip .deter').die().live('click', function(){
            $.ajax({
                url : eightUrl+url,
                type : 'post',
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify({
                    orderSn : orderSn,
                    status : status,
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
                    _this.list($('#order-page li.active').html());
                    $('.edit-order,.order-tip,.mask-bg').hide();
                },
                error : function(json){
                    var json = JSON.parse(json.responseText);
                    alert(json.message);
                }
            });
        });
    };
    /**
     * 填写配货信息
     */
    oOrder.distri = function(orderSn){
        var that = this;
        $('#order-express-box,.mask-bg').show();
        $('#order-express-box').css({top: ($(document).scrollTop()+20)+'px'});
        $('#order-express-box .cancel').die().live('click', function(){
            $('#order-express-box,.mask-bg').hide();
        });
        $('#order-express-box .deter').die().live('click', function(){
            var expressName = $('#order-express-box .order-express').val(),
                expressOrder = $('#order-express-box .order-express-num').val();
            if(!expressName){
                alert('请填写快递公司！');
                return;
            }
            if(!expressOrder) {
                alert('请填写快递单号！');
                return;
            }
            data = JSON.stringify({
                expressName : expressName,
                expressOrder : expressOrder,
                orderSn : orderSn,
                status : 4
            });
            $.ajax({
                url : eightUrl+'order/orderDelivered',
                type : 'post',
                data : data,
                xhrFields: {
                    withCredentials: true
                },
                dataType : 'json',
                contentType: "application/json; charset=utf-8",
                beforeSend : function(xhr) {
                    // json格式传输，后台应该用@RequestBody方式接受
                    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    var token = $.cookie("token");
                    if (token) {
                        xhr.setRequestHeader("X-Access-Auth-Token", token);
                    }
                },
                success : function(json){
                    $('#order-express-box,.mask-bg').hide();
                    that.list($('#order-page li.active').html());
                },
                error : function(json){
                    var json = JSON.parse(json.responseText);
                    alert(json.message);
                }
            })
        });
    };
    /**
     * 订单查询(默认没有限制条件)
     */
    oOrder.query = function(){
        var that = this;
        $('.order-search').die().live('click', function(){
            var startTime = $('.start-time').val(),
                endTime = $('.end-time').val();
            if( startTime > endTime && startTime && endTime){
                alert('开始时间必须小于结束时间！');
                return false;
            }
            if( Number($('.min-price').val()) > Number($('.max-price').val()) && $('.min-price').val() && $('.max-price').val() ){
                alert('最小金额必须小于最大金额');
                return false;
            }
            var orderSn = $('.orderSn').val(),             //订单号
                receiverName = $('.receiverName').val(),   //收件人
                receiverPhone = $('.receiverPhone').val(), //联系电话
                startTime = $('.start-time').val(),        //开始时间
                endTime = $('.end-time').val(),            //结束时间
                minAmount = $('.min-price').val() ? $('.min-price').val()*100 : '',         //最小价钱
                maxAmount = $('.max-price').val() ? $('.max-price').val()*100 : '',         //最大价钱
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
                status : status,
                pageNum : 1,
                pageSize : 10
            });
            that.list(1, data);
        });
    };
    /**
     * 订单详情
     */
    oOrder.detail = function(){
        $('.order-details-btn').die().live('click', function(){
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
                    var orderSn = order.orderGoodsInfo.orderSn,       //订单号
                        status = order.orderGoodsInfo.status,         //订单状态码
                        statusDesc = order.orderGoodsInfo.statusDesc; //订单状态

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
                            totalPrice = order.orderGoodsInfo.goodsInfoList[i].singlePrice/100,       //商品价格
                            orderPrice = order.orderGoodsInfo.totalPrice/100;              //商品总价

                            goodsInfo += '<ul class="list-e">\
                                    <li class="image"><img class="goods-detial-img" src="'+imageUrl+'" /></li>\
                                    <li>'+goodsName+' × '+goodsAmount+'</li>\
                                    <li>'+goodsSize+'</li>\
                                    <li>'+goodsColor+'</li>\
                                    <li>¥'+totalPrice+'</li>\
                                    <li class="money">订单总额：<span>¥'+orderPrice+'</span></li>\
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
                                <span class="mes1">下单</span>\
                                <span class="time">'+bayTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow arrow1"></i>\
                            </li>\
                            <li>\
                                <i class="pay"></i>\
                                <span class="mes2">支付</span>\
                                <span class="time">'+payTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow arrow2"></i>\
                            </li>\
                            <li>\
                                <i class="distribution"></i>\
                                <span class="mes3">配货</span>\
                                <span class="time">'+distribuTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow arrow3"></i>\
                            </li>\
                            <li>\
                                <i class="retrieval"></i>\
                                <span class="mes4">出库</span>\
                                <span class="time">'+outTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow arrow4"></i>\
                            </li>\
                            <li>\
                                <i class="finish"></i>\
                                <span class="mes5">完成</span>\
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
                            <ul class="process status'+status+'">'+orderStatusContent+'\
                            </ul>\
                            <div class="edit-detial">\
                                <p class="title-e">商品信息：</p>'+goodsInfo+'\
                            </div>\
                            <p class="title-e">下单信息：</p>\
                            <ul class="user-de">\
                                '+orderGoodsInfo+'\
                            </ul>\
                        </div>');
                },
                error : function(json){
                    var json = JSON.parse(json.responseText);
                    alert(json.message);
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
        $('.order-edit-btn').die().live('click', function(){
            var orderSn = $(this).parents('.order-list').attr('data-ordersn');
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
                    $('#edit-order,.mask-bg').show();

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
                        status = json.status,                                 //订单状态码
                        provinceId = json.provinceId,                         //省编号
                        cityId = json.cityId,                                 //市编号
                        districtId = json.districtId,                         //区编号
                        invoiceTitle = json.invoiceTitle || '未填写',          //发票抬头
                        invoiceType = json.invoiceType;                       //发票类别
                    // 保存
                    $('#edit-order .save').die().live('click', function(){
                        var goodsFormat = json.orderGoodsInfoList[0].goodsDomensionListInSize;
                        that.editEnter(goodsFormat,receiverPhone,json.receiverMobile);
                    });

                    //商品列表
                    var GoodsList = '';
                    for(var i=0 ; i<goodsInfoList.length ; i++){
                        var goodsImg = goodsInfoList[i].imageUrl,     //商品图片
                            goodsName = goodsInfoList[i].name,        //商品名字
                            goodsAmount = goodsInfoList[i].amount,    //商品个数
                            singlePrice = goodsInfoList[i].singlePrice/100,//单价
                            sizeIndex = goodsInfoList[i].sizeIndex,   //当前选择尺寸index
                            colorIndex = goodsInfoList[i].colorIndex, //当前选择颜色index
                            totalPrice = goodsInfoList[i].totalPrice/100, //总价
                            goodsListInSize = goodsInfoList[i].goodsDomensionListInSize;//商品规格

                        var goodsSize = '',     //商品尺寸
                            goodsColor = '';    //商品颜色
                        for(var i=0 ; i<goodsListInSize.length ; i++){
                            goodsSize += '<a href="javascript:;" class="order-size-btn">'+goodsListInSize[i].size+'</a>';
                        }
                        var goodsColorList = goodsListInSize[0].goodsDomensionListInColor;
                        for(var i=0 ; i<goodsColorList.length ; i++){
                            goodsColor +=' <a href="javascript:;" class="order-color-btn" data-color="'+goodsColorList[i].colorCode+'">'+goodsColorList[i].color+'</a>';
                        }

                        GoodsList+='\
                            <ul class="list-e">\
                                <li class="image"><img width="98" height="105" src="'+goodsImg+'" /></li>\
                                <li class="num">\
                                    <p class="line1"><span>*</span>选择数量</p>\
                                    <p class="line2 order-num-box"><a href="javascript:;" class="subtraction">-</a><input type="text" value="'+goodsAmount+'" class="order-num"/><a href="javascript:;" class="plus">+</a></p>\
                                </li>\
                                <li class="model">\
                                    <p class="line1"><span>*</span>选择型号</p>\
                                    <p class="line2">'+goodsSize+'</p>\
                                </li>\
                                <li class="color">\
                                    <p class="line1"><span>*</span>选择颜色</p>\
                                    <p class="line2">'+goodsColor+'</p>\
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
                    // 选择省
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
                            that.prov(provinceId,cityId,districtId);
                            that.city();

                            var orderStatus = '\
                            <li>\
                                <i class="order"></i>\
                                <span class="mes1">下单</span>\
                                <span class="time">'+bayTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow arrow1"></i>\
                            </li>\
                            <li>\
                                <i class="pay"></i>\
                                <span class="mes2">支付</span>\
                                <span class="time">'+payTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow arrow2"></i>\
                            </li>\
                            <li>\
                                <i class="distribution"></i>\
                                <span class="mes3">配货</span>\
                                <span class="time">'+distribuTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow arrow3"></i>\
                            </li>\
                            <li>\
                                <i class="retrieval"></i>\
                                <span class="mes4">出库</span>\
                                <span class="time">'+outTime+'</span>\
                            </li>\
                            <li>\
                                <i class="arrow arrow4"></i>\
                            </li>\
                            <li>\
                                <i class="finish"></i>\
                                <span class="mes5">完成</span>\
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
                                <ul class="process status'+status+'">'+orderStatus+'\
                                </ul>\
                                <div class="editable">\
                                    <p class="title-e">商品信息：</p>'+GoodsList+'\
                                </div>\
                                <p class="title-e">下单信息：</p>\
                                <ul class="user-e">\
                                    <li>\
                                        <p class="left"><span>*</span>收货人：</p>\
                                        <p class="right"><input type="text" value='+receiverName+' class="orderReceiverName"></p>\
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
                                </p>').attr('data-type',invoiceType);
                            // 默认选中
                            $('#prov option').each(function(){
                                if ($(this).val() == provinceId){
                                    $(this).attr('selected','true');
                                }
                            });

                            // 选中默认颜色和大小
                            for(var i=0 ; i<goodsInfoList.length ; i++){
                                $('.list-e').eq(i).find('.model .line2 a').eq(sizeIndex).addClass('active-size');
                                var oColor = $('.list-e').eq(i).find('.color .line2 a').eq(colorIndex);
                                oColor.addClass('active-color').css({background: oColor.attr('data-color'),color:'#fff'});
                            }
                        },
                        error : function(json){
                            var json = JSON.parse(json.responseText);
                            alert(json.message);
                            $('#edit-order,.mask-bg').hide();
                        }
                    });

                },
                error : function(json){
                    var json = JSON.parse(json.responseText);
                    alert(json.message);
                }
            });
        });
    };
    /**
     * 确定修改订单
     */
    oOrder.editEnter = function(goodsFormat,receiverPhone,receiverMobile){
        var that = this;
        var amount = $('.order-num').val(),       //订单数量
            provinceId = $('#prov').val(),        //收货人省编码
            cityId = $('#city').val(),            //收货人城编码
            districtId = $('#dist').val(),        //收货人区编码
            invoiceTitle = $('.invoice').val(),   //发票抬头
            orderSn = $('.order-mes span').html(),//订单号
            receiverAddress = $('.receiverAddress').val() || '',//收货人地址
            receiverMobile = $('.receiverMobile').val() || '',  //收货人手机
            receiverName = $('.orderReceiverName').val() || '', //收货人
            singlePrice = $('.singlePrice').val()*100 || '',        //单价
            type = $('#edit-order').attr('data-type');          //类型
            goodsDomensionId = '';                              //GoodsDomensionId
        if( !receiverName ){
            alert('请填写收货人！');
            return;
        }
        if( !receiverMobile ){
            alert('请填写联系电话！');
            return;
        }
        if( !receiverAddress ){
            alert('请填写收货人地址！');
            return;
        }
        // 循环匹配选中的大小和颜色的goodsDomensionId
        for(var i=0 ; i<goodsFormat.length ; i++){
            $('.active-size').each(function(){
                if( goodsFormat[i].size == $(this).html() ){
                    for(var j=0 ; j<goodsFormat[i].goodsDomensionListInColor.length ; j++){
                        var goodsColor = goodsFormat[i].goodsDomensionListInColor[j].color,
                            id = goodsFormat[i].goodsDomensionListInColor[j].goodsDomensionId;
                        $('.active-color').each(function(){
                            if( $(this).html() == goodsColor ){
                                goodsDomensionId = id;
                            }
                        });
                    }
                }
            })
        }
        if( receiverPhone ){
            var data = JSON.stringify({
                amount : amount,
                provinceId : provinceId,
                cityId : cityId,
                districtId : districtId,
                invoiceTitle : invoiceTitle,
                orderSn : orderSn,
                receiverAddress : receiverAddress,
                receiverLandline : receiverMobile,
                receiverMobile : '',
                receiverName : receiverName,
                singlePrice : singlePrice,
                invoiceType : type,
                goodsDomensionId : goodsDomensionId
            });
        }else{
            var data = JSON.stringify({
                amount : amount,
                provinceId : provinceId,
                cityId : cityId,
                districtId : districtId,
                invoiceTitle : invoiceTitle,
                orderSn : orderSn,
                receiverAddress : receiverAddress,
                receiverLandline : '',
                receiverMobile : receiverMobile,
                receiverName : receiverName,
                singlePrice : singlePrice,
                invoiceType : type,
                goodsDomensionId : goodsDomensionId
            });
        }
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
                $('.edit-order,.mask-bg').hide();
                that.list($('#order-page li.active').html());
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
        $('.subtraction').die().live('click', function(){
            var orderNum = parseInt($(this).parents('.order-num-box').find('.order-num').val());
            if( orderNum>1 ){
                $(this).parents('.order-num-box').find('.order-num').val(orderNum-1);
                $('.order-price').html($(this).parents('.list-e').find('.singlePrice').val()*(orderNum-1));
            }
        });
        //加
        $('.plus').die().live('click', function(){
            var orderNum = parseInt($(this).parents('.order-num-box').find('.order-num').val());
            $(this).parents('.order-num-box').find('.order-num').val(orderNum+1);
            $('.order-price').html($(this).parents('.list-e').find('.singlePrice').val()*(orderNum+1));
        });
        //选择颜色
        $('.order-color-btn').die().live('click', function(){
            var color = $(this).attr('data-color');
            $('.order-color-btn').removeClass('active-color').css({background: '#fff' ,color: '#000'});
            $(this).addClass('active-color').css({background: $(this).attr('data-color'),color: '#fff'});
        });
        //选择大小
        $('.order-size-btn').live('click', function(){
            $('.order-size-btn').removeClass('active-size');
            $(this).addClass('active-size');
        });
        //更改总价
        $('.singlePrice').die().live('keyup', function(){
            $('.order-price').html($(this).val()*$(this).parents('.list-e').find('.order-num').val());
        });

    };
    /**
     * 城市联动选择
     */
    oOrder.city = function(){
        var _this = this;
        // 城市
        $('#prov').die().live('change', function(){
            var that = $(this),
                id = that.val();
            _this.prov(id);
        });
        // 区县
        $('#city').die().live('change', function(){
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
                },
                error : function(json){
                    var json = JSON.parse(json.responseText);
                    alert(json.message);
                }
            })
        });
    };
    /**
     * 省选择
     * @param id
     */
    oOrder.prov = function(id,cityId,districtId){
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
                var city = '';
                for(var i=0 ; i<json.length ; i++){
                    city += '<option value="'+json[i].regionId+'">'+json[i].regionName+'</option>';
                }
                $('#city').html(city);
                $('#city option').each(function(){
                    if($(this).val() == cityId){
                        $(this).attr('selected','true');
                    }
                });
                $.ajax({
                    url : eightUrl+'region/children/'+cityId,
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
                        $('#dist option').each(function(){
                            if ($(this).val() == districtId){
                                $(this).attr('selected','true');
                            }
                        });
                    },
                    error : function(json){
                        var json = JSON.parse(json.responseText);
                        alert(json.message);
                    }
                });
            },
            error : function(json){
                var json = JSON.parse(json.responseText);
                alert(json.message);
            }
        });
    };
    /**
     * 导出订单
     */
    oOrder.export = function(){
        $('#export').die().live('click', function(){
            var orderSn = $('.orderSn').val(),             //订单号
                receiverName = $('.receiverName').val(),   //收件人
                phone = $('.receiverPhone').val(),         //联系电话
                minTime = $('.start-time').val(),          //开始时间
                maxTime = $('.end-time').val(),            //结束时间
                minAmount = $('.min-price').val()*100,         //最小价钱
                maxAmount = $('.max-price').val()*100,         //最大价钱
                status = 0;                                //状态码
            // 更新状态码
            $('.order-radio').each(function(){
                if( $(this).attr('checked') ){
                    status = $(this).val();
                }
            });

            var str = 'maxAmount='+maxAmount+'&minAmount='+minAmount+'&maxTime='+maxTime+'&minTime='+minTime+'&orderSn='+orderSn+'&phone='+phone+'&receiverName='+receiverName+'&status='+status;
            window.location.href = eightUrl+'orderExport/exportUserOrder?'+str;
        });
    };
    /**
     * 关闭
     */
    oOrder.close = function(){
        $('.close-x,.canle').die().live('click', function(){
            $('.edit-order,.mask-bg').hide();
        });
    };

    exports.oOrder = oOrder;
});