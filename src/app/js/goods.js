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
		oGoods.operate();   //商品操作
    };
    /**
     * 初始化商品
     */
    oGoods.create = function(){
        // 循环商品
		$.ajax({
			url : eightUrl+'goods/query',
			type : 'post',
			dataType:'json',
			data:JSON.stringify({
				page : 0,
				pageSize : 10
			}),
			contentType:'application/json; charset=utf-8',
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
				alert(1);
				goods = eval('('+json+')');
				alert(goods);
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
				
			}
		});
        
    };
    /**
     * 商品操作
     */
    oGoods.operate = function(){

		// 商品颜色获得
		
		var sizeCount = {};
		$('#goodsColorInput').live('keyup',function(){
			var goodsColorInput = $(this).val();
			$(this).css('borderRightColor','#'+goodsColorInput);
			$(this).siblings('span.color').css('backgroundColor','#'+goodsColorInput);
		});
		$('.file').live('change',function(event) {
			var that = $(this);
			var file = $(this).get(0).files[0];
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function( evt ){
				if(file.type.indexOf('image') != -1 || 0){
					that.parents('.goods-color').find('.goods-image').attr({src: evt.target.result});
					that.parents('.goods-color').find('.goods-image').css({
						'width':'24px',
						'height':'24px',
						'borderWidth':'1px',
						'borderStyle':'solid',
						'borderColor':'#ccc'
					});
					return;
				}
			}
		});
		$('#save-goods-color').die();
		 // 商品颜色添加一列
		 var count = 1;
		$('#save-goods-color').live('click',function(){
			var aInput = $(this).parents('.goods-color input');
			for(var i = 0;i < aInput.length;i++){
				if($(aInput[i]).val() == ''){
					alert('请填写完整');
					return false;
				}
			}
			var date = new Date();
			var goodsSizeDate = date.getTime();
			
			$('#initGoodsSize').html('<ul class="goods-size">\
											<li><input type="text" class="goods-size" /><a href="javascript:;" id="saveGoodsSize" data-goodssizedate="">保存</a></li>\
										</ul>');
			$('#saveGoodsSize').attr('data-goodsSizeDate',goodsSizeDate);
			var goodsColorText = $('#goodsColorText').val();
			var goodsColorInput = $('#goodsColorInput').val();
			var goodsColor = '<ul class="goods-color">\
									<li><input type="text" value="'+goodsColorText+'" /></li>\
									<li><input type="text" class="color-input" value="'+goodsColorInput+'" style="border-right-color:#'+goodsColorInput+'" /><span class="color" style="background:#'+goodsColorInput+'"></span></li>\
									<li><img class="goods-image" /></li>\
									<li><a href="javascript:;">替换图片</a><input type="file" class="file" /></li>\
									<li><a href="javascript:;" class="remove" date-del="'+goodsSizeDate+'">删除</a></li>\
								</ul>';	
			
			$(this).parents('.goods-color').after(goodsColor);
			creatTableColor({'goodsColorText':goodsColorText,'sizeCount':sizeCount,'sizeGthisVal':'','dateColor':goodsSizeDate});
			
			$(this).parents('ul.goods-color').find('input').val('');
			
			$('#goodsColorInput').css('borderRightColor','#ccc');
			$('#goodsColorInput').siblings('span.color').css('backgroundColor','#fff');
			
		});
		// 商品颜色删除一列
		$('.goods-color .remove').die();
		$('.goods-color .remove').live('click', function(){
			$(this).parents('.goods-color').remove();
			var dataDel = $(this).attr('date-del');
			var aTr = $('#addGoodsTable').find('.tr');
			for(var i = 0;i < aTr.length;i++){
				var dataColor = $(aTr[i]).attr('date-color');
				if(dataColor == dataDel){
					$(aTr[i]).remove();
					$('#initGoodsSize').html('<ul class="goods-size">\
											<li><input type="text" class="goods-size" /><a href="javascript:;" id="saveGoodsSize" data-goodssizedate="">保存</a></li>\
										</ul>');
				}
			}
			if($('#addGoodsTable').find('.tr').length == 0){
				$('#addGoodsTable').html(' ');
				return false;
			}
			
		});
		// 商品规格添加一列
		$('#saveGoodsSize').die();
		$('#saveGoodsSize').live('click', function(){
			if($("#addGoodsTable").length == 0 || $('#saveGoodsSize').attr('data-goodssizedate') == ''){
				alert('请先填写颜色并保存。');
				return false;
			}
			var date = new Date();
			var dizeDel = date.getTime();
			
			var sizeGthis = $(this).siblings('.goods-size');
			var sizeGthisVal = sizeGthis.val();
			var goodsSize = '<li><input type="text" value="'+sizeGthisVal+'" /><a href="javascript:;" class="remove" data-sizedel="'+dizeDel+'">删除</a></li>';	
			var jsonSize = {};
			jsonSize.dateColor = $(this).attr('data-goodssizedate');
			jsonSize.sizeGthisVal = sizeGthisVal;
			jsonSize.dizeDel = dizeDel;
			creatTableSize(jsonSize);
			$(this).parents('.goods-size li').eq(0).after(goodsSize);
			$(this).siblings('input').val('');
		});
		// 商品规格删除一列
		$('.detial-color .remove').die();
		$('.detial-color .remove').live('click', function(){
			var delData = $(this).attr('data-sizedel');
			var aTd = $('#addGoodsTable').find('.size-gthis-val');
			for(var i = 0;i < aTd.length;i++ ){
				var dataSize = $(aTd[i]).attr('data-size');
				if(delData == dataSize){
					$(aTd[i]).nextAll().remove();
					var par = $(aTd[i]).parent('tr.tr');
					if(par.find('td.goods-color-text').length == 0){
						par.remove();
					}
					var parDate = par.attr('date-color');
					var aTR = $('#addGoodsTable').find('.tr');
					var countTr = 0;
					for(var j = 0;j < aTR.length;j++){
						var dateClor = $(aTR[j]).attr('date-color');
						if(dateClor == parDate){
							countTr++;
						}
					}
					if(countTr == 1){
						for(var j = 0;j < aTR.length;j++){
							var dateClor = $(aTR[j]).attr('date-color');
							if(dateClor == parDate){
								$(aTR[j]).remove();
								
								var goodsCOlor = $('.goods-color .remove[date-del='+dateClor+']');
								goodsCOlor.parents('ul.goods-color').remove();
								if($('#addGoodsTable').find('.tr').length == 0){
									$('#addGoodsTable').html(' ');
								}
							}
						}	
					}
					$(aTd[i]).remove();
					
				}
			}
			$(this).parent('li').remove();
		});
		//创建表格
		function creatTableColor(json){
			
			if($("#addGoodsTable").find('tr.title').length == 0){
				var tableStr = '<tr class="title">\
										<td width="150">商品颜色</td>\
										<td width="190">商品规格</td>\
										<td width="242">价格</td>\
										<td width="242">库存</td>\
										<td width="242">物料编号</td>\
									</tr>\
									<tr date-color="'+json.dateColor+'" class="tr">\
										<td class="border goods-color-text">'+json.goodsColorText+'</td>\
										<td class="size-gthis-val">'+json.sizeGthisVal+'</td>\
										<td><input type="text" class="goods-price" /></td>\
										<td><input type="text" /></td>\
										<td><input type="text" /></td>\
									</tr>';
				$('#addGoodsTable').append(tableStr);
			}else{
				var tableStr = '<tr date-color="'+json.dateColor+'" class="tr">\
									<td class="border goods-color-text">'+json.goodsColorText+'</td>\
									<td class="size-gthis-val">'+json.sizeGthisVal+'</td>\
									<td><input type="text" class="goods-price" /></td>\
									<td><input type="text" /></td>\
									<td><input type="text" /></td>\
								</tr>';
				$('#addGoodsTable').append(tableStr);
			}
			
		}
		//创建规格
		function creatTableSize(json){
			
			var row = 1;
			var rowArr = [];
			var oTR = $("#addGoodsTable").find('.tr');
			for(var i = 0;i<oTR.length;i++){
				var attrDate = $($("#addGoodsTable .tr")[i]).attr('date-color');
				if(json.dateColor == attrDate){
					rowArr.push($(oTR[i]));
					row++;
					if($(oTR[i]).find('td.size-gthis-val').html() == ''){
						$(oTR[i]).find('td.size-gthis-val').html(json.sizeGthisVal);
						$(oTR[i]).find('td.size-gthis-val').attr('data-size',json.dizeDel);
					}else{
						$(oTR[i]).find('td').removeClass('border');
						var tableStr = '<tr date-color="'+json.dateColor+'" class="tr">\
									<td class="border size-gthis-val" data-size="'+json.dizeDel+'">'+json.sizeGthisVal+'</td>\
									<td class="border"><input type="text" class="goods-price" /></td>\
									<td class="border"><input type="text" /></td>\
									<td class="border"><input type="text" /></td>\
								</tr>';
						rowArr[0].find('.goods-color-text').attr('rowspan',row);
					}
				}
				
				$(oTR[i]).find('td.goods-color-text').addClass('border');
			}
			$('#addGoodsTable').append(tableStr);
			
		}
		
		
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
    };
	oGoods.add = function(){
        $('.goods-add').live('click', function(){
			$('#add-goods').html('<div>\
				<h1 class="title">添加商品</h1>\
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
									<li><input type="text" class="goods-color-text" id="goodsColorText" /></li>\
									<li><input type="text" class="color-input goods-color-input" id="goodsColorInput" /><span class="color"></span></li>\
									<li><img width="0" height="0" class="goods-image" /></li>\
									<li><a href="javascript:;">上传图片</a><input type="file" class="file" /></li>\
									<li><a href="javascript:;" id="save-goods-color">保存</a></li>\
								</ul>\
							</div>\
						</li>\
						<li class="detial-color edit-right">\
							<p class="left">商品规格:</p>\
							<div class="right" id="initGoodsSize">\
								<ul class="goods-size">\
									<li><input type="text" class="goods-size" /><a href="javascript:;" id="saveGoodsSize" data-goodssizedate="">保存</a></li>\
								</ul>\
							</div>\
						</li>\
					</ul>\
				</li>\
			</ul>\
			<table width="870" cellspacing="0" cellspacing="0" border="0" class="detial-table" id="addGoodsTable">\
			</table>\
			<p class="btn-e">\
				<a href="javascript:;" class="save">保存</a>\
				<a href="javascript:;" class="canle">取消</a>\
			</p>');

            $('#add-goods,.mask-bg').show();
            

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
            $('#detial,.mask-bg').show();
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
			$('#eidit-goods').html('<div>\
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
									<li><input type="text" class="goods-color-text" id="goodsColorText" /></li>\
									<li><input type="text" class="color-input goods-color-input" id="goodsColorInput" /><span class="color"></span></li>\
									<li><img width="0" height="0" class="goods-image" /></li>\
									<li><a href="javascript:;">上传图片</a><input type="file" class="file" /></li>\
									<li><a href="javascript:;" id="save-goods-color">保存</a></li>\
								</ul>\
							</div>\
						</li>\
						<li class="detial-color edit-right">\
							<p class="left">商品规格:</p>\
							<div class="right" id="initGoodsSize">\
								<ul class="goods-size">\
									<li><input type="text" class="goods-size" /><a href="javascript:;" id="saveGoodsSize" data-goodssizedate="">保存</a></li>\
								</ul>\
							</div>\
						</li>\
					</ul>\
				</li>\
			</ul>\
			<table width="870" cellspacing="0" cellspacing="0" border="0" class="detial-table" id="addGoodsTable">\
			</table>\
			<p class="btn-e">\
				<a href="javascript:;" class="save">保存</a>\
				<a href="javascript:;" class="canle">取消</a>\
			</p>');

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
