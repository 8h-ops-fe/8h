/**
 * Created by hantengfei on 15/11/20.
 */
define(function(require, exports, module){
    require('jCookie')
    $('.login-out').die().live('click', function(){
        $.removeCookie('token');
        window.location.href = 'login.html';
    })
    if( !$.cookie('token') ){
        window.location.href = 'login.html';
    }
});