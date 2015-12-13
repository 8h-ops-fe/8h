define(function(require, exports, module){
    //创建对象
    var oAdmin = {};
    var operation = require('operation');   // 权限管理

    oAdmin.init = function(){
        this.list();    //管理员列表
        this.page();    //分页
        this.query();   //查询
        this.add();     //添加
        this.role();    //角色管理
        this.operation();//启用禁用
        this.details(); //查看后台人员详情
        this.edit();    //后台人员编辑
        this.editPassword();//修改密码
        this.close();   //关闭
    };

    /**
     * 管理员列表
     * @param data
     */
    oAdmin.list = function(pageNum, data){
        pageNum = pageNum || 0;
        var json = JSON.stringify({
            page : pageNum,
            pageSize : 10
        });
        var data = data || json;

        $.ajax({
            url : eightUrl+'staff/query',
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
                // 权限管理
                operation.admin();
                var aContent = json.content,    //返回用户数据
                    totalPages = json.totalPages; // 总页数
                $('#order-page').remove();
                $('.no-data-box,.admin-list-box').html('');
                // 如果没有数据
                if( json.content == ''){
                    $('.no-data-box').html('<h1 class="no-data">暂无数据</h1>');
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
                    $('#order-page li').eq(pageNum).addClass('active');
                }
                var adminList = '';
                // 初始化列表
                for(var i=0 ; i<aContent.length ; i++){
                    var adminName = aContent[i].username,    //用户名
                        time = aContent[i].lastLoginTime,       //最近登陆时间
                        id = aContent[i].id,                 //id
                        oData = new Date(time),
                        year = toDable(oData.getFullYear()),
                        month = toDable(oData.getMonth()+ 1),
                        date = toDable(oData.getDate()),
                        hour = toDable(oData.getHours()),
                        minute = toDable(oData.getMinutes()),
                        updateYear = year+'-'+month+'-'+date,//最近登陆时间
                        updateDay = hour+':'+minute,         //最近登陆时间
                        status = aContent[i].status==1 ? '已启用' : '已禁用',//状态
                        status2 = aContent[i].status==1 ? '禁用' : '启用';  //操作
                    if( !aContent[i].lastLoginTime ){
                        updateYear = '——';
                        updateDay = '——';
                    }
                    var passwordText = '';
                    if($.cookie('roleId') == 1 ){
                        passwordText = '<span class="edit-password-text">修改密码</span>';
                    }
                    adminList+='\
                        <dd data-id="'+id+'" class="admin-list-box">\
                            <ul class="line">\
                                <li class="w240 blue see-details cursor">'+adminName+'</li>\
                                <li class="w242">\
                                    <span class="margin-r-10">'+updateYear+' '+updateDay+'</span>\
                                </li>\
                                <li class="w242">'+status+'</li>\
                                <li class="w240 blue  no-boder admin-operation-box">\
                                    <span class="admin-edit cursor">编辑</span>\
                                    <span class="admin-operation">'+status2+'</span>'+passwordText+'\
                                </li>\
                            </ul>\
                        </dd>';
                }
                $('.admin-list-box').html(adminList);
            },
            error : function(json){
                var json = JSON.parse(json.responseText);
                alert(json.message);
            }
        })
    };
    /**
     * 分页
     */
    oAdmin.page = function(){
        var that = this;
        $('#order-page li').die().live('click', function(){
            $('#order-page li').removeClass('active');
            $(this).addClass('active');
            var username = $('.admin-username').val(),    //用户名
                startTime = $('.start-time').val(),       //开始时间
                endTime = $('.ent-time').val(),           //结束时间
                status = 0;                               //状态码
            // 更新状态码
            $('.order-radio').each(function(){
                if( $(this).attr('checked') ){
                    status = $(this).val();
                }
            });
            if( status != 0){
                var data = JSON.stringify({
                    username : username,
                    endCreateTime : endTime,
                    startCreateTime : startTime,
                    status : status,
                    page: $(this).html()-1,
                    pageSize: 10
                });
            }else{
                var data = JSON.stringify({
                    username : username,
                    endCreateTime : endTime,
                    startCreateTime : startTime,
                    page: $(this).html()-1,
                    pageSize: 10
                });
            }
            console.log(data);
            that.list($(this).html()-1 ,data);
        });
    };
    /**
     * 查询
     */
    oAdmin.query = function(){
        var that = this;
        $('.admin-search').die().live('click', function(){
            var startTime = $('.start-time').val(),
                endTime = $('.end-time').val();
            if( startTime > endTime && startTime && endTime){
                alert('开始时间必须小于结束时间！');
                return false;
            }
            var username = $('.admin-username').val(),    //用户名
                startTime = $('.start-time').val(),       //开始时间
                endTime = $('.end-time').val(),           //结束时间
                status = 0;                               //状态码
            // 更新状态码
            $('.order-radio').each(function(){
                if( $(this).attr('checked') ){
                    status = $(this).val();
                }
            });
            if( status != 0){
                var data = JSON.stringify({
                    username : username,
                    endCreateTime : endTime,
                    startCreateTime : startTime,
                    status : status,
                    page : 0,
                    pageSize : 10
                });
            }else{
                var data = JSON.stringify({
                    username : username,
                    endCreateTime : endTime,
                    startCreateTime : startTime,
                    page : 0,
                    pageSize : 10
                });
            }
            that.list(0, data);
        });
    };
    /**
     * 添加管理员
     */
    oAdmin.add = function(){
        var that = this;
        $('#add-admin-btn').die().live('click', function(){
            $('.add-admin-password').val('');
            $('.add-admin-username').val('');
            $('.add-admin,.mask-bg').show();
            $('.add-admin .keep').die().live('click', function(){
                if( !$('.add-admin-username').val() || !$('.add-admin-password').val() ){
                    alert('用户名密码为必填项');
                    return;
                }
                var password = $('.add-admin-password').val(),    //用户名
                    username = $('.add-admin-username').val(),    //密码
                    roleId = $('.add-admin .role').val();                    //角色主键ID
                var data = JSON.stringify({
                    email : '',
                    mobile : '',
                    password : password,
                    realName : '',
                    roleId : roleId,
                    username : username,
                });
                $.ajax({
                    url : eightUrl+'staff/create',
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
                        $('.add-admin,.mask-bg').hide();
                        that.list(0);
                    },
                    error : function(json){
                        var json = JSON.parse(json.responseText);
                        alert(json.message);
                    }
                });
            });
        });
    };
    /**
     * 角色管理
     */
    oAdmin.role = function(roleId){
        $.ajax({
            url : eightUrl+'role/all',
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
                var sele = '';
                for(var i=0 ; i<json.length ; i++){
                    sele += '<option value="'+json[i].id+'">'+json[i].name+'</option>';
                }
                $('.role').html(sele);
                // 默认角色
                $('.role option').each(function(){
                    if( $(this).val() == roleId ){
                        $(this).attr("selected", true);
                    }
                });
            },
            error : function(json){
                var json = JSON.parse(json.responseText);
                alert(json.message);
            }
        })
    };
    /**
     * 启用禁用
     */
    oAdmin.operation = function(){
        var that = this;
        $('.admin-operation').die().live('click', function(){
            var id = $(this).parents('.admin-list-box').attr('data-id');
            $('#admin-pop,.mask-bg').show();
            $('#admin-pop').css({top : ($(document).scrollTop()+20)+'px'});
            // 启用
            if( $(this).html() == '启用'){
                $('.admin-pop-text').html('确定启用么？');
                $('#admin-pop .deter').die().live('click', function(){
                    that.operaEnable('staff/enable/'+id);
                });
            // 禁用
            }else{
                $('.admin-pop-text').html('确定禁用么？');
                $('#admin-pop .deter').die().live('click', function(){
                    that.operaEnable('staff/forbidden/'+id);
                });
            }

        });
    };
    /**
     * 启用禁用调用接口
     */
    oAdmin.operaEnable = function(url){
        var that = this;
        $.ajax({
            url : eightUrl+url,
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
                $('#admin-pop,.mask-bg').hide();
                if($('#order-page li.active').html()){
                    that.list($('#order-page li.active').html()-1);
                }else{
                    that.list(0);
                }
            },
            error : function(json){
                var json = JSON.parse(json.responseText);
                alert(json.message);
            }
        });
    };
    /**
     * 后台人员详情
     */
    oAdmin.details = function(){
        var that = this;
        $('.see-details').die().live('click', function(){
            var id = $(this).parents('.admin-list-box').attr('data-id');
            $.ajax({
                url : eightUrl+'staff/detail/'+id,
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
                    $('#admin-details,.mask-bg').show();
                    $('#admin-details').css({top : ($(document).scrollTop()+20)+'px'});
                    var name = json.username,       //用户名
                        createTime = that.formatDate(json.createTime),//添加时间
                        updateTime = that.formatDate(json.lastLoginTime),//最近登录时间
                        roleName = json.roleName,    //角色名称
                        roleId = json.roleId,        //角色ID
                        status = json.status;        //用户状态
                    if( !json.lastLoginTime ){
                        updateTime = '————';
                    }
                    // 详情头部
                    var title = '\
                        <div class="pop-title admin-details">\
                            <span>后台人员详情</span>\
                            <i class="close"></i>\
                        </div>';
                    var content = '\
                        <div class="admin-top">\
                            <p class="basic-inf">基本信息</p>\
                                <div class="admin-top-left float-l">\
                            <p>\
                                <span class="color-999">用户名：</span>\
                                <span>'+name+'</span>\
                            </p>\
                            <p>\
                                <span class="color-999">添加时间：</span>\
                                <span>'+createTime+'</span>\
                            </p>\
                            <p>\
                                <span class="color-999">用户角色：</span>\
                                <select name="" class="role" disabled>\
                                </select>\
                            </p>\
                        </div>\
                        <div class="admin-top-right float-l">\
                            <p>\
                                <span class="color-999">密码：</span>\
                                <span>********</span>\
                            </p>\
                            <p>\
                                <span class="color-999">最近登录时间：</span>\
                                <span>'+updateTime+'</span>\
                            </p>\
                            <p>\
                                <span class="color-999">用户状态：</span>\
                                <select name="" id="admin-state" disabled>\
                                    <option value="1">已启用</option>\
                                    <option value="2">已禁用</option>\
                                </select>\
                            </p>\
                        </div>\
                    </div>';

                    var html = title+content;
                    $('#admin-details').html(html);
                    // 默认状态
                    if ( status == 1 ) {
                        $('#admin-state option').eq(0).attr("selected", true);
                    } else {
                        $('#admin-state option').eq(1).attr("selected", true);
                    }
                    that.role(roleId);
                },
                error : function(json){
                    var json = JSON.parse(json.responseText);
                    alert(json.message);
                }
            });

        });
    };
    /**
     * 后台人员编辑
     */
    oAdmin.edit = function(){
        var that = this;
        $('.admin-edit').die().live('click', function(){
            var id = $(this).parents('.admin-list-box').attr('data-id');
            $.ajax({
                url : eightUrl+'staff/detail/'+id,
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
                    $('#admin-details,.mask-bg').show();
                    $('#admin-details').css({top : ($(document).scrollTop()+20)+'px'});
                    var name = json.username,       //用户名
                        createTime = that.formatDate(json.createTime),//添加时间
                        updateTime = that.formatDate(json.lastLoginTime),//最近登录时间
                        roleName = json.roleName,    //角色名称
                        status = json.status,        //用户状态
                        roleId = json.roleId;        //用户角色
                    if( !json.lastLoginTime ){
                        updateTime = '————';
                    }
                    // 详情头部
                    var title = '\
                        <div class="pop-title">\
                            <span>后台人员编辑</span>\
                            <i class="close"></i>\
                        </div>';
                    var content = '\
                        <div class="admin-top">\
                            <p class="basic-inf">基本信息</p>\
                                <div class="admin-top-left float-l">\
                            <p>\
                                <span class="color-999">用户名：</span>\
                                <span class="edit-username">'+name+'</span>\
                            </p>\
                            <p>\
                                <span class="color-999">添加时间：</span>\
                                <span>'+createTime+'</span>\
                            </p>\
                        </div>\
                        <div class="admin-top-right float-l">\
                            <p>\
                                <span class="color-999">用户角色：</span>\
                                <select name="" class="role">\
                                </select>\
                            </p>\
                            <p>\
                                <span class="color-999">最近登录时间：</span>\
                                <span>'+updateTime+'</span>\
                        </div>\
                        <div class="admin-user-btn float-l">\
                            <input type="button" value="保存" class="keep"/>\
                            <input type="button" value="取消" class="cancel"/>\
                        </div>\
                    </div>';
                    var html = title+content;
                    $('#admin-details').html(html);
                    that.role(roleId);
                    // 默认状态
                    if ( status == 1 ) {
                        $('#admin-details #admin-state option').eq(0).attr("selected", true);
                    } else {
                        $('#admin-details #admin-state option').eq(1).attr("selected", true);
                    }
                    that.editEnter(json.id);
                },
                error : function(json){
                    var json = JSON.parse(json.responseText);
                    alert(json.message);
                }
            });

        });
    };
    /**
     * 编辑确认
     * @param userid
     */
    oAdmin.editEnter = function(userid){
        var that = this;
        $('#admin-details .keep').die().live('click', function(){
            // 编辑其他人信息
            if( $.cookie('id') != userid){
                var id = userid,
                    roleId = $('.role').val(),
                    username = $('.edit-username').html(),
                    url = eightUrl+'staff/updateOther';
                var data = JSON.stringify({
                    id : id,
                    roleId : roleId,
                    username : username
                });
            // 编辑自己信息
            }else{
                var id = $.cookie('id'),
                    roleId = $('.role').val(),
                    username = $('.edit-username').html(),
                    url = eightUrl+'staff/updateSelf';
                var data = JSON.stringify({
                    id : id,
                    roleId : roleId,
                    username : username
                });
            }
            // 修改信息
            $.ajax({
                url : url,
                data : data,
                type : 'post',
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
                    $('#admin-details,.mask-bg').hide();
                    if($('#order-page li.active').html()){
                        that.list($('#order-page li.active').html()-1);
                    }else{
                        that.list(0);
                    }
                },
                error : function(json){
                    var json = JSON.parse(json.responseText);
                    alert(json.message);
                }
            });
        });
    };
    /**
     * 修改密码
     */
    oAdmin.editPassword = function(){
        var that = this;
        $('.edit-password-text').die().live('click', function(){
            var userid = $(this).parents('.admin-list-box').attr('data-id');
            $('#edit-password,.mask-bg').show();
            $('#edit-password').css({top: ($(document).scrollTop()+20)+'px'});
            var passwordText = '';
            if( userid == $.cookie('id') ){
                passwordText = '<div class="admin-top-left float-l">\
                                    <p>\
                                        <span class="color-999 float-l">旧密码：</span>\
                                        <input type="password" class="old-password float-l"/>\
                                    </p>\
                                </div>\
                                <div class="admin-top-right float-l">\
                                    <p>\
                                        <span class="color-999 float-l">新密码：</span>\
                                        <input type="password" class="new-password float-l"/>\
                                    </p>\
                                </div>';
            }else{
                passwordText = '<div class="admin-top-left float-l">\
                                    <p>\
                                        <span class="color-999 float-l">新密码：</span>\
                                        <input type="password" class="new-password float-l"/>\
                                    </p>\
                                </div>';
            }
            passwordText+='<div class="admin-user-btn float-l">\
                            <input type="button" value="保存" class="keep"/>\
                            <input type="button" value="取消" class="cancel"/>\
                        </div>'
            $('.add-admin-box').html(passwordText);
            $('#edit-password .keep').die().live('click', function(){
                // 修改别人密码
                if( $.cookie('id') != userid){
                    var id = userid,
                        newPassword = $('#edit-password .new-password').val(),
                        url = eightUrl+'staff/resetOtherPassword';
                    var data = JSON.stringify({
                        id : id,
                        newPassword : newPassword,
                    });
                // 修改自己密码
                }else{
                    var newPassword = $('#edit-password .new-password').val(),
                        oldPassword = $('#edit-password .old-password').val(),
                        url = eightUrl+'staff/resetSelfPassword';

                    var data = JSON.stringify({
                        newPassword : newPassword,
                        oldPassword : oldPassword
                    });
                }
                // 修改密码
                $.ajax({
                    url : url,
                    data : data,
                    type : 'post',
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
                        $('#edit-password,.mask-bg').hide();
                        if($('#order-page li.active').html()){
                            that.list($('#order-page li.active').html()-1);
                        }else{
                            that.list(0);
                        }
                    },
                    error : function(json){
                        var json = JSON.parse(json.responseText);
                        alert(json.message);
                    }
                });
            });
        });
    };
    /**
     * 格式化时间
     * @param time
     * @returns {string}
     */
    oAdmin.formatDate = function(time){
        oDate = new Date(time);              //注册时间格式化
        oDateYear = toDable(oDate.getFullYear()),           //年
        oDateMonth = toDable(oDate.getMonth()+ 1),          //月
        oDateDay = toDable(oDate.getDate()),                //日
        oHours = toDable(oDate.getHours()),                 //小时
        oMinutes  = toDable(oDate.getMinutes());            //分钟
        return oDateYear+'-'+oDateMonth+'-'+oDateDay+' '+oHours+':'+oMinutes;

    };
    /**
     * 关闭
     */
    oAdmin.close = function(){
        $('.close,.cancel').die().live('click', function(){
            $('.mask-bg,.add-admin,.admin-user,.small-pop').hide();
        });
    };
    exports.admin = oAdmin;
});