/**
 * Created by hantengfei on 15/11/20.
 */
define(function(require, exports, module){
    require('jCookie');
    if( !$.cookie('token') ){
        window.location.href = 'login.html';
    }
});