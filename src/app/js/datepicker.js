define(function(require, exports, module){
    $(function(){
        require("../js/jquery");
        require("../../plugin/jqueryui/jquery-ui-datepicker");
        //require("../../plugin/j.syntaxhighlighter");
        //require("../../plugin/jqueryui/i18n/jquery.ui.datepicker-zh-CN");

        //$.datepicker.setDefaults($.datepicker.regional['zh-CN']);

        //console.log($().datepicker)

        $(".ui-datebox").datepicker({
            inline: true,
            dateFormat : 'yy-mm-dd'
        });

        $(".ui-datebox2").datepicker({
            inline: true,
            dateFormat : 'yy-mm-dd'
        });
    });

});
