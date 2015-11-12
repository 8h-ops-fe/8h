/**
 * Created by weigangqiu on 15-9-12.
 */
define(function (require, exports, module) {
    var $ = require("jquery");
    var http = require("http");
    require("jCookie");

    function toLoginPage() {
        var token = $.cookie("token");
        if (!token) {
            window.location.href = "p_login.html";
        }
    }

    function showLoginStatus() {
        // 判断是否登录
        var nickName = $.cookie("nickName");
        if (nickName) {
            $("#header_login_user").children().remove();
            $("#header_login_user").html('<span class="ft-color2 ft14">' + nickName + '&nbsp;</span><a id="logout">退出</a>');

            $(".hongbao-btn").remove();
            $(".register-account").children().remove();
            $(".register-account").attr("style","height: 98px;width:230px;");
            $(".register-account").append("<div class='welcome-login ft16'>欢迎回来，<span id='j_nickName' class='ft-color2 ft20'></span></div>");
            $("#logout").click(function () {
                http.get("/user/logout", {}, function (resp) {
                    $.removeCookie("nickName");
                    $.removeCookie("token");
                    window.location.href = "p_login.html";
                });
            });
        }
    }

    function isLogin() {
        var token = $.cookie("token");
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    module.exports = {
        "toLoginPage": toLoginPage,
        "showLoginStatus": showLoginStatus,
        "isLogin": isLogin
    };
});