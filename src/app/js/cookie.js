/**
 *
 * @authors Han Tengfei (tengfeihan0@gmail.com)
 * @date    2015-03-24 11:39:25
 * @version $Id$
 */
window.addCookie=function(name,value,iDay)
{
  if(iDay)
  {
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);
    document.cookie=name+'='+value+';path=/;expires='+oDate.toGMTString();
  }
  else
  {
    document.cookie=name+'='+value+';path=/';
  }
}
window.getCookie=function(name)
{
  var arr=document.cookie.split('; ');
  for(var i=0; i<arr.length; i++)
  {
    var arr2=arr[i].split('=');
    if(arr2[0]==name)
    {
      return arr2[1];
    }
  }
  return '';
}
window.removeCookie=function(name)
{
  addCookie(name,'asdfasdf',-100);
}
