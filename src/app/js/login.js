/**
 * Created by hantengfei on 15/11/19.
 */


define(function(require, exports, module){
    var ajax = require('httpClient');


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
                url : 'http://8h-ops-dev.obaymax.com/staff/login',
                type : 'post',
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data : JSON.stringify({
                    password: password,
                    username: username
                }),
                success : function(json){
                    console.log(json);
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

            //var url = 'http://8h-ops-dev.obaymax.com/staff/login';
            //ajax.post(url, JSON.stringify({password: password, username: username}), function(res){
            //    console.log(res)
            //}, function(res){
            //    console.log(res);
            //});
        }
    });
});
