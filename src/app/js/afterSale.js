/**
 * 售后管理
 */
define(function(require, exports, module){
    var oAfter = {};
    /**
     * 初始化
     */
    oAfter.init = function(){
        this.list();    //售后列表
        this.query();   //售后查询
        this.afterQuery();//售后订单查询
        this.orderQuery();//订单详情
    };
    /**
     * 售后列表
     */
    oAfter.list = function(data){
        var json = JSON.stringify({
            pageNum: 1,
            pageSize: 10
        });
        var data = data || json;
        $.ajax({
            url : eightUrl+'afterSale/query',
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
                var afterList = '';
                for(var i=0 ; i<json.length ; i++){
                    console.log(json[i]);
                    var goodsId = json[i].goodsId,                  //商品ID
                        orderGoodsId = json[i].orderGoodsId,        //订单商品ID
                        orderId = json[i].orderId,                  //订单ID
                        reason = json[i].reason,                    //退货原因
                        receiverAddress = json[i].receiverAddress,  //收货人地址
                        receiverLandline = json[i].receiverLandline,//收货人座机
                        receiver_mobile = json[i].receiver_mobile || receiverLandline,  //收货人手机
                        receiverName = json[i].receiverName,                 //收货人姓名
                        sn = json[i].sn,                                     //售后编号
                        orderSn = json[i].orderSn,                           //订单编号
                        result = json[i].result,                             //审核结果
                        type = json[i].type == 1 ? '换货' : '退货';            //退货类型
                    var sHandle = '',                                        //处理状态
                        sResult = '';                                        //处理结果
                        if( result == 0 ){
                            sHandle = '<li class="w68 orange">待处理</li>';
                            sResult = '<li class="w94 no-boder">\
                                           <a href="javascript:;" class="audit-through">通过</a>\
                                           <a href="javascript:;" class="noe-rhrough">不通过</a>\
                                       </li>'
                        }else if( result == 1 ){
                            sHandle = '<li class="w68">已处理</li>';
                            sResult = '<li class="w94 no-boder">通过</li>';
                        }else if( result == 2 ){
                            sHandle = '<li class="w68">已处理</li>';
                            sResult = '<li class="w94 no-boder">不通过</li>';
                        }else{
                            sHandle = '<li class="w68">未知</li>';
                            sResult = '<li class="w94 no-boder">未知</li>';
                        }
                    afterList += '\
                            <dd data-orderSn="'+orderSn+'" data-sn="'+sn+'" class="after-list-box">\
                                <ul class="line" >\
                                    <li class="w124 blue cursor after-details-btn">'+sn+'</li>\
                                    <li class="w156 blue cursor after-order-btn">'+orderSn+'</li>\
                                    <li class="w60">'+type+'</li>\
                                    <li class="w60">'+receiverName+'</li>\
                                    <li class="w110">'+receiver_mobile+'</li>\
                                    <li class="w116">2015-10-31</li>\
                                    <li class="w94">2015-10-31</li>\
                                    <li class="w77">'+reason+'</li>'+sHandle+'\
                                    '+sResult+'\
                                </ul>\
                            </dd>';
                }
                $('.after-list').html(afterList);
            },
            error : function(json){
                console.log(json);
            }
        })
    };
    /**
     * 售后查询
     */
    oAfter.query = function(){
        var that = this;
        $('.after-search').die().live('click', function(){
            var afterSn = $('.after-sn').val(),     //售后单号
                orderId = $('.after-orderId').val(),//订单号
                description = $('.after-description').val(),//问题描述
                startTime = $('.start-time').val(), //开始时间
                endTime = $('.end-time').val(),     //结束时间
                state = 0,                          //处理状态
                type = 0,                           //售后类型
                result = 0;                         //审核结果
            //更新状态码
            $('.after-type').each(function(){
                if( $(this).attr('checked') ){
                    type = $(this).val();
                }
            });
            $('.after-state').each(function(){
                if( $(this).attr('checked') ){
                    state = $(this).val();
                }
            });
            $('.after-result').each(function(){
                if( $(this).attr('checked') ){
                    result = $(this).val();
                }
            });
            var data = JSON.stringify({
                sn : afterSn,
                orderSn : orderId,
                reason : description,
                applyDateDown : startTime,
                applyDateUp : endTime,
                state : state,
                type : type,
                result : result
            });
            that.list(data);
        });
    };
    /**
     * 售后订单查询
     * @type {{}}
     */
    oAfter.afterQuery = function(){
        $('.after-details-btn').die().live('click', function(){
            var id = $(this).parents('.after-list-box').attr('data-sn');
            $.ajax({
                url : eightUrl+'afterSale/detail/'+id,
                type : 'get',
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
                    console.log(json);
                },
                error : function(json){
                    var json = JSON.parse(json.responseText);
                    alert(json.message);
                }

            })
        });
    };
    /**
     * 订单详情
     */
    oAfter.orderQuery = function(){
        $('.after-order-btn').die().live('click', function(){
            var orderSn = $(this).parents('.after-list-box').attr('data-orderSn');
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
                        totalPrice = order.orderGoodsInfo.totalPrice,       //商品价格
                            orderPrice = parseInt(goodsAmount)*parseInt(totalPrice);              //商品总价

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
                                <span class="msg1">下单</span>\
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
                }
            })
        });
    };

    exports.after = oAfter;
});