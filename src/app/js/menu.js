/**
 * Created by Administrator on 2015/9/25.
 */
define(function (require, exports) {
    var filter = require("filter");
    var $ = require("jquery");
    var http = require("http");
    require("common");
    filter.toLoginPage();
    if (filter.isLogin()) {
        require("analytics");// 加载统计脚本

        // 如果用户在登录状态，则加载用户个人信息
        //是否有环迅余额
        http.get("/huanxun/userCash", {}, function (resp) {
            if (resp.code == 0) {
                if (parseFloat(resp.data.cash) > 0) {
                    $("#IPS_account").css('display', 'block');
                    $("#hx_cash").html(resp.data.cash);
                }
                else {
                    $("#IPS_account").css('display', 'none');
                }
            }
            else {
                alert(resp.msg);
            }
        });
    }
    ;
});