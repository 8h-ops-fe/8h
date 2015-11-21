/**
 * 售后管理
 */
define(function(require, exports, module){
    require('jquery');
    var oAfter = {};

    oAfter.init = function(){
        $.ajax({
            url : eightUrl+'order/ops/list',
            type : 'get',
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
            }
        })



    };



    exports.after = oAfter;
});