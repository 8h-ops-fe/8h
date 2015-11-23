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
                        receiverName = json[i].receiverName,                     //收货人姓名
                        sn = json[i].sn,                                         //售后编号
                        type = json[i].type == 1 ? '换货' : '退货';                //退货类型

                    afterList += '\
                            <dd>\
                                <ul class="line">\
                                    <li class="w124 blue">'+sn+'</li>\
                                    <li class="w156 blue">'+orderId+'</li>\
                                    <li class="w60">'+type+'</li>\
                                    <li class="w60">'+receiverName+'</li>\
                                    <li class="w110">'+receiver_mobile+'</li>\
                                    <li class="w116">2015-10-31</li>\
                                    <li class="w94">2015-10-31</li>\
                                    <li class="w77">'+reason+'</li>\
                                    <li class="w68">已处理</li>\
                                    <li class="w94 no-boder">通过</li>\
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


    exports.after = oAfter;
});