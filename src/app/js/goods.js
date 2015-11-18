/**
 * Created by hantengfei on 15/11/18.
 */
define(function(require, exports, module){
    require("jquery");

    var goods = {
        "content": [

            {
                "goodsDomensions": [
                    {
                        "color": "嘿嘿嘿",
                        "goodsId": 0,
                        "imageURLs": [
                            {
                                "domensionId": 0,
                                "imageURL": "string"
                            }
                        ],
                        "inventory": 49,
                        "price": 2341,
                        "size": "1.5m × 2.0m"
                    },
                    {
                        "color": "白白白",
                        "goodsId": 0,
                        "imageURLs": [
                            {
                                "domensionId": 0,
                                "imageURL": "string"
                            }
                        ],
                        "inventory": 92,
                        "price": 2799,
                        "size": "1.5m × 2.0m"
                    }
                ],
                "id": 0,
                "introduction": "string",
                "name": "Q1床垫",
                "sn": "CD001",
                "status": "已上架"
            },
            {
                "goodsDomensions": [
                    {
                        "color": "土豪金",
                        "goodsId": 0,
                        "imageURLs": [
                            {
                                "domensionId": 0,
                                "imageURL": "string"
                            }
                        ],
                        "inventory": 0,
                        "price": 8888,
                        "size": "1.5m × 2.0m"
                    },
                    {
                        "color": "大天蓝",
                        "goodsId": 0,
                        "imageURLs": [
                            {
                                "domensionId": 0,
                                "imageURL": "string"
                            }
                        ],
                        "inventory": 99,
                        "price": 1111,
                        "size": "1.5m × 2.0m"
                    },
                    {
                        "color": "咖啡金",
                        "goodsId": 0,
                        "imageURLs": [
                            {
                                "domensionId": 0,
                                "imageURL": "string"
                            }
                        ],
                        "inventory": 44,
                        "price": 9999,
                        "size": "1.5m × 2.0m"
                    },
                    {
                        "color": "素蓝灰",
                        "goodsId": 0,
                        "imageURLs": [
                            {
                                "domensionId": 0,
                                "imageURL": "string"
                            }
                        ],
                        "inventory": 4444,
                        "price": 2222,
                        "size": "1.5m × 2.0m"
                    }
                ],
                "id": 0,
                "introduction": "string",
                "name": "Q2床垫",
                "sn": "CD003",
                "status": "上架啦"
            }
        ],
        "first": true,
        "last": true,
        "number": 0,
        "numberOfElements": 0,
        "size": 0,
        "sort": {},
        "totalElements": 0,
        "totalPages": 0
    };

    var oGoods = {};
    // 初始化商品
    oGoods.init = function(){
        // 循环商品
        for(var i=0 ; i<goods.content.length ; i++){
            var that = goods.content[i];
            //循环商品颜色、规格、库存
            var oGoodsDetails = document.createElement('dd'),
                oUl = document.createElement('ul');
            oGoodsDetails.className = 'goods-details';
            $(oGoodsDetails).attr('data-id',that.id);
            oUl.className = 'line-term';
            // 商品内容
            $(oUl).html('<li class="w124"><p><a href="javascript:;">'+that.sn+'</a></p></li>\
                                <li class="w156"><p>'+that.name+'</p></li>\
                                <li class="w190 goods-color-size">\
                                </li>\
                                <li class="w110 goods-price">\
                                    <p>'+that.goodsDomensions[0].price+'</p>\
                                </li>\
                                <li class="w118 goods-inventory">\
                                </li>\
                                <li class="w110"><p>'+that.status+'</p></li>\
                                <li class="w154 no-boder">\
                                    <p>\
                                    <a href="javascript:;">编辑</a>\
                                    <a href="javascript:;">下架</a>\
                                    </p>\
                                </li>');
            $(oGoodsDetails).append(oUl);
            for(var j=0 ; j<that.goodsDomensions.length ; j++){
                var _that = goods.content[i].goodsDomensions[j],
                    oColor = _that.color,
                    oSize = _that.size,
                    oInventory = parseInt(_that.inventory);
                $(oUl).find('.goods-color-size').append('<p>'+oColor+' / '+oSize+'</p>');
                // 为空显示编辑库存
                if( !oInventory ){
                    $(oUl).find('.goods-inventory').append('<p >编辑库存</p>');
                    // 小于50红色
                }else if( oInventory < 50 ){
                    $(oUl).find('.goods-inventory').append('<p class="red">'+_that.inventory+'</p>');
                }else if( oInventory ){
                    $(oUl).find('.goods-inventory').append('<p>'+_that.inventory+'</p>');
                }
            }
            $(".cus-adm").append(oGoodsDetails);
        }
        // 重新计算高度
        for(var i = 0 ; i<$('.cus-adm .line-term').length ; i++){
            var p = $($('.cus-adm .line-term')[i]).find('.w190 p');
            var adm_li_h = p.length * p.height();
            $($('.cus-adm .line-term')[i]).find('li').css('height',adm_li_h+'px');
        }
    };
    // 添加商品
    oGoods.add = function(){
        
    };

    exports.goods = oGoods;
});
