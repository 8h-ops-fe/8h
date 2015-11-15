 /***********************************************
 * 插件说明：复选框
 * 作    者：
 * 创建日期：
 ***********************************************
 *
 * 修改人员：
 * 修改说明：
 * 修改日期：
 ***********************************************
 */
(function($) {
	
    jQuery.fn.RXCheckbox = function(options) {
		jQuery.fn.RXCheckbox.defaults = {
			//showText:true //label中是否显示文字多用于列表
			
		};
        var opts = jQuery.extend($.fn.RXCheckbox.defaults, options);

        return this.each(function() {
			
        	var THIS=$(this);
			var cname=$(this).attr("name");
    
        	THIS.addClass('hidden');
			
			THIS.next("label").addClass("ui-checkbox").attr("name","c"+cname);
			//THIS.next("label").prop("i3-id",THIS.prop("id"));
			if(THIS.prop("checked")){
				THIS.next("label").addClass("ui-checkbox-checked");
			}
			/*
			if(opts.showText){
				
			}else{
				THIS.next("label").addClass("ui-checkbox-notext");
			}
			*/
			
			THIS.next("label").click(function(){

				if(THIS.prop('disabled')){
					return false;
				}
				
				if($(this).hasClass("ui-checkbox-checked")){
					$(this).removeClass("ui-checkbox-checked");
					$(this).prev().prop("checked",false);
				}else{
				
					$(this).addClass("ui-checkbox-checked");
					//$(this).siblings().removeClass("ui-checkbox-checked");
					$(this).prev().prop("checked",true);
				}
				
				
				
			});
			
			

        });
   
    };
	
	jQuery.fn.enable=function(){
		$(this).each(function(){
			$(this).removeProp("disabled");
			$(this).next(".ui-checkbox").removeClass("ui-checkbox-disabled");
		});
	};
    
	jQuery.fn.disable=function(){
		$(this).each(function(){
			$(this).prop("disabled",true);
			$(this).next(".ui-checkbox").addClass("ui-checkbox-disabled");
		});
	};
	
	//获取值
	jQuery.fn.getRXCheckboxVal=function(){
		var list = "";
		var c=$(this);
		if(c.length==0){
			return "null";
		}else{
			$(this).each(function () {
				list += $(this).val() + ",";
			});
			list = list.substring(0, list.length - 1);
			//nl = nl.substring(0, nl.length - 1);
			return list;
		}
	};
	/*
	//设置可用
	jQuery.fn.seti3RadioboxEnable=function(){
		$(this).each(function(){
			$(this).removeProp("disabled");
			$(this).next(".i3-radiobox").removeClass("i3-radiobox-disabled");
		});
	};
    
	//设置不可用
	jQuery.fn.seti3RadioboxDisable=function(){
		$(this).each(function(){
			$(this).prop("disabled",true);
			$(this).next(".i3-radiobox").addClass("i3-radiobox-disabled");
		});
	};
	//设置值
	jQuery.fn.seti3RadioboxValue=function(){
		if($(this).prop('disabled')){
			return false;
		}
		$(this).addClass("i3-radiobox-checked");
		$(this).prev().trigger('click');
	
	};
	*/
	$(function() {
		$("input[type=checkbox]").RXCheckbox();
	});
	
})(jQuery);
