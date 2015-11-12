/**
 * 统一ajax请求
 *
 * Created by weigangqiu on 15-9-11.
 */
define(function (require, exports, module) {
    var $ = require("jquery");
    require("jCookie");

    /**
     * post请求方法
     * @param url
     * @param data
     * @param success_callback
     * @param error_callback
     */
    function post(url, data, success_callback, error_callback) {
        client("POST", url, data, success_callback, error_callback);
    };

    /**
     * get请求方法
     * @param url
     * @param success_callback
     * @param error_callback
     */
    function get(url, data, success_callback, error_callback) {
        client("GET", url, data, success_callback, error_callback);
    };

    function client(method, url, data, success_callback, error_callback) {
        $.ajax({
            type: method,
            url: seajs.host + url,
            data: data,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                // json格式传输，后台应该用@RequestBody方式接受
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                var token = $.cookie("token");
                if (token) {
                    xhr.setRequestHeader("X-Auth-Token", token);
                }
            },
            success: function (resp) {
                if (resp.code === 1) { // 系统错误
                    // 后台系统状态：SYSTEM_NOT_LOGIN(4, "请登录"),SYSTEM_LOGIN_TIME_OUT(5, "登录超时，请重新登录"),
                    console.log("后台系统错误:" + url);
                    window.location.href = "p_page_500.html";
                } else if (resp.code === 4 || resp.code === 5) {
                    $.removeCookie("nickName");
                    $.removeCookie("token");
                    window.location.href = "p_login.html";
                } else if (typeof(success_callback) != "undefined") {
                    success_callback(resp);
                }
            },
            error: function (resp) {
                if (typeof(error_callback) != "undefined") {
                    error_callback(resp);
                }
            },
            dataType: "json"
        });
    };

    module.exports = {
        "post": post,
        "get": get
    };
});