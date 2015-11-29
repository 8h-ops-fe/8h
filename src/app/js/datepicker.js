define(function(require, exports, module){
    $(function(){
        require("jquery");
        require("../../plugin/jqueryui/jquery-ui-datepicker");

        //将datepicker绑定到开始时间和结束时间上
        $(".start-time").die().live("focus", function () {
            console.log($('.end-time').val());
            if( $('.end-time').val() ){
                $(".start-time").datepicker({ dateFormat: "yy-mm-dd"});
                $(".start-time").datepicker('option', 'maxDate',  $('.end-time').val());
            }else{
                $(".start-time").datepicker({ dateFormat: "yy-mm-dd"});
            }
        });
        $(".end-time").die().live("focus", function () {
            if( $('.start-time').val() ){
                $(".end-time").datepicker({ dateFormat: "yy-mm-dd"});
                $(".end-time").datepicker('option', 'minDate',  $('.start-time').val());
            }else{
                $(".end-time").datepicker({ dateFormat: "yy-mm-dd"});
            }
        });
    });
});
