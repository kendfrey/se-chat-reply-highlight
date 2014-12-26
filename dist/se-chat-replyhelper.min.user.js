/*

// ==UserScript==
// @name           Chat Reply Helper for Stack Exchange sites
// @namespace      http://oliversalzburg.github.com/
// @version        2.5.1
// @description    Handle structured conversations more conveniently
// @homepage       https://github.com/oliversalzburg/se-chat-reply-highlight
// @grant          none
// @include /^https?:\/\/chat\.stackexchange\.com/.*$/
// @include /^https?:\/\/chat\.stackoverflow\.com/.*$/
// @include /^https?:\/\/chat\.meta\.stackexchange\.com/.*$/

// ==/UserScript==
*/
(function(c,a,e,f){c.fn.caret=function(b,h){var d,g,l=this[0],k=c.browser.msie;if("object"===typeof b&&"number"===typeof b.start&&"number"===typeof b.end)d=b.start,g=b.end;else if("number"===typeof b&&"number"===typeof h)d=b,g=h;else if("string"===typeof b)-1<(d=l.value.indexOf(b))?g=d+b[a]:d=null;else if("[object RegExp]"===Object.prototype.toString.call(b)){var p=b.exec(l.value);null!=p&&(d=p.index,g=d+p[0][a])}if("undefined"!=typeof d)return k?(k=this[0].createTextRange(),k.collapse(!0),k.moveStart("character",
d),k.moveEnd("character",g-d),k.select()):(this[0].selectionStart=d,this[0].selectionEnd=g),this[0].focus(),this;if(k)if(g=document.selection,"textarea"!=this[0].tagName.toLowerCase()){k=this.val();d=g[e]()[f]();d.moveEnd("character",k[a]);var m=""==d.text?k[a]:k.lastIndexOf(d.text);d=g[e]()[f]();d.moveStart("character",-k[a]);var n=d.text[a]}else d=g[e](),g=d[f](),g.moveToElementText(this[0]),g.setEndPoint("EndToEnd",d),m=g.text[a]-d.text[a],n=m+d.text[a];else m=l.selectionStart,n=l.selectionEnd;
d=l.value.substring(m,n);return{start:m,end:n,text:d,replace:function(b){return l.value.substring(0,m)+b+l.value.substring(n,l.value[a])}}}})($,"length","createRange","duplicate");$.fn.reverse=[].reverse;function ReplyHelper(){this.registerHandler();this.enableQuoteBubble()}
ReplyHelper.prototype={quotedMessage:null,replyTo:function(c,a){a=a||":";var e="";":"==a||a.match(/ $/)||(e=" ");var f=$("#input"),b=f.caret().start,e=f.val().replace(RegExp("^"+a+"\\d* ?"),a+e+c+" ");f.val(e);f.caret(b,b)},scrollTo:function(c){c.offset()&&(c=c.offset().top-10,0>c&&(c=0),$("html, body").animate({scrollTop:c},50))},updateReply:function(c,a){c.addClass("reply-child se-highlight-helper");this.scrollTo(c);var e=c.attr("id");e&&this.replyTo(e.substring(8),a)},registerHandler:function(){var c=
this;$("#input").keydown(function(a){var e=$("#input");if(!e.hasClass("editing")){var f=e.val(),b=f.match(/^(:|!!tell ?)($|\d+| )/);if(b){if(38==a.keyCode||40==a.keyCode){var h=b[1];if(!(e.caret().start>b[0].length+1)){var b=38==a.keyCode?-1:1,d=$(".reply-child.se-highlight-helper");if(0<d.length){d=d.first();d.removeClass("reply-child se-highlight-helper");var g=$(".messages .message");-1==b&&(g=g.reverse());g.each(function(a,b){if($(b).attr("id")==d.attr("id")){var e=$(g[a+1]).first();e&&c.updateReply(e,
h)}})}else{g=$(".messages .message");b=g.last();if(!b)return;c.updateReply(b,h);f==h&&(f=e.val().length,e.caret(f,f))}a.preventDefault()}}}else $(".reply-child.se-highlight-helper").removeClass("reply-child se-highlight-helper")}});$(document).on("click",".newreply",function(a){c.updateReply($(this).parents(".messages .message"))})},enableQuoteBubble:function(){$(document).on("mousemove",function(c){if(null!=replyHelper.quotedMessage){var a=replyHelper.quotedMessage.height();0!=a&&replyHelper.quotedMessage.attr("style",
"position : absolute;left:"+c.pageX+"px;top:"+(c.pageY-(a+30))+"px;z-index : 3;min-width : 0px;")}});$(document).on("mouseenter",".reply-info",function(c){var a=null;c=$(this).attr("href");var e=c.lastIndexOf("#");c=c.substr(e+1);var f=$("#message-"+c);if(0<f.length){a=$(".content",f).html();c=f.parents(".user-container").hasClass("mine");var e=null,b=$(".timestamp",f),h=$(f).siblings(".timestamp");0<b.length?e=b:0<h.length&&(e=h);b=null;h=f.parents(".messages").siblings(".signature");0<h.length&&
(b=h.clone(),h=$(".tiny-signature",b).detach(),$(b).empty().append(h),$(h).show(),f=f.parents(".messages").css("background-color"),b.attr("style","background-color : "+f+";width : inherit;border-top : 1px solid black;border-right : 1px solid black;border-left : 1px solid black;border-top-left-radius : 6px;border-top-right-radius : 6px;padding : 2px 5px 2px 5px;z-index : 2;position : relative;top : 1px;"));a=$("<div class='user-container monologue'><div class='messages'><div class='message'><div class='content'>"+
a+"</div></div></div></div>");a.attr("style","position : absolute;top : -9999;");$(".messages",a).attr("style","border : 1px solid black;border-top-left-radius : 0;max-width : 660px;width : inherit;");c&&a.addClass("mine");e&&(c=$("<div class='timestamp'>"+e.text()+"</div>"),$(".message",a).before(c));b&&$(".messages",a).before(b);$(this).parents(".monologue").before(a);replyHelper.quotedMessage=a}});$(document).on("mouseleave",".reply-info",function(c){null!=replyHelper.quotedMessage&&(replyHelper.quotedMessage.remove(),
replyHelper.quotedMessage=null)})}};var replyHelper=new ReplyHelper;
