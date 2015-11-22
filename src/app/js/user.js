/**
 * 用户管理
 */
define(function(require, exports, module){
    var user = {};

    user.init = function(){
        this.list();    //用户列表
        this.query();   //用户查询
        this.edit();    //编辑用户
        this.btn();     //启用、禁用用户
        this.close();   //关闭
    };
    /**
     * 用户列表
     */
    user.list = function(data){
        var json = JSON.stringify({
            page : 0,
            pageSize : 10
        });
        var data = data || json;
        $.ajax({
            url: eightUrl + 'user/list',
            type: 'post',
            data: data,
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
                $('.user-list-box').html('');
                for(var i=0 ; i<json.length ; i++){

                    var phone = json[i].mobile,                 //用户电话
                        createTime = json[i].createTime,        //注册时间
                        status = json[i].status==1 ? '已启用' : '已禁用',//用户状态
                        operation = status == '已启用' ? '禁用' : '启用',
                        id = json[i].id,
                        userState = operation == '启用' ? 'user-open' : 'user-close';
                    $('.user-list-box').append('\
                        <dd class="user-list" data-id="'+id+'">\
                            <ul class="line">\
                                <li class="w240 blue user-phone">'+phone+'</li>\
                                <li class="w242">'+createTime+'</li>\
                                <li class="w242">'+status+'</li>\
                                <li class="w240 blue no-boder user-state '+userState+'">'+operation+'</li>\
                            </ul>\
                        </dd>');
                }
            }
        });
    };
    /**
     * 用户查询
     */
    user.query = function(){
        var that = this;
        $('.user-search').live('click', function(){
            var phone = $('.user-phone-input').val(),   //用户电话
                startTime = $('.start-time').val(),     //开始时间
                endTime = $('.end-time').val();         //结束时间
            data = JSON.stringify({
                maxTime : endTime,
                minTime : startTime,
                mobile : phone
            });
            that.list(data);
        });
    };
    /**
     * 编辑用户
     */
    user.edit = function(){
        var that = this;
        $('.user-phone').live('click', function(){
            var userId = $(this).parents('.user-list').attr('data-id');
            $.ajax({
                url: eightUrl + '/user/changeStatus',
                type: 'post',
                data: JSON.stringify({
                    userId :userId
                }),
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
                    $('#user-details,.mask-bg').show();
                    $('#user-details').css({top: ($(document).scrollTop+20)+'px'});

                    var createTime = json.createTime,               //创建时间
                        id = json.id,                               //ID
                        mobile = json.mobile || '未填写',            //电话
                        email = json.email || '未填写',              //电子邮件
                        qq = json.qq || '未填写',                    //qq
                        wechat = json.wechat || '未填写',            //微信
                        nickname = json.nickname || '未填写';        //昵称
                    $('.user-details').html('\
                    <div class="pop-title">\
                        <span>用户详情</span>\
                        <i class="close"></i>\
                    </div>\
                    <div class="pop-content clearfix">\
                        <div class="pop-content-left">\
                            <div>\
                                <span class="pop-input-type">手机号:</span>\
                                <input type="text" name="phone" disabled="true" value="'+mobile+'"/>\
                            </div>\
                        <div>\
                        <span class="pop-input-type">昵称:</span>\
                        <input type="text" name="nickname" disabled="true" value="'+nickname+'"/>\
                    </div>\
                    <div>\
                        <span class="pop-input-type">微信账号:</span>\
                        <input type="text" name="weixin" disabled="true" value="'+wechat+'"/>\
                    </div>\
                    <div>\
                        <span class="pop-input-type">用户状态:</span>\
                        <select name="userstate" id="user_status">\
                            <option value="1">已启用</option>\
                            <option value="2">禁用</option>\
                        </select>\
                    </div>\
                    </div>\
                    <div class="pop-content-right">\
                        <div>\
                            <span class="pop-input-type">注册时间:</span>\
                            <input type="text" name="regtime" disabled="true" value="'+createTime+'"/>\
                        </div>\
                    <div>\
                        <span class="pop-input-type">Email:</span>\
                        <input type="text" name="email" disabled="true" value="'+email+'"/>\
                    </div>\
                    <div>\
                        <span class="pop-input-type">QQ:</span>\
                        <input type="text" name="qq" disabled="true" value="'+qq+'"/>\
                    </div>\
                    </div>\
                        <div class="user-details-btn">\
                            <input type="button" value="确定" class="deter user-deter"/>\
                            <input type="button" value="取消" class="cancel"/>\
                        </div>\
                    </div>').attr({"data-id" : id});

                    //点击保存
                    $('.user-deter').click(function(){
                        var userId = $(this).parents('.user-details').attr('data-id'),
                            status = $('#user_status').val();
                        $.ajax({
                            url : eightUrl+'user/changeStatus',
                            type : 'post',
                            data : JSON.stringify({
                                userId : userId,
                                status : status
                            }),
                            xhrFields: {
                                withCredentials: true
                            },
                            beforeSend : function(xhr) {
                                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                                var token = $.cookie("token");
                                if (token) {
                                    xhr.setRequestHeader("X-Access-Auth-Token", token);
                                }
                            },
                            success : function(json){
                                $('.user-details,.mask-bg').hide();
                                that.list();
                            },
                            error : function(json){
                                console.log(json);
                            }
                        });
                    });

                }
            });
        });
    };
    /**
     * 启用、禁用用户
     */
    user.btn = function(){
        var that = this;
        // 启用用户
        $('.user-open').live('click', function(){
            var id = $(this).parents('.user-list').attr('data-id'),
                status = 1;
            var data = JSON.stringify({
                userId : id,
                status : status
            });
            that.operation(data);
        });
        //禁用用户
        $('.user-close').live('click', function(){
            var id = $(this).parents('.user-list').attr('data-id'),
                status = 2;
            var data = JSON.stringify({
                userId : id,
                status : status
            });
            that.operation(data);
        });

    };
    /**
     *
     */
    user.operation = function(data){
        var that = this;
        if( data.status ==1 ){
            $('#user_pop_open,.mask-bg').show();
            $('#user_pop_open').css({top: ($(document).scrollTop+20)+'px'});
        }else{
            $('#user_pop_close,.mask-bg').show();
            $('#user_pop_close').css({top: ($(document).scrollTop+20)+'px'});

        }
        $('#user_pop_open .deter,#user_pop_close .deter').click(function(){
            $.ajax({
                url : eightUrl + 'user/changeStatus',
                type : 'post',
                data : data,
                xhrFields : {
                    withCredentials: true
                },
                beforeSend : function (xhr) {
                    // json格式传输，后台应该用@RequestBody方式接受
                    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    var token = $.cookie("token");
                    if (token) {
                        xhr.setRequestHeader("X-Access-Auth-Token", token);
                    }
                },
                success : function(json){
                    $('#user_pop_close,#user_pop_open,.mask-bg').hide();
                    that.list();
                },
                error : function(json){
                    alert(json);
                }
            })
        });
    };
    /**
     * 关闭
     */
    user.close = function(){
        $('.close,.cancel').live('click', function(){
            $('.user-details,.mask-bg,#user_pop_close,#user_pop_open').hide();
        });
    };
    exports.user = user;

});
