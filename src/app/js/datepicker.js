define(function(require, exports, module){
    $(function(){
        require("../js/jquery");
        require("../../plugin/jqueryui/jquery-ui-datepicker");

        //将datepicker绑定到开始时间和结束时间上
        $(".start-time").live("focus", function () {
            $(".start-time").datepicker({ dateFormat: "yy/mm/dd"});
        });
        $(".end-time").live("focus", function () {
            $(".end-time").datepicker({ dateFormat: "yy/mm/dd"});
        });
    });
});
