/**
 * Created by Administrator on 2015/9/2 0002.
 */
define(function (require, exports, module) {
    var $ = require("jquery");
    var http = require("http");
    var filter = require("filter");
    var template = require("artTemplate");

    //加载头部
    $("#layout_header").load("common/f_header.html", function () {
        //二维码效果
        $(".download-app").mouseover(function () {
            $(".app-png-show").stop(true, true).show(200);
        });
        $(".download-app").mouseleave(function () {
            $(".app-png-show").stop(true, true).hide(200);
        });
        filter.showLoginStatus(); // 如果已经是注册状态，设置页头的登录框
        if (filter.isLogin()) {
            $("#header_my_account").attr("href", "p_account_asset.html");
        }
    });
    //加载底部
    $("#layout_footer").load("common/f_footer.html", null);

    //加载右侧
    $(".right-tip").load("common/f_right_tip.html", function(){
        $(".online").mouseover(function () {
            $(".talk-online").stop(true, true).show(200);
        });
        $(".online").mouseleave(function () {
            $(".talk-online").stop(true, true).hide(200);
        });
        //电话
        $(".telephone").mouseover(function () {
            $(".ser-telephone").stop(true, true).show(200);
        });
        $(".telephone").mouseleave(function () {
            $(".ser-telephone").stop(true, true).hide(200);
        });
        //微信二维码
        $(".qrcord").mouseover(function () {
            $(".att-qrcord").stop(true, true).show(200);
        });
        $(".qrcord").mouseleave(function () {
            $(".att-qrcord").stop(true, true).hide(200);
        });
        //计算器
        $(".invest-cal").mouseover(function () {
            $(".invest-cal .calculator").stop(true, true).show(200);
        });
        $(".invest-cal").mouseleave(function () {
            $(".invest-cal .calculator").stop(true, true).hide(200);
        });
    });

    if (filter.isLogin()) {
        require("analytics");// 加载统计脚本

        // 如果用户在登录状态，则加载用户个人信息

        // 用户详情接口，个人用户很多页面会用到
        http.get("/user/detail", {
            "t": new Date().getTime()
        }, function (resp) {

            $("#j_nickName").html(resp.data.nickName);
            $("#j_securityLevel").html(resp.data.securityLevel);
            $("#j_total_invest").html(resp.data.userStatistic.totalInvestAmout);
            $("#j_cash").html(resp.data.cash);
            $("#j_withdraw_cash").html(resp.data.cash);
            $("#j_tocollect_interest").html(resp.data.toCollectPrincipalInterest);
            $("#j_received_lixi").html(resp.data.userStatistic.totalEarnedInterest);
            $("#j_tocollect_principal").html(resp.data.userStatistic.toCollectPrincipal);
            $("#j_frozen_funds").html(parseFloat((resp.data.frozenBiddingCash + resp.data.frozenWithDrawCash).toFixed(2)));
            $("#j_actual_loan_amount").html(resp.data.userStatistic.actualLoanAmount);
            $("#j_total_repaied_interest").html(resp.data.userStatistic.totalRepaiedInterest);
            $("#j_total_interest").html(parseFloat((resp.data.userStatistic.totalInterest - resp.data.userStatistic.totalRepaiedInterest).toFixed(2)));


            $("#j_idCardNo").html(resp.data.idCardNo);
            $("#j_realName").html(resp.data.realName);
            $("#cellnumber").html(resp.data.mobile);
            $("#mobile").html(resp.data.mobileNoStar);
            $("#j_last_login_time").html(dateHoursMinFormat(resp.data.lastLoginTime));
            $("#j_id").html(resp.data.idCardNo);
            $("#j_bank_card").html(resp.data.bankCard);
            //判断是否注册第三方
            if (resp.data.roles == "1") {
                $("#j_invest_account_hide").css('display', 'block');
                $("#j_invest_account_hide").css('display', 'none');
            } else {
                $("#j_invest_account_hide").css('display', 'none');
                $("#j_invest_account_hide").css('display', 'block');
            }

            //账户安全级别
            if (resp.data.securityLevel == "3") {
                $("#j_securityLevel").html("高");
                $("#j_securityLevel").parents().find(".main-content").next().find("span.bar").css("width", "100%");
            } else if (resp.data.securityLevel == "2") {
                $("#j_securityLevel").html("中");
                $("#j_securityLevel").parents().find(".main-content").next().find("span.bar").css("width", "60%");
            } else if (resp.data.securityLevel == "1") {
                $("#j_securityLevel").html("低");
                $("#j_securityLevel").parents().find(".main-content").next().find("span.bar").css("width", "30%");
            }
            //是否实名认证
            if (resp.data.isAuth == true) {
                $(".success1").css('background', 'url(../images/protect-01.png) no-repeat left center');
                $(".protect-title1").html("保护中");
                $(".protect-title1").css('color', '#1d95d4');
                $(".identity").css('display', 'none');
                $(".id-card").css('display', 'block');
                $(".isAuth").css('display', 'none');
                $(".icon-identity").css('background', 'url(../images/icon-user-detail/icon-identity-2.png) no-repeat');
            } else {
                $(".success1").css('background', 'url(../images/protect-02.png) no-repeat left center');
                $(".protect-title1").html("未启用");
                $(".protect-title1").css('color', '#999999');
                $(".identity").css('display', 'inline-block');
                $(".id-card").css('display', 'none');
                $(".isAuth").css('display', 'block');
                $(".icon-identity").css('background', 'url(../images/icon-user-detail/icon-identity-1.png) no-repeat');
            }
            //是否绑定银行卡
            if (resp.data.isbindBankCard == false) {
                $(".success2").css('background', 'url(../images/protect-02.png) no-repeat left center');
                $(".protect-title2").html("未启用");
                $(".protect-title2").css('color', '#999999');
                $(".bind-card").css('display', 'inline-block');
                $(".back-card").css('display', 'none');
                $(".icon-bank-card").css('background', 'url(../images/icon-user-detail/icon-bank-card-1.png) no-repeat');
            } else {
                $(".success1").css('background', 'url(../images/protect-01.png) no-repeat left center');
                $(".protect-title2").html("保护中");
                $(".protect-title2").css('color', '#1d95d4');
                $(".bind-card").css('display', 'none');
                $(".back-card").css('display', 'block');
                $(".icon-bank-card").css('background', 'url(../images/icon-user-detail/icon-bank-card-2.png) no-repeat');
            }
            //是否绑定手机
            if (resp.data.mobile == "") {
                $(".icon-mobile").css('background', 'url(../images/icon-user-detail/icon-mobile-1.png) no-repeat');
            } else {
                $(".icon-mobile").css('background', 'url(../images/icon-user-detail/icon-mobile-2.png) no-repeat');
            }
        });
        //右侧环迅提现是否显示
        http.get("/huanxun/userCash", {}, function (resp) {
            if (resp.code == 0) {
                if (parseFloat(resp.data.cash) > 0) {
                    $(".ips-withdraw").css('display', 'block');
                }
                else {
                    $(".ips-withdraw").css('display', 'none');
                }
            }
        });
    };

    //模板封装方法
    template.helper('dateFormat', function (date) {
        return dateFormat(date);
    });
    template.helper('dateHoursMinFormat', function (date) {
        return dateHoursMinFormat(date);
    });
    //日期格式化
    function dateFormat(date) {
        if (date) {
            return (new Date(date)).Format("yyyy-MM-dd");
        } else {
            return "";
        }
    }

    /*
     *Date类型
     *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2014-01-02 04:07:14.223
     *(new Date()).Format("yyyy-M-d h:m:s.S") ==> 2014-5-1 14:19:7.19
     */

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            // 月份
            "d+": this.getDate(),
            // 日
            "h+": this.getHours(),
            // 小时
            "m+": this.getMinutes(),
            // 分
            "s+": this.getSeconds(),
            // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3),
            // 季度
            S: this.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return fmt;
    };
    //日期小时分钟格式化
    function dateHoursMinFormat(date) {
        if (date) {
            return (new Date(date)).Format("yyyy-MM-dd hh:mm:ss");
        } else {
            return "";
        }
    }

    /*左侧菜单栏的小图标*/
    $(".hit").hover(function () {
        $(this).children("i").css("backgroundImage", "url(../images/mine_leftnav_sele.png)");
    }, function () {
        $(this).children("i").css("backgroundImage", "url(../images/icon-arrow.png)");
    });

    /*菜单展示部分*/
    showMenu();
    function showMenu() {
        var items = $(".main-menu");
        var aa = items.find("a");
        aa.bind("click", function () {
            var curdiv = $(this).parent().find("div");
            var flag = curdiv.is(":hidden");
            if (flag) {
                curdiv.slideDown(300);
            } else {
                curdiv.slideUp(300);
            }
        });
    }

    /*自定义request*/
    function request(paras) {
        var url = location.href + "#";
        url = url.substring(0, url.indexOf("#"));
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof returnValue == "undefined") return ""; else return returnValue;
    }

    module.exports = {
        "request": request,
        "dateFormat": dateFormat
    }
});
