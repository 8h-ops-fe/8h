/**
 * Created by hantengfei on 15/11/18.
 */
define(function (require, exports, module) {
    require("jquery");
    require("jCookie");
    require("ajaxfileupload");
    var operation = require('operation');   // 权限管理
    var goods = {};

    var oGoods = {};
    oGoods.init = function () {
        this.create();    //初始化商品
        this.page();      //分页d
        this.add();       //添加商品
        this.detail();    //获取商品详情
        this.close();     //关闭弹窗
        this.replace();   //替换图片
        this.introdu();   //商品介绍
        this.edit();      //商品编辑
        this.operate();   //商品操作
        this.conditional();//商品查询
        this.status();    //商品上架下架
        this.upDown();    //商品详情中上下架
        this.editUp();    //商品编辑上传
    };
    /**
     * 初始化商品
     */
    oGoods.create = function (pageNum, data) {
        var pageNum = pageNum || 0;
        // 循环商品
        var json = JSON.stringify({
            page: pageNum,
            pageSize: 10
        });
        var data = data || json;
        $.ajax({
            url: eightUrl + 'goods/query',
            type: 'post',
            dataType: 'json',
            data: data,
            contentType: 'application/json; charset=utf-8',
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
            success: function (json) {
                goods = json;
                // 权限管理
                operation.goods();
                var totalPages = json.totalPages;    //总页数
                // 没有数据
                $('.no-data-box').html('');
                $('.goods-list-box').html('');
                if( json.content == ''){
                    $('.no-data-box').html('<h1 class="no-data">暂无数据</h1>');
                    return;
                }
                $('#order-page').remove();
                // 如果有数据则显示分页
                if( totalPages > 1 ){
                    //分页
                    var pageList = '';
                    for(var i=0 ; i<totalPages ; i++){
                        pageList += '<li>'+(i+1)+'</li>';
                    }
                    var pageHTML = '<ul class="clearfix" id="order-page">'+pageList+'</li>';
                    $('.list').append(pageHTML);
                    $('#order-page li').eq(pageNum).addClass('active');
                }
                $(".cus-adm").html('<dt>\
										<ul class="line">\
											<li class="w124">商品编号</li>\
											<li class="w156">商品名称</li>\
											<li class="w190">颜色/规格</li>\
											<li class="w110">价格</li>\
											<li class="w118">库存</li>\
											<li class="w110">商品状态</li>\
											<li class="w154 no-boder">操作</li>\
										</ul>\
									</dt>');
                $('.cus-adm').append('<div class="goods-list-box"></div>');
                for (var i = 0; i < goods.content.length; i++) {
                    var that = goods.content[i];
                    //循环商品颜色、规格、库存,id

                    var oGoodsId = that.goodsDomensions[0].goodsId;
                    var oGoodsDetails = document.createElement('dd'),
                        oUl = document.createElement('ul');
                    oGoodsDetails.className = 'goods-details';
                    oUl.className = 'line-term';
                    // 商品内容

                    var status, unstatus, dateS;
                    if (that.status == '1') {
                        status = '上架';
                        unstatus = '下架';
                        dateS = 2;
                    } else {
                        status = '下架';
                        unstatus = '上架';
                        dateS = 1;
                    }
                    // 价钱
                    var goodsPrice = '';
                    for (var m = 0; m < that.goodsDomensions.length; m++) {
                        goodsPrice += '<p>' + that.goodsDomensions[m].price/100 + '</p>';
                    }

                    $(oUl).html('<li class="w124"><p><a href="javascript:;" class="goods-num" data-id="' + oGoodsId + '">' + that.sn + '</a></p></li>\
										<li class="w156"><p>' + that.name + '</p></li>\
										<li class="w190 goods-color-size">\
										</li>\
										<li class="w110">' + goodsPrice + '\
										</li>\
										<li class="w118 goods-inventory">\
										</li>\
										<li class="w111"><p class="sale-status">' + status + '</p></li>\
										<li class="w154 no-boder goods-operation-box">\
											<p>\
											<a href="javascript:;" class="edit-ga">编辑</a>\
											<a href="javascript:;" date-s="' + dateS + '" class="status-goods-query">' + unstatus + '</a>\
											</p>\
										</li>');
                    $(oGoodsDetails).append(oUl);
                    for (var j = 0; j < that.goodsDomensions.length; j++) {
                        var _that = goods.content[i].goodsDomensions[j],
                            oColor = _that.color,
                            oSize = _that.size,
                            oInventory = parseInt(_that.inventory);
                        $(oUl).find('.goods-color-size').append('<p>' + oColor + ' / ' + oSize + '</p>');
                        // 为空显示编辑库存
                        if (!oInventory) {
                            $(oUl).find('.goods-inventory').append('<p >缺货</p>');
                            // 小于50红色
                        } else if (oInventory <= 50) {
                            $(oUl).find('.goods-inventory').append('<p class="red">' + _that.inventory + '</p>');
                        } else if (oInventory) {
                            $(oUl).find('.goods-inventory').append('<p>' + _that.inventory + '</p>');
                        }
                    }
                    $(".goods-list-box").append(oGoodsDetails);
                }
                // 重新计算高度
                for (var i = 0; i < $('.cus-adm .line-term').length; i++) {
                    var p = $($('.cus-adm .line-term')[i]).find('.w190 p');
                    var adm_li_h = p.length * p.height();
                    $($('.cus-adm .line-term')[i]).find('li').css('height', adm_li_h + 'px');
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
    oGoods.page = function(){
        var that = this;
        $('#order-page li').die().live('click', function(){
            $('#order-page li').removeClass('active');
            $(this).addClass('active');
            var inventoryDown = parseInt($('#inventoryDown').val()); //商品库存范围下限值
            var inventoryUp = parseInt($('#inventoryUp').val());     //商品库存范围上限值
            var name = $('#name').val()					             //商品名称
            var priceDown = parseInt($('#priceDown').val());		 //商品单价范围下限值
            var priceUp = parseInt($('#priceUp').val());  		     //商品单价范围上限值
            var sn = $('#sn').val();					             //商品编码
            var status = 0;									             //商品状态
            $('.order-radio').each(function(){
                if( $(this).attr('checked') ){
                    status = $(this).val();
                }
            });

            var data = JSON.stringify({
                "inventoryDown": inventoryDown,
                "inventoryUp": inventoryUp,
                "name": name,
                "pageSize": 10,
                "priceDown": priceDown,
                "priceUp": priceUp,
                "sn": sn,
                "status": status,
                "page": ($(this).html()-1),
                "pageSize": 10
            });
            that.create($(this).html()-1 ,data);
        });
    };
    /**
     * 商品操查询
     */
    oGoods.conditional = function (date) {
        var that = this;
        var json = JSON.stringify({
            page: 0,
            pageSize: 10
        });
        $('#goodsSearch').click(function () {
            if( Number($('#priceDown').val()) > Number($('#priceUp').val()) && $('#priceDown').val() && $('#priceUp').val() ){
                alert('最小价格必须小于最大价格');
                return;
            }
            if( parseInt($('#inventoryDown').val()) > parseInt($('#inventoryUp').val()) && $('#inventoryDown').val() && $('#inventoryUp').val()){
                alert('最小库存必须小于最大库存');
                return;
            }
            var inventoryDown = $('#inventoryDown').val() ? parseInt($('#inventoryDown').val()) : ''; //商品库存范围下限值
            var inventoryUp = $('#inventoryUp').val() ? parseInt($('#inventoryUp').val()) : '';     //商品库存范围上限值
            var name = $('#name').val();					             //商品名称
            var priceDown = $('#priceDown').val() ? ($('#priceDown').val())*100 : '';             //商品单价范围下限值
            var priceUp = $('#priceUp').val() ? ($('#priceUp').val())*100 : '';  		         //商品单价范围上限值
            var sn = $('#sn').val();					             //商品编码
            var status = 0;									         //商品状态
            $('.order-radio').each(function(){
                if( $(this).attr('checked') ){
                    status = $(this).val();
                }
            });

            var data = JSON.stringify({
                "inventoryDown": inventoryDown,
                "inventoryUp": inventoryUp,
                "name": name,
                "pageSize": 10,
                "priceDown": priceDown,
                "priceUp": priceUp,
                "sn": sn,
                "status": status,
                "page": 0,
                "pageSize": 10
            });
            that.create(0, data);
        })
    };
    /**
     * 商品操作
     */
    oGoods.operate = function () {
        // 商品颜色获得
        var sizeCount = {};
        $('.color-input').die().live('keyup', function () {
            var goodsColorInput = $(this).val();
            $(this).css('borderRightColor', goodsColorInput);
            $(this).siblings('span.color').css('backgroundColor', goodsColorInput);
        });
        // 图片预览
        $('.add-file').live('change', function (event) {
            var that = $(this);
            var s = $(this).parents(".goods-color").find('form');
            var formData = new FormData(s[0]);

            $.ajax({
                url: eightUrl + 'goods/uploadImage',
                crossDomain: true,
                type: "POST",
                beforeSend: function (xhr) {
                    // json格式传输，后台应该用@RequestBody方式接受
                    //xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    var token = $.cookie("token");
                    if (token) {
                        xhr.setRequestHeader("X-Access-Auth-Token", token);
                    }
                },
                xhrFields: {
                    withCredentials: true // 确保请求会携带上Cookie
                },
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (result) {
                    that.parents('.goods-color').find('.goods-image').attr('src', result);
                },
                error: function (respResult) {
                    var message = JSON.parse(respResult.responseText).message;
                    alert(message);
                }
            });
        });

        // 商品颜色添加一列
        var count = 1;
        $(".save-goods-color").die().live('click', function () {
            var aInput = $(this).parents('.goods-color input');
            if( $(this).parents('.goods-color').find('.add-file').val() == ''){
                alert("请添加图片");
                return false;
            }
            if( !$(this).parents('.goods-color').find('.goods-color-text').val() || !$(this).parents('.goods-color').find('.goods-color-input').val() ){
                alert('请输入商品颜色！')
                return;
            }
            var _this = $(this);
            var date = new Date();
            var goodsSizeDate = date.getTime();
            var goodsColorText = _this.parents('#editLeft').find('#goodsColorText').val();    //商品颜色
            var goodsColorInput = _this.parents('#editLeft').find('#goodsColorInput').val();  //颜色编码
            var goodsImgae = _this.parents('#editLeft').find('#goodsImage').attr('src');      //图片url
            // 不能输入相同颜色
            var bFlag1 = false,
                bFlag2 = false;
            $(this).parents('.edit-order').find('.edit-goods-color-text').each(function(){
                if( $(this).val() == goodsColorText ){
                    bFlag1 = true;
                    return;
                }
            });
            $(this).parents('.edit-order').find('.edit-goods-color-input').each(function(){
                if( $(this).val() == goodsColorInput ){
                    bFlag2 = true;
                    return;
                }
            });
            if( bFlag1 || bFlag2 ){
                alert('请不要输入相同颜色!');
                return;
            }

            var goodsColor = '<ul class="goods-color">\
                            <li><input type="text" class="add-goods-text goods-color-text edit-goods-color-text" value="' + goodsColorText + '" /></li>\
                            <li><input type="text" class="add-goods-input color-input goods-color-input edit-goods-color-input" value="' + goodsColorInput + '" style="border-right-color:#' + goodsColorInput + '" /><span class="color" style="background:' + goodsColorInput + '"></span></li>\
                            <li><img class="goods-image" src="' + goodsImgae + '" style="width: 24px; height: 24px; border: 1px solid rgb(204, 204, 204);" /></li>\
                            <li><a href="javascript:;">替换图片</a>\
                                <form action="" method="post" target="iframe-input-1" enctype="multipart/form-data">\
                                    <input type="file" name="image" accept="image/*" class="replace-img input file" data-type="1">\
                                </form>\
                            </li>\
                            <li><a href="javascript:;" class="remove" date-del="' + goodsSizeDate + '">删除</a></li>\
                        </ul>';

            _this.parents('.right').append(goodsColor);
            _this.parents('.goods-color').find('#goodsImage').attr('src', '');
            creatTableColor({
                'goodsColorText': goodsColorText,
                'sizeCount': sizeCount,
                'sizeGthisVal': '',
                'dateColor': goodsSizeDate,
                that : _this
            });
            $('#goodsColorInput').css('borderRightColor', '#ccc');
            $('#goodsColorInput').siblings('span.color').css('backgroundColor', '#fff');
            _this.parents('ul.goods-color').find('input').val('');
        });
        // 商品颜色删除一列
        $('#editLeft .remove').die().live('click', function () {
            var parent = $(this).parents('.edit-order');
            var dataDel = $(this).attr('date-del');
            var aTr = parent.find('#addGoodsTable').find('tr[date-color=' + dataDel + ']');
            for (var i = 0; i < aTr.length; i++) {
                $(aTr[i]).remove();
            }
            $(this).parents('.goods-color').remove();
            if (parent.find('#addGoodsTable').find('.tr').length == 0) {
                parent.find('#addGoodsTable').html(' ');
                parent.find('#initGoodsSize').html('<ul class="goods-size">\
											<li><input type="text" class="goods-size" /><a href="javascript:;" id="saveGoodsSize">保存</a></li>\
										</ul>');
                return false;
            }
        });
        // 商品规格添加一列
        $('#saveGoodsSize').die();
        $('#saveGoodsSize').live('click', function () {
            var that = $(this);
            if (that.parents('.edit-order').find("#addGoodsTable").find('.tr').length == 0) {
                alert('请先填写颜色并保存。');
                return false;
            }
            if ($(this).siblings('input').val() == '') {
                alert('商品规格不能为空');
                return false;
            }
            var date = new Date();
            var dizeDel = date.getTime();

            var sizeGthis = $(this).siblings('.goods-size');
            var sizeGthisVal = sizeGthis.val();
            var bFlag = false;
            that.parents('.edit-order').find('.input').each(function(){
                if($(this).val() == sizeGthisVal){
                    bFlag = true;
                }
            });
            if(bFlag){
                alert('请不要输入相同大小！');
                return;
            }
            var goodsSize = '<li><input type="text" class="add-goods-size edit-goods-size" value="' + sizeGthisVal + '" /><a href="javascript:;" class="remove" data-sizedel="' + dizeDel + '">删除</a></li>';
            var jsonSize = {};
            jsonSize.sizeGthisVal = sizeGthisVal;
            jsonSize.dizeDel = dizeDel;
            creatTableSize(jsonSize, that);
            //$(this).parents('.goods-size li').eq(0).after(goodsSize);
            $(this).parents('.goods-size').append(goodsSize);
            $(this).siblings('input').val('');
        });
        // 商品规格删除一列
        $('#initGoodsSize .remove').live('click', function () {
            var parent = $(this).parents('.edit-order');
            var delSize = $(this).attr('data-sizedel');
            var aTd = parent.find("#addGoodsTable").find('.size-gthis-val');
            var aTr = parent.find("#addGoodsTable").find('.tr');
            for (var i = 0; i < aTd.length; i++) {
                var tdSize = $(aTd[i]).attr('date-size');
                if (tdSize == delSize) {
                    var aSib = $(aTd[i]).nextAll('td');
                    var tdThis = $(aTd[i]);
                    var prev = $(aTd[i]).parent('tr').find('.goods-color-text');
                    if (prev.length) {
                        for (var j = 0; j < aSib.length; j++) {
                            $(aSib[j]).remove();
                            $(aTd[i]).remove();
                        }
                    } else {
                        for (var j = 0; j < aSib.length; j++) {
                            $(aSib[j]).remove();
                            var thisDate = tdThis.parent('tr').attr('date-color');
                            var sTr = tdThis.parent('tr').siblings('tr[date-color=' + thisDate + ']');
                            var t = sTr.find('.goods-color-text');
                            var row = parseInt(t.attr('rowspan'));
                            t.attr('rowspan', row - 1);
                            for (var ss = 0; ss < sTr.length; ss++) {
                                $(sTr[ss]).find('td').removeClass('border');
                                if (ss == sTr.length - 1) {
                                    $(sTr[ss]).find('td').addClass('border');
                                }
                                $(t).addClass('border');
                            }
                            tdThis.parent('tr').remove();
                        }
                    }
                }
            }
            if (parent.find('#initGoodsSize .goods-size li').length == 2) {
                parent.find('#addGoodsTable').html(' ');
                parent.find('#editLeft').html('<ul class="goods-color">\
									<li><input type="text" class="goods-color-text" id="goodsColorText" /></li>\
									<li><input type="text" class="color-input goods-color-input" id="goodsColorInput" /><span class="color"></span></li>\
									<li><img width="0" height="0" class="goods-image" id="goodsImage" /></li>\
									<li>\
										<a href="javascript:;">上传图片</a>\
										<form action="" method="post" target="iframe-input-1" enctype="multipart/form-data">\
											<input type="file" name="image" accept="image/*" class="photo-upload-input input file add-file" data-type="1">\
										</form>\
									</li>\
									<li><a href="javascript:;" class="save-goods-color">保存</a></li>\
								</ul>');
            }
            $(this).parent('li').remove();
        });
        //创建表格
        function creatTableColor(json) {
            var that = json.that;
            if (that.parents('.edit-order').find("#addGoodsTable").find('tr.title').length == 0) {
                var tableStr = '<tr class="title">\
										<td width="150">商品颜色</td>\
										<td width="190">商品规格</td>\
										<td width="242">价格</td>\
										<td width="242">库存</td>\
										<td width="242">物料编号</td>\
									</tr>\
									<tr date-color="' + json.dateColor + '" class="tr">\
										<td class="border goods-color-text" rowspan="1">' + json.goodsColorText + '</td>\
										<td class="border size-gthis-val">' + json.sizeGthisVal + '</td>\
										<td class="border"><input type="text" class="goods-price" /></td>\
										<td class="border"><input type="text" class="goods-number" /></td>\
										<td class="border"><input type="text" class="material-code" /></td>\
									</tr>';
                that.parents('.edit-order').find("#addGoodsTable").append(tableStr);
            } else {
                var sizeTd = that.parents('.edit-order').find("#addGoodsTable").find('td.size-gthis-val');
                if ($(sizeTd[0]).html() == '') {
                    var tableStr = '<tr date-color="' + json.dateColor + '" class="tr">\
									<td class="border goods-color-text" rowspan="1">' + json.goodsColorText + '</td>\
									<td class="border size-gthis-val">' + json.sizeGthisVal + '</td>\
									<td class="border"><input type="text" class="goods-price" /></td>\
									<td class="border"><input type="text" class="goods-number" /></td>\
									<td class="border"><input type="text" class="material-code" /></td>\
								</tr>';
                } else {

                    var sizeTr = that.parents('.edit-order').find("#addGoodsTable").find('tr.tr');
                    var dateColorTr = $(sizeTr[0]).attr('date-color');
                    var trSizeAll = that.parents('.edit-order').find("#addGoodsTable").find('tr[date-color=' + dateColorTr + ']');
                    var tableStr = '';
                    var rowSpan = $($(trSizeAll)[0]).find('.goods-color-text').attr('rowspan');
                    for (var i = 0; i < trSizeAll.length; i++) {
                        var oTr = trSizeAll[i];
                        var sizeVal = $(oTr).find('.size-gthis-val').html();
                        var dateSize = $(oTr).find('.size-gthis-val').attr('date-size');
                        if (trSizeAll.length == 1) {
                            tableStr += '<tr date-color="' + json.dateColor + '" class="tr">\
										<td class="border goods-color-text" rowspan="' + rowSpan + '">' + json.goodsColorText + '</td>\
										<td class="border size-gthis-val" date-size="' + dateSize + '">' + sizeVal + '</td>\
										<td class="border"><input type="text" class="goods-price" /></td>\
										<td class="border"><input type="text" class="goods-number" /></td>\
										<td class="border"><input type="text" class="material-code" /></td>\
									</tr>';
                        } else {
                            if (i == 0) {
                                tableStr += '<tr date-color="' + json.dateColor + '" class="tr">\
										<td class="goods-color-text" rowspan="' + rowSpan + '">' + json.goodsColorText + '</td>\
										<td class="size-gthis-val" date-size="' + dateSize + '">' + sizeVal + '</td>\
										<td><input type="text" class="goods-price" /></td>\
										<td><input type="text" class="goods-number" /></td>\
										<td><input type="text" class="material-code" /></td>\
									</tr>';
                            } else if (i == trSizeAll.length - 1) {
                                tableStr += '<tr date-color="' + json.dateColor + '">\
										<td class="border size-gthis-val" date-size="' + dateSize + '">' + sizeVal + '</td>\
										<td class="border"><input type="text" class="goods-price" /></td>\
										<td class="border"><input type="text" class="goods-number" /></td>\
										<td class="border"><input type="text" class="material-code" /></td>\
									</tr>';
                            } else {
                                tableStr += '<tr date-color="' + json.dateColor + '">\
										<td class="size-gthis-val" date-size="' + dateSize + '">' + sizeVal + '</td>\
										<td><input type="text" class="goods-price" /></td>\
										<td><input type="text" class="goods-number" /></td>\
										<td><input type="text" class="material-code" /></td>\
									</tr>';
                            }
                        }
                    }
                }
                that.parents('.edit-order').find("#addGoodsTable").append(tableStr);
            }
        }

        //创建规格
        function creatTableSize(json,that) {
            var aTr = that.parents('.edit-order').find("#addGoodsTable").find('.tr');
            for (var i = 0; i < aTr.length; i++) {
                var oTr = aTr[i];
                var dateColor = $(oTr).attr('date-color');
                var rowSpan = parseInt($(oTr).find('.goods-color-text').attr('rowspan'));
                var colorTest = $(oTr).find('.goods-color-text');
                if (colorTest.siblings('.size-gthis-val').html() == '') {
                    colorTest.siblings('.size-gthis-val').html(json.sizeGthisVal);
                    colorTest.siblings('.size-gthis-val').attr('date-size', json.dizeDel);
                } else {
                    rowSpan++;
                    var tdStr = '<tr date-color="' + dateColor + '">\
							商品管理模块		<td class="border size-gthis-val" date-size="' + json.dizeDel + '">' + json.sizeGthisVal + '</td>\
									<td class="border"><input type="text" class="goods-price" /></td>\
									<td class="border"><input type="text" class="goods-number" /></td>\
									<td class="border"><input type="text" class="material-code" /></td>\
								</tr>';
                    $(oTr).siblings('tr[date-color=' + dateColor + ']').find('td').removeClass('border');
                    $(oTr).find('td').removeClass('border');
                    $(oTr).find('td.goods-color-text').addClass('border');
                    var oTrAfter = $(oTr).siblings('tr[date-color=' + dateColor + ']');
                    if (oTrAfter.length == 0) {
                        $(oTr).after(tdStr);
                    } else {
                        $(oTrAfter[oTrAfter.length - 1]).after(tdStr);
                    }
                }
                colorTest.attr('rowspan', rowSpan);
            }
        }
    };
    /**
     * 添加商品
     */
    oGoods.add = function () {
        var that = this;
        $('.goods-add').live('click', function () {
            $('#add-goods').html('<div>\
				<h1 class="title">添加商品</h1>\
				<div class="close-x"></div>\
			</div>\
			<ul class="goods-detial">\
				<li class="detial1">\
					<p class="left line1"><span class="c9"><span class="r">*</span>商品编号：</span><span class="c3" ><input type="text" class="add-goods-sn" id="goods-sn" /></span></p>\
					<p class="right line1"><span class="c9"><span class="r">*</span>商品名称：</span><span class="c3"><input type="text" class="add-goods-name" id="goods-name" /></span></p>\
					<p class="right line1"><span class="c9">\
					    <span class="r">*</span>商品状态：</span>\
					    <select id="goods-status" value="status">\
                            <option date-s="1">上架</option>\
                            <option date-s="2">下架</option>\
                        </select>\
                    </p>\
				</li>\
				<li class="introdu">\
					<p class="left"><span class="r">*</span>商品介绍：</p>\
					<div class="right introdu-box">\
					    <form class="add-introdu-form float-l" action="" method="post" target="iframe-input-1" enctype="multipart/form-data">\
                            <p class="add-img-box no-boder"><img class="image" src="../images/addImg.jpg"></p>\
                            <input type="file" name="image" accept="image/*" class="add-order-introdu" data-type="1">\
                        </form>\
					</div>\
				</li>\
				<li class="margin-none">\
					<ul>\
						<li class="detial-color edit-left">\
							<p class="left"><span class="r">*</span>商品颜色：</p>\
							<div class="right" id="editLeft">\
								<ul class="goods-color">\
									<li><input type="text" class="goods-color-text" id="goodsColorText" /></li>\
									<li><input type="text" class="color-input goods-color-input" id="goodsColorInput" /><span class="color"></span></li>\
									<li><img width="0" height="0" class="goods-image" id="goodsImage" /></li>\
									<li>\
										<a href="javascript:;">上传图片</a>\
										<form class="add-img-form" action="" method="post" target="iframe-input-1" enctype="multipart/form-data">\
											<input type="file" id="uploadPicture" name="image" accept="image/*" class="photo-upload-input input file add-file" data-type="1">\
										</form>\
									</li>\
									<li><a href="javascript:;" class="save-goods-color">保存</a></li>\
								</ul>\
							</div>\
						</li>\
						<li class="detial-color edit-right">\
							<p class="left"><span class="r">*</span>商品规格:</p>\
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
            $('#add-goods .save').die().live('click', function () {
                // 错误提示
                // 商品编号
                if( !$('#add-goods').find('.add-goods-sn').val() ){
                    alert('请输入商品编号！');
                    return;
                }
                // 商品名称
                if( !$('#add-goods').find('.add-goods-name').val() ){
                    alert('请输入商品名称！');
                    return;
                }
                // 商品介绍
                if( $('#add-goods').find('.introdu .right').children().length == 1 ){
                    alert('请添加商品介绍！');
                    return;
                }
                // 商品颜色
                if( $('#add-goods #editLeft').children().length == 1 ){
                    if( !$('#add-goods .goods-color-text').val() || !$('#add-goods .goods-color-input').val() ){
                        alert('请输入商品颜色！')
                        return;
                    }
                    alert('请添加商品颜色！');
                    return;
                }else{
                    var bFlag1 = false,
                        bFlag2 = false,
                        bFlag3 = false,
                        bFlag4 = false,
                        bFlag5 = false,
                        bFlag6 = false;
                    // 商品颜色
                    $('#add-goods .add-goods-text').each(function(){
                        if( !$(this).val() ){
                            bFlag1 = true;
                        }
                    });
                    // 商品颜色编码
                    $('#add-goods .add-goods-input').each(function(){
                        if( !$(this).val() ){
                            bFlag2 = true;
                        }
                    });
                    // 商品规格
                    if( $('#initGoodsSize .goods-size').children().length == 1 ){
                        alert('请添加商品规格！');
                        return;
                    }else{
                        if( !$('#add-goods .add-goods-size').val() ){
                            alert('请输入商品规格！');
                            return;
                        }
                    }
                    //库存不能为小数
                    $('#add-goods .goods-number').each(function(){
                        if( !$(this).val() || isNaN($(this).val())){
                            bFlag3 = true;
                            return;
                        }
                    });
                    // 价格不能为空、或非数字
                    $('#add-goods .goods-price').each(function(){
                        if( !$(this).val() || isNaN($(this).val())){
                            bFlag4 = true;
                            return;
                        }
                    });
                    // 物料编号
                    $('#add-goods .material-code').each(function(){
                        if( !$(this).val() ){
                            bFlag5 = true;
                            return;
                        }
                    });
                    if( bFlag1 || bFlag2 ){
                        alert('请输入商品颜色！');
                        return;
                    }
                    if( bFlag4 ){
                        alert('请正确输入价格！');
                        return;
                    }
                    if( bFlag3 ){
                        alert('请正确输入库存！');
                        return;
                    }
                    if( bFlag5 ){
                        alert('请输入物料编号！');
                        return;
                    }
                }

                var sSn = $('#add-goods #goods-sn').val(),//商品编号
                    sName = $('#add-goods #goods-name').val(),//商品名字
                    sColorText,                          //商品颜色文字
                    sColorEng,                           //商品颜色
                    sSize,                               //商品规格
                    sPrice,                              //商品价钱
                    sIntrodu = [],                       //商品介绍
                    inventory,                           //商品库存
                    iColor = $('.goods-color-add').length,//商品颜色个数
                    sStatus = $('#add-goods #goods-status option:selected').attr('date-s'),//商品状态
                    sMaterial;    //物料编码
                for(var i=0 ; i<$('.introdu-box .add-img-box').length-1 ; i++){
                    sIntrodu.push($('.introdu-box .add-img-box').eq(i).find('img').attr('src'));
                }
                var goodsDomensions = [];
                // 商品规格个数、颜色个数
                var sizeCount = $('#add-goods .edit-goods-size').length,
                    colorCount = $('#add-goods #editLeft .goods-color');

                for (var i = 1; i < colorCount.length; i++) {
                    var sColorText = colorCount.eq(i).find('.goods-color-text').val(),// 商品颜色
                        sColorEng = colorCount.eq(i).find('.goods-color-input').val(),// 商品颜色编码
                        imgageGoods = colorCount.eq(i).find('.goods-image'),// 商品图片
                        imageeDomensionId = imgageGoods.attr('data-imgid'), // 图片ID
                        imageSrc = imgageGoods.attr('src'),                 // 图片url
                        json = {};
                    // 图片信息
                    var imageArr = [{
                        "domensionId": imageeDomensionId,                   // 图片ID
                        "imageURL": imageSrc                                // 图片url
                    }];
                    // 商品信息
                    for (var j = (i-1)*sizeCount; j < ((i-1)*sizeCount+sizeCount) ; j++) {
                        var sSize = $('#add-goods .edit-goods-size').eq(j%sizeCount).val(),           // 商品规格
                            sPrice = $('#add-goods').find('.goods-price').eq(j).val(),     // 商品价格
                            inventory = $('#add-goods').find('.goods-number').eq(j).val(), // 商品库存
                            sMaterial = $('#add-goods').find('.material-code').eq(j).val();// 物料编号
                        json = {
                            'color': sColorText,        //颜色
                            'colorCode': sColorEng,     //颜色编码
                            'goodsId': '',              //商品ID
                            'images': imageArr,         //图片信息
                            'inventory': inventory,     //库存
                            'materialCode': sMaterial,  //物料编码
                            'price': sPrice*100,        //价格，元转分
                            'size': sSize               //规格大小
                        };
                        goodsDomensions.push(json);
                    }
                }
                var data = JSON.stringify({
                    "goodsDomensions": goodsDomensions,
                    "id": '',
                    "introduction": sIntrodu.toString(),
                    "name": sName,
                    "sn": sSn,
                    "status": sStatus
                });

                // 添加商品
                $.ajax({
                    url: eightUrl + 'goods/create',
                    type: 'post',
                    dataType: 'json',
                    data: data,
                    contentType: 'application/json; charset=utf-8',
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
                    success: function (json) {
                        $('#add-goods,.mask-bg').hide();
                        if($('#order-page li.active').html()){
                            that.create($('#order-page li.active').html()-1);
                        }else{
                            that.create(0);
                        }
                    },
                    error : function(json){
                        var json = json.responseText;
                        message = JSON.parse(json).message;
                        // 已经存在该商品
                        alert(message);
                    }
                });
            });
        });
    };
    /**
     * 获取商品详情
     */
    oGoods.detail = function (id) {
        $('.goods-num').die().live('click', function () {
            var id = $(this).attr('data-id');
            $.ajax({
                url: eightUrl + 'goods/detail/' + id,
                type: 'get',
                contentType: 'application/json; charset=utf-8',
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
                success: function (json) {
                    var data = json;
                    var goodsDomensions = data.goodsDomensions, //商品信息
                        statusGoods = parseInt(data.status),    //状态
                        idGoods = goodsDomensions[0].goodsId,   //商品id
                        introduArr = data.introduction.split(',');//商品介绍
                        introdu = '';
                    for(var i=0 ; i<introduArr.length ; i++){
                        introdu += '<p class="add-img-box no-border float-l"><img class="image" src="'+introduArr[i]+'"></p>';
                    }
                    var htmlStr = '<div>\
										<h1 class="title" data-id="' + idGoods + '">商品详情</h1>\
										<div class="close-x"></div>\
									</div>\
									<ul class="goods-detial">\
										<li class="detial1">\
											<p class="left line1"><span class="c9">商品编号：</span><span class="c3" >' + data.sn + '</span></p>\
											<p class="right line1"><span class="c9">商品名称：</span><span class="c3">' + data.name + '</span><\/p>\
											<p class="right line1"><span class="c9"><span class="r">*</span>商品状态：</span><select id="goods-status-detial" value="status">\
														<option data-s="1">上架</option>\
														<option data-s="2">下架</option>\
													</select></p>\
										</li>\
										<li>\
											<div class="left">商品介绍：</div>\
											<div class="right">'+introdu+'</p>\
										</li>\
										<li class="margin-none">\
											<ul>\
												<li class="detial-color">\
													<p class="left">商品颜色：</p>\
													<div class="right" id="detial-color">\
													</div>\
												</li>\
												<li class="detial-color">\
													<p class="left">商品规格:</p>\
													<div class="right">\
														<ul class="goods-size" id="detial-size">\
														</ul>\
													</div>\
												</li>\
											</ul>\
										</li>\
									</ul>\
									<table width="870" cellspacing="0" cellspacing="0" border="0" class="detial-table b">\
										<tr class="title">\
											<td width="217">商品颜色</td>\
											<td width="200">商品规格</td>\
											<td width="150">价格</td>\
											<td width="148">库存</td>\
											<td width="220">物料编号</td>\
										</tr>\
									</table>\
									<p class="btn-e">\
										<a href="javascript:;" class="save">保存</a>\
										<a href="javascript:;" class="canle">取消</a>\
									</p>';
                    $('#detial').html(htmlStr);

                    if (statusGoods == 1) {
                        $('#detial #goods-status-detial option').eq(0).attr("selected", true);
                    } else {
                        $('#detial #goods-status-detial option').eq(1).attr("selected", true);
                    }

                    for (var i = 0; i < goodsDomensions.length; i++) {
                        var color = goodsDomensions[i].color;
                        var colorCode = goodsDomensions[i].colorCode;
                        var size = goodsDomensions[i].size;
                        var img = goodsDomensions[i].images[0].imageURL;
                        var detialColor = '<ul class="goods-color">\
												<li>' + color + '</li>\
												<li>' + colorCode + '</li>\
												<li class="color" style="background:' + colorCode + '"></li>\
												<li><img width="24" height="24" src="' + img + '" /></li>\
											</ul>';
                        var detialSize = '<li>' + size + '</li>';
                        $('#detial #detial-color').append(detialColor);
                        $('#detial #detial-size').append(detialSize);
                    }
                    setTimeout(function () {
                        var colorText = '',
                            sizeText = [];
                        var allColor = $('#detial-color').find('.goods-color');
                        var allSize = $('#detial-size li');
                        for (var i = 0; i < allColor.length; i++) {
                            if (colorText == $(allColor[i]).find('li').eq(0).html()) {
                                $(allColor[i]).remove();
                            } else {
                                colorText = $(allColor[i]).find('li').eq(0).html();
                            }
                        }
                        for (var i = 0; i < allSize.length; i++) {
                            sizeText.push($(allSize[i]).html());
                        }
                        $('#detial-size').html('');
                        var len = sizeText.length / $('#detial-color').find('.goods-color').length;
                        for (var i = 0; i < len; i++) {
                            var detialSize = '<li>' + sizeText[i] + '</li>';
                            $('#detial-size').append(detialSize);
                        }
                        var tableTrOne = '';
                        for (var i = 0; i < $('#detial-color .goods-color').length; i++) {
                            var goodsColor = $($('#detial-color .goods-color')[i]).find('li').eq(0).html();
                            var sizeLen = $('#detial-size li').length;
                            for (var j = 0; j < sizeLen; j++) {
                                if (j == 0) {
                                    tableTrOne += '<tr>\
													<td width="217" rowspan="' + sizeLen + '">' + goodsColor + '</td>\
													<td width="200" class="sizeDetial"></td>\
													<td width="150" class="priceGoods"></td>\
													<td width="148" class="numberGoods"></td>\
													<td width="220" class="snGoods"></td>\
												</tr>';
                                } else {
                                    tableTrOne += '<tr>\
													<td width="200" class="sizeDetial"></td>\
													<td width="150" class="priceGoods"></td>\
													<td width="148" class="numberGoods"></td>\
													<td width="220" class="snGoods"></td>\
												</tr>';
                                }
                            }
                        }
                        $('#detial .detial-table').append(tableTrOne);
                        for (var i = 0; i < goodsDomensions.length; i++) {
                            var inventory = goodsDomensions[i].inventory; //库存
                            var materialCode = goodsDomensions[i].materialCode; // 物料编码
                            var price = goodsDomensions[i].price/100;   //元转分
                            var size = goodsDomensions[i].size;
                            var aTr = $('#detial .detial-table tr');
                            $(aTr[i + 1]).find('.sizeDetial').html(size);
                            $(aTr[i + 1]).find('.priceGoods').html(price);
                            $(aTr[i + 1]).find('.numberGoods').html(inventory);
                            $(aTr[i + 1]).find('.snGoods').html(materialCode);
                        }
                        $('#detial,.mask-bg').show();
                        $('#detial').css({top: ($(document).scrollTop()+20)+'px'});
                    }, 100)
                },
                error: function (json) {
                }
            });
        });
    };
    /**
     * 商品详情中商品上下架
     */
    oGoods.upDown = function () {
        var that = this;
        $('#detial .save').die();
        $('#detial .save').live('click', function () {
            var urlAjax,
                status = $('#goods-status-detial option:selected').attr('data-s'),
                goodsIdGet = $('#detial .title').attr('data-id');
            if (status == '1') {
                urlAjax = eightUrl + 'goods/saleIn/' + goodsIdGet;
            } else if (status == '2') {
                urlAjax = eightUrl + 'goods/saleOut/' + goodsIdGet;
            }

            $.ajax({
                url: urlAjax,
                type: 'get',
                contentType: 'application/json; charset=utf-8',
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
                success: function (json) {
                    $('#detial,.mask-bg').hide();
                    if($('#order-page li.active').html()){
                        that.create($('#order-page li.active').html()-1);
                    }else{
                        that.create(0);
                    }
                }
            });
        });
    }
    /**
     * 商品编辑
     */
    oGoods.edit = function () {
        $('.edit-ga').die().live('click', function () {
            var id = $(this).parents('ul.line-term').find('a.goods-num').attr('data-id');
            $.ajax({
                url: eightUrl + 'goods/detail/' + id,
                type: 'get',
                contentType: 'application/json; charset=utf-8',
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
                success: function (json) {
                    var data = json,
                        idid = data.id,                             //商品主键
                        goodsDomensions = data.goodsDomensions,     //商品规格
                        statusGoods = parseInt(data.status),        //状态
                        idGoods = data.goodsDomensions[0].goodsId,  //商品ID
                        introduImg = data.introduction.split(',');  //商品介绍
                    //商品介绍
                    var orderIntrodu = '';
                    for(var i=0 ; i<introduImg.length ; i++){
                        orderIntrodu += '\
                        <form class="replace-introdu-form float-l" action="" method="post" target="iframe-input-1" enctype="multipart/form-data">\
                            <i class="introdu-remove"></i>\
                            <p class="add-img-box no-boder"><img class="image" src="'+introduImg[i]+'"></p>\
                            <input type="file" name="image" accept="image/*" class="replace-order-introdu" data-type="1">\
                        </form>';
                    }
                    orderIntrodu += '\
                        <form class="add-introdu-form float-l" action="" method="post" target="iframe-input-1" enctype="multipart/form-data">\
                            <p class="add-img-box no-boder"><img class="image" src="../images/addImg.jpg"></p>\
                            <input type="file" name="image" accept="image/*" class="add-order-introdu" data-type="1">\
                        </form>';

                    var htmlStr = '<div>\
                                    <h1 class="title" data-id="' + idGoods + '" data-outid="' + idid + '" data-goodsId="'+id+'">编辑商品</h1>\
                                    <div class="close-x"></div>\
                                  </div>\
                                  <ul class="goods-detial">\
                                    <li class="detial1">\
                                      <p class="left line1"><span class="c9">商品编号：</span><span class="c3">\
                                        <input type="text" id="goods-sn" class="edit-goods-sn" value="' + data.sn + '">\
                                        </span></p>\
                                      <p class="right line1"><span class="c9">商品名称：</span><span class="c3">\
                                        <input type="text" id="goods-name" class="edit-goods-name" value="' + data.name + '">\
                                        </span></p>\
                                      <p class="right line1"><span class="c9"><span class="r">*</span>商品状态：</span>\
                                        <select id="goods-status-edit" value="status">\
                                          <option date-s="1">上架</option>\
                                          <option date-s="2">下架</option>\
                                        </select>\
                                      </p>\
                                    </li>\
                                    <li>\
                                      <p class="left">商品介绍：</p>\
                                      <div class="right edit-introdu">'+orderIntrodu+'\
                                      </div>\
                                    </li>\
                                    <li class="margin-none">\
                                      <ul>\
                                        <li class="detial-color edit-left">\
                                          <p class="left">商品颜色：</p>\
                                          <div class="right" id="editLeft">\
                                            <ul class="goods-color">\
                                              <li>\
                                                <input type="text" class="goods-color-text" id="goodsColorText">\
                                              </li>\
                                              <li>\
                                                <input type="text" class="color-input goods-color-input" id="goodsColorInput">\
                                                <span class="color"></span></li>\
                                              <li><img width="24" height="24" class="goods-image" id="goodsImage"></li>\
                                              <li><a href="javascript:;">上传图片</a>\
                                                <form action="" method="post" target="iframe-input-1" enctype="multipart/form-data">\
                                                    <input type="file" name="image" accept="image/*" class="photo-upload-input input file add-file" data-type="1">\
                                                </form>\
                                              </li>\
                                              <li><a href="javascript:;" class="save-goods-color">保存</a></li>\
                                            </ul>\
                                          </div>\
                                        </li>\
                                        <li class="detial-color edit-right">\
                                          <p class="left">商品规格:</p>\
                                          <div class="right" id="initGoodsSize">\
                                            <ul class="goods-size edit-goods-size-box" id="goods-size">\
                                              <li>\
                                                <input type="text" class="goods-size">\
                                                <a href="javascript:;" id="saveGoodsSize" data-goodssizedate="" class="mar-4">保存</a></li>\
                                            </ul>\
                                          </div>\
                                        </li>\
                                      </ul>\
                                    </li>\
                                  </ul>\
                                  <table width="870" cellspacing="0" border="0" class="detial-table edit-detial-table" id="addGoodsTable">\
                                      <tr class="title">\
                                      <td width="150">商品颜色</td>\
                                      <td width="190">商品规格</td>\
                                      <td width="242">价格</td>\
                                      <td width="242">库存</td>\
                                      <td width="242">物料编号</td>\
                                    </tr>\
                                  </table>\
                                  <p class="btn-e"> <a href="javascript:;" class="save">保存</a> <a href="javascript:;" class="canle">取消</a> </p>';
                    $('#eidit-goods').html(htmlStr);
                    //商品状态
                    if (statusGoods == 1) {
                        $('#goods-status-edit option').eq(0).attr("selected", true);
                    } else {
                        $('#goods-status-edit option').eq(1).attr("selected", true);
                    }
                    // 商品规格数量
                    var count = 0,
                        arr = [],
                        json = {};
                    for(var i=0 ; i<goodsDomensions.length ; i++){
                        json[goodsDomensions[i].size] = goodsDomensions[i].size;
                    }
                    for(var name in json){
                        arr.push(json[name]);
                    }
                    count = arr.length;
                    // 商品规格
                    var editSize = '';
                    if( $('#eidit-goods .edit-goods-size-box').children().length ==1 ){
                        var oldSize = '';
                        for(var j=0 ; j<arr.length ; j++){
                            var size = goodsDomensions[j].size;         //商品规格
                            if( oldSize != size || oldSize == ''){
                                oldSize = size;
                                editSize += '<li><input type="text" value="' + size + '" class="input edit-goods-size"><a href="javascript:;" class="remove" data-sizedel="' + size + '">删除</a></li>';
                            }
                        }
                        $('#eidit-goods #initGoodsSize .edit-goods-size-box').append(editSize);
                    }
                    // 商品信息
                    for (var i = 0; i < goodsDomensions.length; i+=count) {
                        var color = goodsDomensions[i].color,       //商品颜色
                            colorCode = goodsDomensions[i].colorCode,//商品颜色编码
                            img = goodsDomensions[i].images[0].imageURL,//商品图片url
                            imgId = goodsDomensions[i].images[0].domensionId,//图片ID
                            idGoods = goodsDomensions[i].goodsId,            //商品ID
                            goodsDomensionid = goodsDomensions[i].id;
                        var editeColor = '<ul class="goods-color" data-goodsid="' + idGoods + '" data-domensionid="' + imgId + '">\
                                              <li>\
                                                <input type="text" class="goods-color-text  edit-goods-color-text" value="' + color + '">\
                                              </li>\
                                              <li>\
                                                <input type="text" class="color-input edit-goods-color-input goods-color-input" value="' + colorCode + '" style="border-right-color:#aaa">\
                                                <span class="color" style="background:' + colorCode + '"></span></li>\
                                              <li><img style="width:24px;height:24px;border:1px solid #ccc;" class="goods-image" src="' + img + '" data-imgid="' + imgId + '" id="goodsImage"></li>\
                                              <li><a href="javascript:;">替换图片</a>\
                                                <form action="" method="post" target="iframe-input-1" enctype="multipart/form-data">\
                                                    <input type="file" name="image" accept="image/*" class="replace-img input file" data-type="1">\
                                                </form>\
                                              </li>\
                                              <li><a href="javascript:;" class="remove" date-del="' + color + '">删除</a></li>\
                                            </ul>';
                        $('#eidit-goods #editLeft').append(editeColor);
                    }
                    var colorText = '',
                        sizeText = [];
                    var allColor = $('#eidit-goods #editLeft').find('.goods-color');
                    var allSize = $('#eidit-goods #initGoodsSize ul').find('li .input');
                    for (var i = 0; i < allSize.length / 2; i++) {
                        sizeText.push($(allSize[i]).val());
                    }
                    $('#eidit-goods #editLeft #initGoodsSize .goods-size').html('<li><input type="text" class="goods-size"><a href="javascript:;" id="saveGoodsSize" data-goodssizedate="">保存</a></li>');
                    var len = sizeText.length / ($('#eidit-goods #editLeft .goods-color').length - 1);
                    if( ($('#eidit-goods #editLeft .goods-color').length - 1)==0 ){
                        alert('脏数据');
                        return;
                    }
                    for (var i = 0; i < len; i++) {
                        var editSize = '<li><input type="text" value="' + sizeText[i] + '"  class="input"><a href="javascript:;" class="remove" data-sizedel="' + sizeText[i] + '">删除</a></li>';
                        $('#eidit-goods #editLeft #initGoodsSize .goods-size').append(editSize);
                    }
                    var tableTrOne = '';
                    // 商品编辑列表
                    for (var i = 0; i < $('#eidit-goods #editLeft .goods-color').length; i++) {
                        if (i > 0) {
                            var goodsColor = $($('#eidit-goods #editLeft .goods-color')[i]).find('input').eq(0).val(),
                                sizeLen = $('#eidit-goods #initGoodsSize .input').length;    // 商品规格数量
                            for (var j = 0; j < sizeLen; j++) {
                                var size = $($('#eidit-goods #initGoodsSize .input')[j]).val();
                                if (j == 0) {
                                    tableTrOne += '<tr date-color="' + goodsColor + '" class="tr">\
                                                      <td class="goods-color-text border" rowspan="' + sizeLen + '">' + goodsColor + '</td>\
                                                      <td class="size-gthis-val" date-size="' + size + '">' + size + '</td>\
                                                      <td class=""><input type="text" class="goods-price"></td>\
                                                      <td class=""><input type="text" class="goods-number"></td>\
                                                      <td class=""><input type="text" class="material-code"></td>\
                                                    </tr>';
                                } else if (j == sizeLen - 1) {
                                    tableTrOne += '<tr date-color="' + goodsColor + '">\
                                                      <td class="border size-gthis-val" date-size="' + size + '">' + size + '</td>\
                                                      <td class="border"><input type="text" class="goods-price"></td>\
                                                      <td class="border"><input type="text" class="goods-number"></td>\
                                                      <td class="border"><input type="text" class="material-code"></td>\
                                                    </tr>';
                                } else {
                                    tableTrOne += '<tr date-color="' + goodsColor + '">\
                                                      <td class="size-gthis-val" date-size="' + size + '">' + size + '</td>\
                                                      <td><input type="text" class="goods-price"></td>\
                                                      <td><input type="text" class="goods-number"></td>\
                                                      <td><input type="text" class="material-code"></td>\
                                                    </tr>';
                                }
                            }
                        }
                    }
                    $('#eidit-goods #addGoodsTable').append(tableTrOne);
                    for (var i = 0; i < goodsDomensions.length; i++) {
                        var inventory = goodsDomensions[i].inventory; //库存
                        var materialCode = goodsDomensions[i].materialCode; // 物料编码
                        var price = goodsDomensions[i].price/100;           //元转分
                        var aTr = $('#eidit-goods #addGoodsTable tr');
                        $(aTr[i + 1]).find('.goods-price').val(price);
                        $(aTr[i + 1]).find('.goods-number').val(inventory);
                        $(aTr[i + 1]).find('.material-code').val(materialCode);
                    }
                    $('#eidit-goods,.mask-bg').show();
                    $('#eidit-goods').css({top: ($(document).scrollTop()+20)+'px'});
                },
                error: function (json) {
                }
            });
        });
    };
    /**
     * 商品编辑上传
     */
    oGoods.editUp = function () {
        var that = this;
        $('#eidit-goods .save').die().live('click', function () {
            var sSn = $($('#eidit-goods .detial1 input')[0]).val(),          //商品编号
                sName = $($('#eidit-goods .detial1 input')[1]).val(),        //商品名字
                iColor = $('.goods-color-add').length,                       //商品颜色个数
                sStatus = $('#eidit-goods .detial1 option:selected').attr('date-s'),//商品状态
                idid = $('#eidit-goods .title').attr('data-outid'),          //商品状态
                ID = $('#eidit-goods .title').attr('data-goodsId'),          //商品id
                goodsId = $('#eidit-goods .title').attr('data-id');          //物料编码
            // 错误提示
            // 商品编号
            if( !$('#eidit-goods').find('.edit-goods-sn').val() ){
                alert('请输入商品编号！');
                return;
            }
            // 商品名称
            if( !$('#eidit-goods').find('.edit-goods-name').val() ){
                alert('请输入商品名称！');
                return;
            }
            // 商品介绍
            if( $('#eidit-goods').find('.edit-introdu').children().length == 1 ){
                alert('请添加商品介绍！');
                return;
            }
            // 商品颜色
            if( $('#eidit-goods #editLeft').children().length == 1 ){
                if( !$('#eidit-goods .goods-color-text').val() || !$('#eidit-goods .goods-color-input').val() ){
                    alert('请输入商品颜色！')
                    return;
                }
                alert('请添加商品颜色！');
                return;
            }else{
                var bFlag1 = false,
                    bFlag2 = false,
                    bFlag3 = false,
                    bFlag4 = false,
                    bFlag5 = false;
                // 商品颜色
                $('.edit-goods-color-text').each(function(){
                    if( !$(this).val() ){
                        bFlag1 = true;
                    }
                });
                // 商品颜色编码
                $('.edit-goods-color-input').each(function(){
                    if( !$(this).val() ){
                        bFlag2 = true;
                    }
                });
                //库存不能为小数
                $('#eidit-goods .goods-number').each(function(){
                    var str = Number($(this).val());
                    var ex = /^\d+$/;
                    if (!ex.test(str)) {
                        bFlag3 = true;
                        return;
                    }else if( !$(this).val() ){
                        bFlag3 = true;
                        return;
                    }
                });
                //价格
                $('#eidit-goods .goods-price').each(function(){
                    if( !$(this).val() || isNaN($(this).val()) ){
                        bFlag4 = true;
                        return;
                    }
                });
                //物料编号
                $('#eidit-goods .material-code').each(function(){
                    if( !$(this).val() ){
                        bFlag5 = true;
                        return;
                    }
                })
                if( bFlag1 || bFlag2 ){
                    alert('请输入商品颜色！');
                    return;
                }
                if( bFlag3 ){
                    alert('请正确输入库存！');
                    return;
                }
                if( bFlag4 ){
                    alert('请正确输入价格！');
                    return;
                }
                if( bFlag5 ){
                    alert('请正确输入物料编号！');
                    return;
                }
            }
            var bFlag6 = false;
            // 商品规格
            if( $('#initGoodsSize .goods-size').children().length == 1 ) {
                alert('请添加商品规格！');
                return;
            }else{
                $('.edit-goods-size').each(function(){
                   if( !$(this).val() ){
                       bFlag6 = true;
                       return;
                   }
                });
                if( bFlag6 ){
                    alert('请添加商品规格！');
                    return;
                }
            }

            var goodsDomensions = [],
                sIntrodu = [];
            // 商品介绍
            for(var  i=0 ; i<$('#eidit-goods .replace-introdu-form').length ; i++){
                sIntrodu.push($('#eidit-goods .replace-introdu-form').eq(i).find('.image').attr('src'));
            }
            // 商品规格个数、颜色个数
            var sizeCount = $('#eidit-goods .edit-goods-size').length,
                colorCount = $('#eidit-goods #editLeft .goods-color');

            for (var i = 1; i < colorCount.length; i++) {
                var sColorText = colorCount.eq(i).find('.goods-color-text').val(),// 商品颜色
                    sColorEng = colorCount.eq(i).find('.goods-color-input').val(),// 商品颜色编码
                    imgageGoods = colorCount.eq(i).find('.goods-image'),// 商品图片
                    imageeDomensionId = imgageGoods.attr('data-imgid'), // 图片ID
                    imageSrc = imgageGoods.attr('src'),                 // 图片url
                    json = {};
                // 图片信息
                var imageArr = [{
                    "domensionId": imageeDomensionId,                   // 图片ID
                    "imageURL": imageSrc                                // 图片url
                }];
                // 商品信息
                for (var j = (i-1)*sizeCount; j < ((i-1)*sizeCount+sizeCount) ; j++) {
                    //var sSize = $('#eidit-goods .edit-goods-size').eq((((i-1)*sizeCount+sizeCount)-j-1)%sizeCount).val(),             // 商品规格
                    var sSize = $('#eidit-goods .edit-goods-size').eq(j%sizeCount).val(),             // 商品规格
                        sPrice = $('#eidit-goods').find('.goods-price').eq(j).val(),     // 商品价格
                        inventory = $('#eidit-goods').find('.goods-number').eq(j).val(), // 商品库存
                        sMaterial = $('#eidit-goods').find('.material-code').eq(j).val();// 物料编号
                    json = {
                        'color': sColorText,        //颜色
                        'colorCode': sColorEng,     //颜色编码
                        'goodsId': goodsId,         //商品ID
                        'images': imageArr,         //图片信息
                        'inventory': inventory,     //库存
                        'materialCode': sMaterial,  //物料编码
                        'price': sPrice*100,        //价格，元转分
                        'size': sSize               //规格大小
                    };
                    goodsDomensions.push(json);
                }
            }
            var data = JSON.stringify({
                "goodsDomensions": goodsDomensions,
                "id": idid,
                "introduction": sIntrodu.toString(),
                "name": sName,
                "sn": sSn,
                "status": sStatus
            });
            $.ajax({
                url: eightUrl + 'goods/modify',
                type: 'post',
                dataType: 'json',
                data: data,
                contentType: 'application/json; charset=utf-8',
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
                success: function (json) {
                    $('#eidit-goods,.mask-bg').hide();
                    if($('#order-page li.active').html()){
                        that.create($('#order-page li.active').html()-1);
                    }else{
                        that.create(0);
                    }
                },
                error : function(json){
                    var message = JSON.parse(json.responseText).message;
                    alert(message);
                }
            });
        })
    };
    /**
     * 商品介绍添加图片
     */
    oGoods.introdu = function(){
        //添加商品介绍
        $('.add-order-introdu').die().live('change', function(){
            var that = $(this);
            var s = $(this).parents(".add-introdu-form");
            var formData = new FormData(s[0]);
            $.ajax({
                url: eightUrl + 'goods/uploadImage',
                crossDomain: true,
                type: "POST",
                beforeSend: function (xhr) {
                    // json格式传输，后台应该用@RequestBody方式接受
                    //xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    var token = $.cookie("token");
                    if (token) {
                        xhr.setRequestHeader("X-Access-Auth-Token", token);
                    }
                },
                xhrFields: {
                    withCredentials: true // 确保请求会携带上Cookie
                },
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (result) {
                    that.parents('.add-introdu-form').before('\
                        <form class="replace-introdu-form float-l" action="" method="post" target="iframe-input-1" enctype="multipart/form-data">\
                            <i class="introdu-remove"></i>\
                            <p class="add-img-box no-border"><img class="image" src="'+result+'"></p>\
                            <input type="file" name="image" accept="image/*" class="replace-order-introdu" data-type="1">\
                        </form>');
                },
                error: function (respResult) {
                    var message = JSON.parse(respResult.responseText).message;
                    if (respResult.status == 401) {
                        alert("超时，请重新登录");
                        window.location.href = "login.html";
                    }
                    alert(message);
                }
            });
        });
        //商品介绍更换图片
        $('.replace-order-introdu').die().live('change', function(){
            var that = $(this);
            var s = $(this).parents(".replace-introdu-form");
            var formData = new FormData(s[0]);
            $.ajax({
                url: eightUrl + 'goods/uploadImage',
                crossDomain: true,
                type: "POST",
                beforeSend: function (xhr) {
                    // json格式传输，后台应该用@RequestBody方式接受
                    //xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    var token = $.cookie("token");
                    if (token) {
                        xhr.setRequestHeader("X-Access-Auth-Token", token);
                    }
                },
                xhrFields: {
                    withCredentials: true // 确保请求会携带上Cookie
                },
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (result) {
                    that.parents('.replace-introdu-form').find('.image').attr('src', result);
                },
                error: function (respResult) {
                    var message = JSON.parse(respResult.responseText).message;
                    if (respResult.status == 401) {
                        alert("超时，请重新登录");
                        window.location.href = "login.html";
                    }
                    alert(message);
                }
            });
        });
        // 删除商品介绍
        $('.introdu-remove').die().live('click', function(){
            $(this).parents('.replace-introdu-form').remove();
        });
    };
    /**
     * 替换图片
     */
    oGoods.replace = function(){
        $('.replace-img').die().live('change', function(){
            var that = $(this);
            var s = $(this).parents("form");
            var formData = new FormData(s[0]);
            $.ajax({
                url: eightUrl + 'goods/uploadImage',
                crossDomain: true,
                type: "POST",
                beforeSend: function (xhr) {
                    // json格式传输，后台应该用@RequestBody方式接受
                    //xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    var token = $.cookie("token");
                    if (token) {
                        xhr.setRequestHeader("X-Access-Auth-Token", token);
                    }
                },
                xhrFields: {
                    withCredentials: true // 确保请求会携带上Cookie
                },
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (result) {
                    that.parents('.goods-color').find('.goods-image').attr({src : result});
                },
                error: function (respResult) {
                    var message = JSON.parse(respResult.responseText).message;
                    if (respResult.status == 401) {
                        alert("超时，请重新登录");
                        window.location.href = "login.html";
                    }
                    alert(message);
                }
            });
        });
    };
    /**
     * 商品上架下架
     */
    oGoods.status = function () {
        var _this = this;
        $('.goods-details a.status-goods-query').die();
        $('.goods-details a.status-goods-query').live('click', function () {
            var that = $(this);
            var status = $(this).attr('date-s');
            var data, urlAjax;
            var goodsIdGet = $(this).parents('ul.line-term').find('a.goods-num').attr('data-id');
            if (status == '1') {
                urlAjax = eightUrl + 'goods/saleIn/' + goodsIdGet;
            } else if (status == '2') {
                urlAjax = eightUrl + 'goods/saleOut/' + goodsIdGet;
            }
            $('#goods-pop,.mask-bg').show();
            $('#goods-pop').css({top: ($(document).scrollTop()+20)+'px'});
            if( status == 1){
                $('#goods-pop .small-pop-text').html('确定上架么？');
            }else if( status == 2 ){
                $('#goods-pop .small-pop-text').html('确定下架么？');
            }
            $('#goods-pop .deter').die().live('click', function(){
                $.ajax({
                    url: urlAjax,
                    type: 'get',
                    contentType: 'application/json; charset=utf-8',
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
                    success: function (json) {
                        $('#goods-pop,.mask-bg').hide();
                        if($('#order-page li.active').html()){
                            _this.create($('#order-page li.active').html()-1);
                        }else{
                            _this.create(0);
                        }
                    },
                    error : function(json){
                        var message = JSON.parse(json.responseText).message;
                        alert(message);
                        $('#goods-pop,.mask-bg').hide();
                    }
                });
            });

        });
    }
    /**
     * 关闭弹窗
     */
    oGoods.close = function () {
        $('.close-x,.canle').die().live('click', function () {
            $(this).parents('.goods-close').hide();
            $('.mask-bg').hide();
        });
    };
    exports.goods = oGoods;
});
