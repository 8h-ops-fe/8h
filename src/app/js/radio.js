/**
 *
 * @authors Han Tengfei (tengfeihan0@gmail.com)
 * @date    2015-02-03 14:26:02
 * @version $Id$
 */
define(function(require, exports, module){
    (function(){
        var added = false;
        window.myRadio = function(name) {
            var oForm = document.getElementById('form1');
            var oRadio = document.getElementsByName(name);
            var aSpan = [];
            for(var i=0;i<oRadio.length;i++) {
                var oSpan = document.createElement('span');
                oSpan.className='my_radio_off r';
                oRadio[i].parentNode.insertBefore(oSpan,oRadio[i]);
                aSpan.push(oSpan);
                oRadio[i].style.display='none';
                (function(index){
                    oSpan.onclick=function() {
                        for(var j=0;j<oRadio.length;j++) {
                            aSpan[j].className='my_radio_off r';
                        }
                        if(this.className='my_radio_off') {
                            this.className='my_radio_on r';
                            oRadio[index].checked=true;
                        }
                    };
                })(i)
            }
            if(added)return;
            added=true;
            var oLink = document.createElement('link');
            oLink.rel='stylesheet';
            oLink.href='../styles/my_radio.css';
            var oHead = document.getElementsByTagName('head')[0];
            oHead.appendChild(oLink);
        };
    })();
});


