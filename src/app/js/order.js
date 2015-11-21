/**
 * 订单管理
 */
define(function(require, exports, module){
    var oOrder = {};


    oOrder.init = function(){
        this.query();
    };
    oOrder.query = function(){
        //$.ajax({
        //    url : eightUrl+'order/ops/list',
        //    type : 'get',
        //    xhrFields: {
        //        withCredentials: true
        //    },
        //    data : {
        //        pn: 1,
        //        ps: 10
        //    },
        //    beforeSend : function(xhr) {
        //        // json格式传输，后台应该用@RequestBody方式接受
        //        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        //        var token = $.cookie("token");
        //        if (token) {
        //            xhr.setRequestHeader("X-Access-Token", token);
        //        }
        //    },
        //    success : function(json){
        //        console.log(json);
        //    }
        //});

        var arr = [
            {
                "buttons": [
                    {
                        "needConfirm": true,
                        "text": "配货订单",
                        "url": "http://www.aaa.com/aaaa"
                    },
                    {
                        "needConfirm": true,
                        "text": "取消订单",
                        "url": "http://www.aaa.com/aaaa"
                    }
                ],
                "createTime": "2015-10-31 13:25",
                "expressInfo": {},
                "goodsInfoList": [
                    {
                        "goodsAmount": 0,
                        "goodsColor": "嘿嘿嘿",
                        "goodsName": "8H床垫",
                        "goodsSize": "1.5m×2.0m",
                        "imageUrl": "../images/img.jpg"
                    }
                ],
                "orderSn": "1111111111111",
                "receiverName": "string",
                "status": 0,
                "statusDesc": "string",
                "totalPrice": "￥2799",
                "userName": "哈哈"
            },
            {
                "buttons": [
                    {
                        "needConfirm": true,
                        "text": "取消订单",
                        "url": "http://www.aaa.com/aaaa"
                    }
                ],
                "createTime": "2015-10-31 13:25",
                "expressInfo": {},
                "goodsInfoList": [
                    {
                        "goodsAmount": 0,
                        "goodsColor": "嘿嘿嘿",
                        "goodsName": "8H床垫",
                        "goodsSize": "1.5m×2.0m",
                        "imageUrl": "../images/img.jpg"
                    }
                ],
                "orderSn": "1111111111111",
                "receiverName": "string",
                "status": 0,
                "statusDesc": "string",
                "totalPrice": "￥2799",
                "userName": "哈哈"
            }
        ]
        for(var i=0 ; i<arr.length ; i++){
            console.log(arr[i]);
            $('.order-list-box').append('\
            <div class="order-list">\
                <ul class="detial-state">\
                    <li><span class="detial-n">订单号：</span><span class="detial-w">'+arr[i].orderSn+'</span></li>\
                    <li><span class="detial-n">下单时间：</span><span class="detial-w">'+arr[i].createTime+'</span></li>\
                    <li><span class="detial-n">下单用户：</span><span class="detial-w">'+12112345678+'</span></li>\
                        <li><span class="detial-n">收货人：</span><span class="detial-w">'+arr[i].userName+'</span></li>\
                        <li><span class="detial-n">联系电话：</span><span class="detial-w">12112112121</span></li>\
                        <li class="detial-z"><span class="detial-n">待付款</span></li>\
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
                }
                $('.order-list').eq(i).find('.detial-commodity .detial-button').append('<li>\
                        <a href="'+oButton.url+'">'+oButton.text+'</a>\
                    </li>');
            }
        }



    };



    exports.oOrder = oOrder;
});