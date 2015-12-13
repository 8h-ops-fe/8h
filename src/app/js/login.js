/**
 * Created by hantengfei on 15/11/19.
 */


define(function(require, exports, module){
    require('api');
    require('jquery');
    require('jCookie');


    $(function(){
        $('.login-btn').live('click',login);
        $('.login-password,.login-username').live('keydown', function(ev){
            var oEvent = ev || event;
            if( oEvent.keyCode == 13){
                login();
            }
        });
        function login(){
            var username = $('.login-username').val(),
                password = $('.login-password').val();
            if( !username ){
                alert('请输入用户名');
                return;
            }
            if( !password ){
                alert('请输入密码');
                return;
            }

            $.ajax({
                url : eightUrl+'staff/login',
                type : 'POST',
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data : JSON.stringify({
                    password: password,
                    username: username
                }),
                xhrFields: {
                    withCredentials: true
                },
                beforeSend : function(xhr) {
                    // json格式传输，后台应该用@RequestBody方式接受
                    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    var token = $.cookie("token");
                    if (token) {
                        xhr.setRequestHeader("X-Access-Token", token);
                    }
                },
                success : function(json){
                    console.log(json);
                    // 用户名
                    $.cookie('name', json.username);
                    // 用户ID
                    $.cookie('id', json.id);
                    // 角色ID
                    $.cookie('roleId', json.roleId);
                    if( json.accessToken ){
                        $.cookie('token', json.accessToken);
                        window.location.href = 'index.html';
                    }
                },
                error : function(json){
                    var err = JSON.parse(json.responseText);
                    $('.login-error').html(err.message).show();
                }
            });

        }
    });
});
