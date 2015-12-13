define(function(require, exports, module) {
    var operation = {};
    // 模块列表
    var moduleList = [
        '订单管理模块',
        '售后管理模块',
        '商品管理模块',
        '用户管理模块',
        '后台人员管理模块',
        '订单导入导出模块'
    ];
    // 列表名称
    var listName = [
        '订单列表',
        '售后列表',
        '商品列表',
        '用户列表',
        '后台人员列表',
        '订单导出'
    ];
    // 订单管理
    var orderName = [
        '订单列表',
        '查看订单',
        '编辑订单'
    ];
    // 商品管理
    var goodsName = [
        '商品列表',
        '查看商品',
        '编辑商品'
    ];
    // 系统管理
    var adminName = [
        '后台人员列表',
        '编辑后台人员',
        '查看后台人员'
    ];
    /**
     * 初始化
     */
    operation.init = function () {
        var that = this;
        that.ajax(init)
        function init(json) {
            for(var name in json){
                var operationList = json[name].operationList;
                for(var i=0 ; i<operationList.length ; i++){
                    // 订单管理
                    if( operationList[i].name == listName[0] ){
                        $('.order-icon').show();
                    }
                    // 售后管理
                    if( operationList[i].name == listName[1] ){
                        $('.after-icon').show();
                    }
                    // 商品管理
                    if( operationList[i].name == listName[2] ){
                        $('.goods-icon').show();
                    }
                    // 用户管理
                    if( operationList[i].name == listName[3] ){
                        $('.user-icon').show();
                    }
                    // 系统管理
                    if( operationList[i].name == listName[4] ){
                        $('.admin-icon').show();
                    }
                    // 订单导出
                    if( operationList[i].name == listName[5] ){
                        $('#export').css({display: 'block'});
                    }
                }
                operation.order();
            }
        }
    };
    /**
     * 订单模块
     */
    operation.order = function(){
        var that = this;
        that.ajax(order);
        function order(json){
            for(var name in json){
                if( json[name].module == moduleList[0] ){
                    var operationList = json[name].operationList;
                    for(var order in operationList){
                        // 订单详情
                        if( operationList[order].name == orderName[1] ){
                            $('.order-details-btn').show();
                        }
                        // 订单详情
                        if( operationList[order].name == orderName[2] ){
                            $('.order-edit-btn').show();
                        }
                    }
                }
                var operationList = json[name].operationList;
                for(var i=0 ; i<operationList.length ; i++){
                    // 订单导出
                    if( operationList[i].name == listName[5] ){
                        $('#export').css({display: 'block'});
                    }
                }

            }
        }
    };
    /**
     * 商品模块
     */
    operation.goods = function(){
        var that = this;
        that.ajax(goods);
        function goods(json){
            for(var name in json){
                if( json[name].module == moduleList[2] ){
                    var operationList = json[name].operationList;
                    var bFlag = true;
                    for(var order in operationList){
                        // 商品编辑
                        if( operationList[order].name == goodsName[2] ){
                            $('.edit-ga').show();
                            $('.goods-add').css({display: 'block'});
                            bFlag = false;
                        }
                    }
                    if( bFlag ){
                        $('.goods-operation-box').html('<p><a href="javascript:;">无权限操作</a></p>');
                    }
                }
            }
        }
    };
    /**
     * 系统管理模块
     */
    operation.admin = function(){
        var that = this;
        that.ajax(admin);
        function admin(json){
            for(var name in json){
                if( json[name].module == moduleList[4] ){
                    var operationList = json[name].operationList;
                    for(var order in operationList){
                        // 订单详情
                        if( operationList[order].name == adminName[2] ){
                            $('.admin-edit').show();
                            $('#add-admin-btn').css({display: 'block'});
                        }
                    }
                }
            }
        }
    };
    /**
     * 模块ajax
     * @param success
     */
    operation.ajax = function(success){
        var roleId = $.cookie('roleId');
        $.ajax({
            url: eightUrl + 'acs/operations/' + roleId,
            type: 'get',
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
            success: success,
            error: function (json) {
                var json = JSON.parse(json.responseText);
                alert(json.message);
            }
        });
    }

    return operation;
});