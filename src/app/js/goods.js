/**
 * Created by hantengfei on 15/11/18.
 */
define(function(require, exports, module){
    require("jquery");
    require("jCookie");
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
    oGoods.init = function(){
        this.create();    //初始化商品
        this.add();       //添加商品
        this.detail();    //商品详情
        this.close();     //关闭弹窗
		oGoods.edit();		//商品编辑
    };
    /**
     * 初始化商品
     */
    oGoods.create = function(){
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
            $(oUl).html('<li class="w124"><p><a href="javascript:;" class="goods-num">'+that.sn+'</a></p></li>\
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
                                    <a href="javascript:;" class="edit-ga">编辑</a>\
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
    /**
     * 添加商品
     */
    oGoods.add = function(){
		/*{
		  "goodsDomensions": [
			{
			  "color": "string",
			  "colorCode": "string",
			  "goodsId": 0,
			  "id": 0,
			  "images": [
				{
				  "domensionId": 0,
				  "imageURL": "string"
				}
			  ],
			  "inventory": 0,
			  "materialCode": "string",
			  "price": 0,
			  "size": "string"
			}
		  ],
		  "id": 0,
		  "introduction": "string",
		  "name": "string",
		  "sn": "string",
		  "status": 0
		}*/
        $('.goods-add').live('click', function(){
            // 清空所有文字
            //$('#goods-sn').val('');         //商品编号
            //$('#goods-name').val('');       //商品名字
            //$('.goods-color-text').val(''); //商品颜色文字
            //$('.goods-color-input').val('');//商品颜色
           // $('.goods-size').val('');       //商品大小
            //$('.goods-price').val('');      //商品价钱
            //$('.goods-introdu').val('');    //商品介绍
            //$('#goodsStatus').val('');      //商品状态
			
			$('#add-goods').html('<div>\
				<h1 class="title">商品详情</h1>\
				<div class="close-x"></div>\
			</div>\
			<ul class="goods-detial">\
				<li class="detial1">\
					<p class="left line1"><span class="c9">商品编号：</span><span class="c3" ><input type="text" id="goods-sn" /></span></p>\
					<p class="right line1"><span class="c9">商品名称：</span><span class="c3"><input type="text" id="goods-name" /></span></p>\
					<p class="right line1"><span class="c9"><span class="r">*</span>商品状态：</span><select id="goods-status" value="status">\
								<option>上架</option>\
								<option>下架</option>\
							</select></p>\
				</li>\
				<li>\
					<p class="left">商品介绍：</p>\
					<p class="right"><textarea class="goods-introdu"></textarea></p>\
				</li>\
				<li class="margin-none">\
					<ul>\
						<li class="detial-color edit-left">\
							<p class="left">商品颜色：</p>\
							<div class="right">\
								<ul class="goods-color">\
									<li><input type="text" class="goods-color-text" /></li>\
									<li><input type="text" class="color-input goods-color-input" /><span class="color"></span></li>\
									<li><img width="0" height="0" class="goods-image" /></li>\
									<li><a href="javascript:;">上传图片</a><input type="file" class="file" /></li>\
									<li><a href="javascript:;" id="save-goods-color">保存</a></li>\
								</ul>\
							</div>\
						</li>\
						<li class="detial-color edit-right">\
							<p class="left">商品规格:</p>\
							<div class="right">\
								<ul class="goods-size">\
									<li><input type="text" class="goods-size" /><a href="javascript:;" id="save-goods-size">保存</a></li>\
								</ul>\
							</div>\
						</li>\
					</ul>\
				</li>\
			</ul>\
			<p class="btn-e">\
				<a href="javascript:;" class="save">保存</a>\
				<a href="javascript:;" class="canle">取消</a>\
			</p>');

            $('#add-goods,.mask-bg').show();
            // 商品颜色添加一列
			$('.goods-color-input').live('keyup',function(){
				var color = $(this).val();
				$(this).css('borderRightColor','#'+color);
				$(this).siblings('span.color').css('backgroundColor','#'+color);
			});
			$('.file').live('change',function(event) {
                var that = $(this);
                var file = $(this).get(0).files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function( evt ){
                    if(file.type.indexOf('image') != -1 || 0){
                        that.parents('.goods-color').find('.goods-image').attr({src: evt.target.result,width:'24',height:'24'});
                        return;
                    }
                }
            });
			$('#save-goods-color').die();
			$('#save-goods-color').live('click',function(){
				var colorGthis = $(this).parents('.goods-color').find('.color-input').css('borderRightColor');
				var goodsColor = '<ul class="goods-color">\
										<li><input type="text" /></li>\
										<li><input type="text" class="color-input" style="border-right-color:'+colorGthis+'" /><span class="color" style="background:'+colorGthis+'"></span></li>\
										<li><img class="goods-image" /></li>\
										<li><a href="javascript:;">替换图片</a><input type="file" class="file" /></li>\
										<li><a href="javascript:;">删除</a></li>\
									</ul>';	
				
				$(this).parents('.goods-color').after(goodsColor);
			});
            /*$('.goods-color-add .add').live('click', function(){
                $('.goods-color-add-box').append('\
                            <div class="goods-color-add ">\
                                <p class="left"><span class="r">*</span>商品颜色：</p>\
                                <ul class="goods-color right">\
                                    <li><input type="text" class="goods-color-text"/></li>\
                                    <li class="col"><input type="text" class="goods-color-input"/><i></i></li>\
                                    <li><img width="24" height="2" class="goods-color-img"/></li>\
                                    <li class="relative">\
                                        <a href="javascript:;">替换图片</a>\
                                        <input type="file" class="goods-img"/>\
                                    </li>\
                                    <li class="remove"></li>\
                                </ul>\
                            </div>');
            });*/
            // 商品颜色删除一列
            $('.goods-color-add .remove').live('click', function(){
                console.log($(this).parents('.goods-color-add'))
                $(this).parents('.goods-color-add').remove();
            });
            // 商品规格、价格添加一列
            $('.goods-size-box .add').live('click', function(){
                $('.goods-size-box').append('\
                    <ul class="goods-size-c goods-size-num">\
                        <li><input type="text" value="" class="goods-size" /></li>\
                        <li><input type="text" value="" class="goods-price"/></li>\
                        <li class="remove"></li>\
                    </ul>');
            });
            // 商品规格、价格删除一列
            $('.goods-size-box .remove').live('click', function(){
                $(this).parents('.goods-size-c').remove();
            });
            // 输入显示对应颜色
            $('.goods-color-input').live('keyup', function(){
                $(this).next().css({background: "#"+$(this).val()});
            });
            // 图片预览
            $('.goods-img').live('change',function(event) {
                var that = $(this);
                var file = $(this).get(0).files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function( evt ){
                    if(file.type.indexOf('image') != -1 || 0){
                        that.parents('.goods-color').find('.goods-color-img').attr({src: evt.target.result});
                        return;
                    }
                }
            });
            // 添加商品
            $('.goods-edit .save').live('click', function(){
                var sSn = $('.goods-sn').val(),          //商品编号
                    sName = $('.goods-name').val(),      //商品名字
                    sColorText = $('.goods-color-text').val(), //商品颜色文字
                    sColorEng = $('.goods-color-input').val(), //商品颜色
                    sColorImg = $('.goods-color-img').attr('src');//商品图片
                    sSize = $('.goods-size').val(),      //商品大小
                    sPrice = $('.goods-price').val(),    //商品价钱
                    sIntrodu = $('.goods-introdu').val();//商品介绍
                    iSize = $('.goods-size-num').length; //商品大小个数
                    iColor = $('.goods-color-add').length,//商品颜色个数
                    sStatus = $('#goodsStatus').val();    //商品状态

                // 判断不能为空
                var bFlag = true;
                $('.goods-edit input').each(function(){
                    if( !$(this).val() ){
                        $(this).css({border: '1px solid red'});
                        bFlag = false;
                    }
                });
                if( !sIntrodu ){
                    $('.goods-introdu').css({border: '1px solid red'});
                    bFlag = false;
                }
                // 如果添加的商品颜色和大小个数不符则提醒
                if( iSize != iColor ){
                    alert('请填写正确的商品颜色和规格');
                    return false;
                }

                // 添加商品
                if( bFlag ){
                    var aGoodsDomensions = [];
                    for(var i=0 ; i<$('.goods-color-add').length ; i++){
                        aGoodsDomensions.push({
                            color : $('.goods-color-add-box .goods-color-text').eq(i).val(),
                            goodsId : null,
                            id : null,
                            images : [
                                {
                                    domensionId : null,
                                    imageURL : 'string'
                                }
                            ],
                            inventory : 0,
                            price : $('.goods-size-box .goods-prize').eq(i).val(),
                            size : $('.goods-size-box .goods-size').eq(i).val(),
                        })
                    }
                    var oData = {
                        "goodsDomensions": aGoodsDomensions,
                        "id": null,
                        "introduction": sIntrodu,
                        "name": sName,
                        "sn": sSn,
                        "status": sStatus
                    }

                    $.ajax({
                        url : eightUrl+'/goods/create',
                        type : 'post',
                        contentType: "application/json; charset=utf-8",
                        dataType : 'json',
                        data : oData,
                        beforeSend: function (xhr) {
                            // json格式传输，后台应该用@RequestBody方式接受
                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                            var token = $.cookie("token");
                            if (token) {
                                xhr.setRequestHeader("X-Auth-Token", token);
                            }
                        },
                        success : function(json){
                            console.log(json);

                        },
                        error : function(json){
                            console.log(json);
                        }
                    });
                }
            });
        });
    };
    /**
     * 查看商品详情
     */
    oGoods.detail = function(){
        $('.goods-num').live('click', function(){
            var id = $(this).parents('.goods-details').attr('data-id');
            $('.goods-detial-pop,.mask-bg').show();
            $.ajax({
                url : eightUrl+'/goods/detail/'+id,
                success : function(json){
                    console.log(json);
                },
                error : function(json){
                    console.log(json);
                }
            });
        });
    };
	/**
     * 商品编辑
     */
	oGoods.edit = function(){
		$('.edit-ga').live('click',function(){
			alert(1);
			$('#eidit-goods,.mask-bg').show();
		});
	};
	
    /**
     * 关闭弹窗
     */
    oGoods.close = function(){
        $('.close-x,.canle').live('click', function(){
            $(this).parents('.goods-close').hide();
            $('.mask-bg').hide();
        });
    };

    exports.goods = oGoods;
});
