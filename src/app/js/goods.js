/**
 * Created by hantengfei on 15/11/18.
 */
define(function(require, exports, module){
    require("jquery");
    require("jCookie");
<<<<<<< HEAD
    var goods = {};
=======
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
>>>>>>> 14bc3829db7cf07158e14f540003da08b1d5af64
    
    var oGoods = {};
    oGoods.init = function(){
        this.create();    //初始化商品
        this.add();       //添加商品
        this.detail();    //商品详情
        this.close();     //关闭弹窗
		oGoods.edit();		//商品编辑
		oGoods.operate();   //商品操作
		oGoods.conditional(); //商品查询
    };
    /**
     * 初始化商品
     */
    oGoods.create = function(data){
        // 循环商品
		var json = JSON.stringify({
            page: 0,
            pageSize: 10
        });
        var data = data || json;
		$.ajax({
			url : eightUrl+'goods/query',
			type : 'post',
			dataType:'json',
<<<<<<< HEAD
            data : data,
=======
			data:JSON.stringify({
				page : 0,
				pageSize : 10
			}),
>>>>>>> 14bc3829db7cf07158e14f540003da08b1d5af64
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
				console.log(json);
				goods = json;
				$(".cus-adm").html('');
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
     * 商品操查询
     */
	oGoods.conditional = function(date){
		var that = this;
		var json = JSON.stringify({
            page: 0,
            pageSize: 10
        });
		
		$('#goodsSearch').click(function(){
			var inventoryDown = parseInt($('#inventoryDown').val()); //商品库存范围下限值 ,
			var inventoryUp = parseInt($('#inventoryUp').val()); //商品库存范围上限值 ,
			var name = $('#name').val()					// 商品名称 ,
			var priceDown = parseInt($('#priceDown').val());		//商品单价范围下限值 ,
			var priceUp = parseInt($('#priceUp').val());  		//商品单价范围上限值 ,
			var sn = $('#sn').val();					//商品编码 ,
			var status;									//商品状态
			for(var i = 0;i < $('#status input').length;i++){
				if($($('#status input')[i]).attr('checked') == 'checked'){
					status = parseInt($($('#status input')[i]).val());
				}
			}
			 
			var data = JSON.stringify({
						  "inventoryDown": inventoryDown,
						  "inventoryUp": inventoryUp,
						  "name": name,
						  "page": 0,
						  "pageSize": 10,
						  "priceDown": priceDown,
						  "priceUp": priceUp,
						  "sn": sn,
						  "status": status
						});
			that.create(data);
		})
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
			
			var dataDel = $(this).attr('date-del');
			var aTr = $('#addGoodsTable').find('tr[date-color='+dataDel+']');
			for(var i = 0;i < aTr.length;i++){
				$(aTr[i]).remove();
			}
			$(this).parents('.goods-color').remove();
			if($('#addGoodsTable').find('.tr').length == 0){
				$('#addGoodsTable').html(' ');
				$('#initGoodsSize').html('<ul class="goods-size">\
											<li><input type="text" class="goods-size" /><a href="javascript:;" id="saveGoodsSize">保存</a></li>\
										</ul>');
				return false;
			}
			
		});
		// 商品规格添加一列
		$('#saveGoodsSize').die();
		$('#saveGoodsSize').live('click', function(){
			if($("#addGoodsTable").find('.tr').length == 0){
				alert('请先填写颜色并保存。');
				return false;
			}
			if($(this).siblings('input').val() == ''){
				alert('商品规格不能为空');
				return false;
			}
			var date = new Date();
			var dizeDel = date.getTime();
			
			var sizeGthis = $(this).siblings('.goods-size');
			var sizeGthisVal = sizeGthis.val();
			var goodsSize = '<li><input type="text" value="'+sizeGthisVal+'" /><a href="javascript:;" class="remove" data-sizedel="'+dizeDel+'">删除</a></li>';	
			var jsonSize = {};
			jsonSize.sizeGthisVal = sizeGthisVal;
			jsonSize.dizeDel = dizeDel;
			creatTableSize(jsonSize);
			$(this).parents('.goods-size li').eq(0).after(goodsSize);
			$(this).siblings('input').val('');
		});
		// 商品规格删除一列
		$('.detial-color .remove').die();
		$('.detial-color .remove').live('click', function(){
			var delSize = $(this).attr('data-sizedel');
			var aTd = $("#addGoodsTable").find('.size-gthis-val');
			var aTr = $("#addGoodsTable").find('.tr');
			for(var i = 0;i < aTd.length;i++){
				var tdSize = $(aTd[i]).attr('date-size');
				if(tdSize == delSize){
					var aSib = $(aTd[i]).nextAll('td');
					var tdThis = $(aTd[i]);
					var prev = $(aTd[i]).parent('tr').find('.goods-color-text');
					if(prev.length){
						for(var j = 0;j < aSib.length;j++){
							$(aSib[j]).remove();
							$(aTd[i]).remove();
						}
					}else{
						for(var j = 0;j < aSib.length;j++){
							$(aSib[j]).remove();
							var thisDate = tdThis.parent('tr').attr('date-color');
							var sTr = tdThis.parent('tr').siblings('tr[date-color='+thisDate+']');
							var t = sTr.find('.goods-color-text');
							var row = parseInt(t.attr('rowspan'));
							t.attr('rowspan',row-1);
							for(var ss=0;ss<sTr.length;ss++){
								$(sTr[ss]).find('td').removeClass('border');
								if(ss == sTr.length-1){
									$(sTr[ss]).find('td').addClass('border');
								}
								$(t).addClass('border');
							}
							tdThis.parent('tr').remove();
						}
					}
				}
			}
			if($('#initGoodsSize .goods-size li').length == 2){
				$('#addGoodsTable').html(' ');
				$('#editLeft').html('<ul class="goods-color">\
									<li><input type="text" class="goods-color-text" id="goodsColorText" /></li>\
									<li><input type="text" class="color-input goods-color-input" id="goodsColorInput" /><span class="color"></span></li>\
									<li><img width="0" height="0" class="goods-image" /></li>\
									<li><a href="javascript:;">上传图片</a><input type="file" class="file" /></li>\
									<li><a href="javascript:;" id="save-goods-color">保存</a></li>\
								</ul>');
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
										<td class="border goods-color-text" rowspan="1">'+json.goodsColorText+'</td>\
										<td class="border size-gthis-val">'+json.sizeGthisVal+'</td>\
										<td class="border"><input type="text" class="goods-price" /></td>\
										<td class="border"><input type="text" class="goods-number" /></td>\
										<td class="border"><input type="text" class="material-code" /></td>\
									</tr>';
				$('#addGoodsTable').append(tableStr);
			}else{
				var sizeTd = $("#addGoodsTable").find('td.size-gthis-val');
				if($(sizeTd[0]).html() == ''){
					var tableStr = '<tr date-color="'+json.dateColor+'" class="tr">\
									<td class="border goods-color-text" rowspan="1">'+json.goodsColorText+'</td>\
									<td class="border size-gthis-val">'+json.sizeGthisVal+'</td>\
									<td class="border"><input type="text" class="goods-price" /></td>\
									<td class="border"><input type="text" class="goods-number" /></td>\
									<td class="border"><input type="text" class="material-code" /></td>\
								</tr>';
				}else{
					
					var sizeTr = $("#addGoodsTable").find('tr.tr');
					var dateColorTr = $(sizeTr[0]).attr('date-color');
					var trSizeAll = $("#addGoodsTable").find('tr[date-color='+dateColorTr+']');
					var tableStr = '';
					var rowSpan = $($(trSizeAll)[0]).find('.goods-color-text').attr('rowspan');
					for(var i = 0;i < trSizeAll.length;i++){
						var oTr = trSizeAll[i];
						var sizeVal = $(oTr).find('.size-gthis-val').html();
						var dateSize = $(oTr).find('.size-gthis-val').attr('date-size');
						if(trSizeAll.length == 1){
							tableStr += '<tr date-color="'+json.dateColor+'" class="tr">\
										<td class="border goods-color-text" rowspan="'+rowSpan+'">'+json.goodsColorText+'</td>\
										<td class="border size-gthis-val" date-size="'+dateSize+'">'+sizeVal+'</td>\
										<td class="border"><input type="text" class="goods-price" /></td>\
										<td class="border"><input type="text" class="goods-number" /></td>\
										<td class="border"><input type="text" class="material-code" /></td>\
									</tr>';
						}else{
							if(i == 0){
								tableStr += '<tr date-color="'+json.dateColor+'" class="tr">\
										<td class="goods-color-text" rowspan="'+rowSpan+'">'+json.goodsColorText+'</td>\
										<td class="size-gthis-val" date-size="'+dateSize+'">'+sizeVal+'</td>\
										<td><input type="text" class="goods-price" /></td>\
										<td><input type="text" class="goods-number" /></td>\
										<td><input type="text" class="material-code" /></td>\
									</tr>';
							}else if(i == trSizeAll.length-1){
								tableStr += '<tr date-color="'+json.dateColor+'">\
										<td class="border size-gthis-val" date-size="'+dateSize+'">'+sizeVal+'</td>\
										<td class="border"><input type="text" class="goods-price" /></td>\
										<td class="border"><input type="text" class="goods-number" /></td>\
										<td class="border"><input type="text" class="material-code" /></td>\
									</tr>';
							}else{
								tableStr += '<tr date-color="'+json.dateColor+'">\
										<td class="size-gthis-val" date-size="'+dateSize+'">'+sizeVal+'</td>\
										<td><input type="text" class="goods-price" /></td>\
										<td><input type="text" class="goods-number" /></td>\
										<td><input type="text" class="material-code" /></td>\
									</tr>';
							}
						}
					}
				}
				
				$('#addGoodsTable').append(tableStr);
			}
			
		}
		//创建规格
		function creatTableSize(json){
			var aTr = $("#addGoodsTable").find('.tr');
			for(var i = 0;i < aTr.length;i++){
				var oTr = aTr[i];
				var dateColor = $(oTr).attr('date-color');
				var rowSpan =parseInt($(oTr).find('.goods-color-text').attr('rowspan'));
				var colorTest = $(oTr).find('.goods-color-text');
				if(colorTest.siblings('.size-gthis-val').html() == ''){
					colorTest.siblings('.size-gthis-val').html(json.sizeGthisVal);
					colorTest.siblings('.size-gthis-val').attr('date-size',json.dizeDel);
				}else{
					rowSpan++;
					var tdStr = '<tr date-color="'+dateColor+'">\
									<td class="border size-gthis-val" date-size="'+json.dizeDel+'">'+json.sizeGthisVal+'</td>\
									<td class="border"><input type="text" class="goods-price" /></td>\
									<td class="border"><input type="text" class="goods-number" /></td>\
									<td class="border"><input type="text" class="material-code" /></td>\
								</tr>';
					$(oTr).siblings('tr[date-color='+dateColor+']').find('td').removeClass('border');
					$(oTr).find('td').removeClass('border');
					$(oTr).find('td.goods-color-text').addClass('border');
					var oTrAfter = $(oTr).siblings('tr[date-color='+dateColor+']');
					if(oTrAfter.length == 0){
						$(oTr).after(tdStr);
					}else{
						$(oTrAfter[oTrAfter.length-1]).after(tdStr);
					}
				}
				colorTest.attr('rowspan',rowSpan);
			}
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
								<option date-s="1">上架</option>\
								<option date-s="2">下架</option>\
							</select></p>\
				</li>\
				<li>\
					<p class="left">商品介绍：</p>\
					<p class="right"><textarea class="goods-introdu" id="goods-introduction"></textarea></p>\
				</li>\
				<li class="margin-none">\
					<ul>\
						<li class="detial-color edit-left">\
							<p class="left">商品颜色：</p>\
							<div class="right" id="editLeft">\
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
            $('#add-goods .save').live('click', function(){
                var sSn = $('#goods-sn').val(),          //商品编号
                    sName = $('#goods-name').val(),      //商品名字
                    sColorText, //商品颜色文字
                    sColorEng, //商品颜色
                    sSize,      //商品规格
                    sPrice,    //商品价钱
                    sIntrodu,//商品介绍
                    inventory , //商品库存
                    iColor = $('.goods-color-add').length,//商品颜色个数
                    sStatus,//商品状态
					sMaterial;    //物料编码
					for(var i = 0;i < $('#goods-status option').length;i++ ){
						if($($('#goods-status option')[i]).attr('selected') == 'selected'){
							sStatus = $($('#goods-status option')[i]).attr('date-s');
						}
					}
					var goodsDomensions = [];
					var data = {
								  "goodsDomensions": goodsDomensions,
								  "id": '',
								  "introduction": sIntrodu,
								  "name": sName,
								  "sn": sSn,
								  "status": sStatus,
								  "userId": ''
								};
								
								/*[
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
								  ]*/
								  /*var sSn = $('#goods-sn').val(),          //商品编号
									sName = $('#goods-name').val(),      //商品名字
									sColorText, //商品颜色文字
									sColorEng, //商品颜色
									sSize,      //商品规格
									sPrice,    //商品价钱
									sIntrodu;//商品介绍
									inventory ; //商品库存
									iColor = $('.goods-color-add').length,//商品颜色个数
									sStatus;    //商品状态*/
					var aTrGoods = $('#addGoodsTable').find('.tr');
					for(var i = 0;i < aTrGoods.length;i++){
						var dateColor = $(aTrGoods[i]).attr('date-color');
						var oneFimTr = $('#addGoodsTable').find('tr[date-color='+dateColor+']');
						var json = {};
						sColorText =  $(oneFimTr[0]).find('.goods-color-text').html();
						sColorEng = $('#editLeft .remove[date-del='+dateColor+']').parents('.goods-color .color-input').val();
						for(var j = 0;j < oneFimTr;j++){
							sSize = $(oneFimTr[j]).find('.size-gthis-val').html();
							sPrice = $(oneFimTr[j]).find('.goods-price').val();
							inventory = $(oneFimTr[j]).find('.goods-number').val();
							sMaterial = $(oneFimTr[j]).find('.material-code').val();
							json = {
										'color':sColorText,
										'colorCode':sColorText,
										'goodsId':'',
										'id':'',
										'images':[{
										  "domensionId": 0,
										  "imageURL": "string"
										}],
										'inventory':inventory,
										'materialCode':sMaterial,
										'price':sPrice,
										'size':sSize
									};
						}
						goodsDomensions.push(json);
					}
					console.log(goodsDomensions);
					console.log(data);
                // 添加商品

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
