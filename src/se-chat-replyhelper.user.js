/** @preserve
// ==UserScript==
// @name           @ant-name@
// @namespace      http://oliversalzburg.github.com/
// @version        @ant-version@
// @description    @ant-description@
// @homepage       @ant-homepage@
// @grant          none
// @ant-sites-userscript@
// ==/UserScript==
*/

/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(a,b,c){function d(c){var d=b.console;f[c]||(f[c]=!0,a.migrateWarnings.push(c),d&&d.warn&&!a.migrateMute&&(d.warn("JQMIGRATE: "+c),a.migrateTrace&&d.trace&&d.trace()))}function e(b,c,e,f){if(Object.defineProperty)try{return void Object.defineProperty(b,c,{configurable:!0,enumerable:!0,get:function(){return d(f),e},set:function(a){d(f),e=a}})}catch(g){}a._definePropertyBroken=!0,b[c]=e}a.migrateVersion="1.4.1";var f={};a.migrateWarnings=[],b.console&&b.console.log&&b.console.log("JQMIGRATE: Migrate is installed"+(a.migrateMute?"":" with logging active")+", version "+a.migrateVersion),a.migrateTrace===c&&(a.migrateTrace=!0),a.migrateReset=function(){f={},a.migrateWarnings.length=0},"BackCompat"===document.compatMode&&d("jQuery is not compatible with Quirks Mode");var g=a("<input/>",{size:1}).attr("size")&&a.attrFn,h=a.attr,i=a.attrHooks.value&&a.attrHooks.value.get||function(){return null},j=a.attrHooks.value&&a.attrHooks.value.set||function(){return c},k=/^(?:input|button)$/i,l=/^[238]$/,m=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,n=/^(?:checked|selected)$/i;e(a,"attrFn",g||{},"jQuery.attrFn is deprecated"),a.attr=function(b,e,f,i){var j=e.toLowerCase(),o=b&&b.nodeType;return i&&(h.length<4&&d("jQuery.fn.attr( props, pass ) is deprecated"),b&&!l.test(o)&&(g?e in g:a.isFunction(a.fn[e])))?a(b)[e](f):("type"===e&&f!==c&&k.test(b.nodeName)&&b.parentNode&&d("Can't change the 'type' of an input or button in IE 6/7/8"),!a.attrHooks[j]&&m.test(j)&&(a.attrHooks[j]={get:function(b,d){var e,f=a.prop(b,d);return f===!0||"boolean"!=typeof f&&(e=b.getAttributeNode(d))&&e.nodeValue!==!1?d.toLowerCase():c},set:function(b,c,d){var e;return c===!1?a.removeAttr(b,d):(e=a.propFix[d]||d,e in b&&(b[e]=!0),b.setAttribute(d,d.toLowerCase())),d}},n.test(j)&&d("jQuery.fn.attr('"+j+"') might use property instead of attribute")),h.call(a,b,e,f))},a.attrHooks.value={get:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?i.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value') no longer gets properties"),b in a?a.value:null)},set:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?j.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value', val) no longer sets properties"),void(a.value=b))}};var o,p,q=a.fn.init,r=a.find,s=a.parseJSON,t=/^\s*</,u=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,v=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,w=/^([^<]*)(<[\w\W]+>)([^>]*)$/;a.fn.init=function(b,e,f){var g,h;return b&&"string"==typeof b&&!a.isPlainObject(e)&&(g=w.exec(a.trim(b)))&&g[0]&&(t.test(b)||d("$(html) HTML strings must start with '<' character"),g[3]&&d("$(html) HTML text after last tag is ignored"),"#"===g[0].charAt(0)&&(d("HTML string cannot start with a '#' character"),a.error("JQMIGRATE: Invalid selector string (XSS)")),e&&e.context&&e.context.nodeType&&(e=e.context),a.parseHTML)?q.call(this,a.parseHTML(g[2],e&&e.ownerDocument||e||document,!0),e,f):(h=q.apply(this,arguments),b&&b.selector!==c?(h.selector=b.selector,h.context=b.context):(h.selector="string"==typeof b?b:"",b&&(h.context=b.nodeType?b:e||document)),h)},a.fn.init.prototype=a.fn,a.find=function(a){var b=Array.prototype.slice.call(arguments);if("string"==typeof a&&u.test(a))try{document.querySelector(a)}catch(c){a=a.replace(v,function(a,b,c,d){return"["+b+c+'"'+d+'"]'});try{document.querySelector(a),d("Attribute selector with '#' must be quoted: "+b[0]),b[0]=a}catch(e){d("Attribute selector with '#' was not fixed: "+b[0])}}return r.apply(this,b)};var x;for(x in r)Object.prototype.hasOwnProperty.call(r,x)&&(a.find[x]=r[x]);a.parseJSON=function(a){return a?s.apply(this,arguments):(d("jQuery.parseJSON requires a valid JSON string"),null)},a.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a.browser||(o=a.uaMatch(navigator.userAgent),p={},o.browser&&(p[o.browser]=!0,p.version=o.version),p.chrome?p.webkit=!0:p.webkit&&(p.safari=!0),a.browser=p),e(a,"browser",a.browser,"jQuery.browser is deprecated"),a.boxModel=a.support.boxModel="CSS1Compat"===document.compatMode,e(a,"boxModel",a.boxModel,"jQuery.boxModel is deprecated"),e(a.support,"boxModel",a.support.boxModel,"jQuery.support.boxModel is deprecated"),a.sub=function(){function b(a,c){return new b.fn.init(a,c)}a.extend(!0,b,this),b.superclass=this,b.fn=b.prototype=this(),b.fn.constructor=b,b.sub=this.sub,b.fn.init=function(d,e){var f=a.fn.init.call(this,d,e,c);return f instanceof b?f:b(f)},b.fn.init.prototype=b.fn;var c=b(document);return d("jQuery.sub() is deprecated"),b},a.fn.size=function(){return d("jQuery.fn.size() is deprecated; use the .length property"),this.length};var y=!1;a.swap&&a.each(["height","width","reliableMarginRight"],function(b,c){var d=a.cssHooks[c]&&a.cssHooks[c].get;d&&(a.cssHooks[c].get=function(){var a;return y=!0,a=d.apply(this,arguments),y=!1,a})}),a.swap=function(a,b,c,e){var f,g,h={};y||d("jQuery.swap() is undocumented and deprecated");for(g in b)h[g]=a.style[g],a.style[g]=b[g];f=c.apply(a,e||[]);for(g in b)a.style[g]=h[g];return f},a.ajaxSetup({converters:{"text json":a.parseJSON}});var z=a.fn.data;a.fn.data=function(b){var e,f,g=this[0];return!g||"events"!==b||1!==arguments.length||(e=a.data(g,b),f=a._data(g,b),e!==c&&e!==f||f===c)?z.apply(this,arguments):(d("Use of jQuery.fn.data('events') is deprecated"),f)};var A=/\/(java|ecma)script/i;a.clean||(a.clean=function(b,c,e,f){c=c||document,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,d("jQuery.clean() is deprecated");var g,h,i,j,k=[];if(a.merge(k,a.buildFragment(b,c).childNodes),e)for(i=function(a){return!a.type||A.test(a.type)?f?f.push(a.parentNode?a.parentNode.removeChild(a):a):e.appendChild(a):void 0},g=0;null!=(h=k[g]);g++)a.nodeName(h,"script")&&i(h)||(e.appendChild(h),"undefined"!=typeof h.getElementsByTagName&&(j=a.grep(a.merge([],h.getElementsByTagName("script")),i),k.splice.apply(k,[g+1,0].concat(j)),g+=j.length));return k});var B=a.event.add,C=a.event.remove,D=a.event.trigger,E=a.fn.toggle,F=a.fn.live,G=a.fn.die,H=a.fn.load,I="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",J=new RegExp("\\b(?:"+I+")\\b"),K=/(?:^|\s)hover(\.\S+|)\b/,L=function(b){return"string"!=typeof b||a.event.special.hover?b:(K.test(b)&&d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),b&&b.replace(K,"mouseenter$1 mouseleave$1"))};a.event.props&&"attrChange"!==a.event.props[0]&&a.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),a.event.dispatch&&e(a.event,"handle",a.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),a.event.add=function(a,b,c,e,f){a!==document&&J.test(b)&&d("AJAX events should be attached to document: "+b),B.call(this,a,L(b||""),c,e,f)},a.event.remove=function(a,b,c,d,e){C.call(this,a,L(b)||"",c,d,e)},a.each(["load","unload","error"],function(b,c){a.fn[c]=function(){var a=Array.prototype.slice.call(arguments,0);return"load"===c&&"string"==typeof a[0]?H.apply(this,a):(d("jQuery.fn."+c+"() is deprecated"),a.splice(0,0,c),arguments.length?this.bind.apply(this,a):(this.triggerHandler.apply(this,a),this))}}),a.fn.toggle=function(b,c){if(!a.isFunction(b)||!a.isFunction(c))return E.apply(this,arguments);d("jQuery.fn.toggle(handler, handler...) is deprecated");var e=arguments,f=b.guid||a.guid++,g=0,h=function(c){var d=(a._data(this,"lastToggle"+b.guid)||0)%g;return a._data(this,"lastToggle"+b.guid,d+1),c.preventDefault(),e[d].apply(this,arguments)||!1};for(h.guid=f;g<e.length;)e[g++].guid=f;return this.click(h)},a.fn.live=function(b,c,e){return d("jQuery.fn.live() is deprecated"),F?F.apply(this,arguments):(a(this.context).on(b,this.selector,c,e),this)},a.fn.die=function(b,c){return d("jQuery.fn.die() is deprecated"),G?G.apply(this,arguments):(a(this.context).off(b,this.selector||"**",c),this)},a.event.trigger=function(a,b,c,e){return c||J.test(a)||d("Global events are undocumented and deprecated"),D.call(this,a,b,c||document,e)},a.each(I.split("|"),function(b,c){a.event.special[c]={setup:function(){var b=this;return b!==document&&(a.event.add(document,c+"."+a.guid,function(){a.event.trigger(c,Array.prototype.slice.call(arguments,1),b,!0)}),a._data(this,c,a.guid++)),!1},teardown:function(){return this!==document&&a.event.remove(document,c+"."+a._data(this,c)),!1}}}),a.event.special.ready={setup:function(){this===document&&d("'ready' event is deprecated")}};var M=a.fn.andSelf||a.fn.addBack,N=a.fn.find;if(a.fn.andSelf=function(){return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),M.apply(this,arguments)},a.fn.find=function(a){var b=N.apply(this,arguments);return b.context=this.context,b.selector=this.selector?this.selector+" "+a:a,b},a.Callbacks){var O=a.Deferred,P=[["resolve","done",a.Callbacks("once memory"),a.Callbacks("once memory"),"resolved"],["reject","fail",a.Callbacks("once memory"),a.Callbacks("once memory"),"rejected"],["notify","progress",a.Callbacks("memory"),a.Callbacks("memory")]];a.Deferred=function(b){var c=O(),e=c.promise();return c.pipe=e.pipe=function(){var b=arguments;return d("deferred.pipe() is deprecated"),a.Deferred(function(d){a.each(P,function(f,g){var h=a.isFunction(b[f])&&b[f];c[g[1]](function(){var b=h&&h.apply(this,arguments);b&&a.isFunction(b.promise)?b.promise().done(d.resolve).fail(d.reject).progress(d.notify):d[g[0]+"With"](this===e?d.promise():this,h?[b]:arguments)})}),b=null}).promise()},c.isResolved=function(){return d("deferred.isResolved is deprecated"),"resolved"===c.state()},c.isRejected=function(){return d("deferred.isRejected is deprecated"),"rejected"===c.state()},b&&b.call(c,c),c}}}(jQuery,window);

// jQuery Caret Plugin
/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
// @formatter:off
(function(e,t,n,r){e.fn.caret=function(i,s){var o,u,a=this[0],f=e.browser.msie;if(typeof i==="object"&&typeof i.start==="number"&&typeof i.end==="number"){o=i.start;u=i.end}else if(typeof i==="number"&&typeof s==="number"){o=i;u=s}else if(typeof i==="string"){if((o=a.value.indexOf(i))>-1)u=o+i[t];else o=null}else if(Object.prototype.toString.call(i)==="[object RegExp]"){var l=i.exec(a.value);if(l!=null){o=l.index;u=o+l[0][t]}}if(typeof o!="undefined"){if(f){var c=this[0].createTextRange();c.collapse(true);c.moveStart("character",o);c.moveEnd("character",u-o);c.select()}else{this[0].selectionStart=o;this[0].selectionEnd=u}this[0].focus();return this}else{if(f){var h=document.selection;if(this[0].tagName.toLowerCase()!="textarea"){var p=this.val(),d=h[n]()[r]();d.moveEnd("character",p[t]);var v=d.text==""?p[t]:p.lastIndexOf(d.text);d=h[n]()[r]();d.moveStart("character",-p[t]);var m=d.text[t]}else{var d=h[n](),g=d[r]();g.moveToElementText(this[0]);g.setEndPoint("EndToEnd",d);var v=g.text[t]-d.text[t],m=v+d.text[t]}}else{var v=a.selectionStart,m=a.selectionEnd}var y=a.value.substring(v,m);return{start:v,end:m,text:y,replace:function(e){return a.value.substring(0,v)+e+a.value.substring(m,a.value[t])}}}}})($,"length","createRange","duplicate")
// @formatter:on

$.fn.reverse = [].reverse;

/**
 * Constructs a new ReplyHelper instance
 * @constructor
 */
function ReplyHelper() {
  this.insertStyles();
  this.registerHandler();
  this.enableQuoteBubble();
}

ReplyHelper.prototype = {

  quotedMessage : null,

  /**
   * Reply to a message with a given ID
   * @param id The ID of the message to reply to
   * @param trigger The string that triggered our script to run.
   */
  replyTo : function( id, trigger ) {
    trigger = trigger || ":";
    // If : wasn't our trigger, we assume that we'll need additional padding after the trigger.
    var _padding = "";
    if( ":" != trigger && !trigger.match( / $/ ) ) {
      _padding = " ";
    }

    var _inputElement = $( "#input" );
    var _caretPosition = _inputElement.caret().start;
    var _currentText = _inputElement.val();
    var _newText = _currentText.replace( new RegExp( "^" + trigger.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&" ) + "\\d* ?" ), trigger + _padding + id + " " );
    _inputElement.val( _newText );
    _inputElement.caret( _caretPosition, _caretPosition );
  },

  /**
   * Scroll a given message into view
   * @param message The message to scroll into view (jQuery object)
   */
  scrollTo : function( message ) {
    // new mobile UI uses a scroll container
    var scrollContainer = $( "main.scrollable" );
    if( scrollContainer.length ) {
      // See http://stackoverflow.com/a/2906009
      var _target = message.offset().top // message to top of screen
          - scrollContainer.offset().top // scroll container to top of screen - exclude header
          + scrollContainer.scrollTop() // current scroll position - since message.offset() is viewport distance, need to compensate
          - message.closest( ".user-container" ).find( ".signature" ).height(); // username & avatar
      if( _target < 0 ) _target = 0;
      scrollContainer.animate( { scrollTop : _target }, 50 );
    } else { // desktop and old mobile UI just scrolled the whole page
      if( !message.offset() ) return;

      var _target = message.offset().top - 10;
      if( _target < 0 ) _target = 0;
      $( "html, body" ).animate( { scrollTop : _target }, 50 );
    }
  },
  
  /**
   * Inserts styles used by this script into the page.
   * Required to highlight reply target on mobile chat.
   */
  insertStyles : function() {
    var style = document.createElement( "style" );
    style.textContent = "div.message.reply-parent, div.message.reply-child { background-color: silver; }";
    style.type = "text/css";
    document.head.appendChild( style );
  },

  /**
   * Does all the things needed to mark a new message as the message that is being replied to.
   * @param _target
   */
  updateReply : function( _target, _trigger ) {
    // Put our marker and highlight classes on it...
    _target.addClass( "reply-child se-highlight-helper" );
    // ...and make sure it's scrolled into view.
    this.scrollTo( _target );

    // Now grab the ID of the new message...
    var _id = _target.attr( "id" );
    // ...and update our input box.
    if( _id ) this.replyTo( _id.substring( "message-".length ), _trigger );
  },

  registerHandler : function() {
    var replyHelper = this;
    $( "#input" ).keydown(
      function( e ) {
        // Store reference to input element
        var _inputElement = $( "#input" );
        // Don't use reply-to helper when a previous message is being edited
        if( _inputElement.hasClass( "editing" ) ) return;

        // Store a reference to the text in the input element
        var _text = _inputElement.val();
        // Run a magic regular expression on the input text
        // - Line has to start with :
        // - Followed by either
        //     - End of Line
        //     - One or more digits
        //     - A space
        var _idMatch = _text.match( /^(:|!!telll? ?|!!s\/.*\/.*\/\w* ?)($|\d+| )/ );

        // If the expression matched anything...
        if( _idMatch ) {
          // 38 = Up Arrow, 40 == Down Arrow
          if( 38 == e.keyCode || 40 == e.keyCode ) {

            // Determine which character sequence caused our reply helper to be invoked.
            var _trigger = _idMatch[ 1 ];

            // Find the position of the caret
            var _caretPosition = _inputElement.caret().start;
            // If it is behind the ID, don't do anything (could conflict with multi-line editing).
            if( _caretPosition > _idMatch[ 0 ].length + 1 ) return;

            // Determine if the user is moving upwards or downwards
            var _direction = ( 38 == e.keyCode ) ? -1 : 1;

            // Find the message that was previously selected by the user,
            // because we now want to select another message relative to it.
            var _previousMarker = $( ".reply-child.se-highlight-helper" );
            // Did we find a previous marker?
            if( 0 < _previousMarker.length ) {
              // We only care about the first match
              _previousMarker = _previousMarker.first();
              // Remove the previous CSS marker classes from it.
              _previousMarker.removeClass( "reply-child se-highlight-helper" );

              // Grab a collection of all messages.
              var _messages = $( ".messages .message" );
              // Reverse the selection, depending on which direction we're moving.
              if( -1 == _direction ) _messages = _messages.reverse();

              // Iterate over all messages.
              _messages.each( function( index, item ) {
                // If the message we're currently looking at, is the one we previously marked...
                if( $( item ).attr( "id" ) == _previousMarker.attr( "id" ) ) {
                  // ...select the message after it as the new target.
                  var _target = $( _messages[ index + 1 ] ).first();
                  if( !_target ) return;

                  replyHelper.updateReply( _target, _trigger );
                }
              } );

            } else {
              // If no message was previously selected, just target the last message in the log.
              var _messages = $( ".messages .message" );
              var _target = _messages.last();
              if( !_target ) return;

              replyHelper.updateReply( _target, _trigger );

              // If we were just beginning a new reply, put the caret after the ID
              if( _text == _trigger ) {
                var _newCaretPosition = _inputElement.val().length;
                _inputElement.caret( _newCaretPosition, _newCaretPosition );
              }
            }

            e.preventDefault();
          }

        } else {
          // If the user isn't replying to anything,
          // make sure the markers are cleared.
          $( ".reply-child.se-highlight-helper" ).removeClass( "reply-child se-highlight-helper" );
        }
      } );

    $( document ).on( "click", ".newreply", function( event ) {
      replyHelper.updateReply( $( this ).parents( ".messages .message" ) );
    } );
  },

  /**
   * Enables a bubble that shows the content of the message replied to.
   * This bubble is shown when hovering over the icon that indicates that a message is a reply.
   */
  enableQuoteBubble : function() {
    $( document ).on( "mousemove", function( event ) {
      if( null == replyHelper.quotedMessage ) return;

      // Determine the height of the reply bubble.
      // We need to do this here because when we attach the bubble to the DOM,
      // the height is not yet available.
      var messageHeight = replyHelper.quotedMessage.height();
      if( 0 == messageHeight ) return;

      // Calculate the correct position for the bubble.
      var left = event.pageX;
      var top = event.pageY - ( messageHeight + 30 );
      replyHelper.quotedMessage.attr( "style", "position : absolute;" +
                                               "left:" + left + "px;" +
                                               "top:" + top + "px;" +
                                               "z-index : 3;" +
                                               "min-width : 0px;"
      );
    } );

    $( document ).on( "mouseenter", ".reply-info", function( event ) {
      var quotedMessage = null;

      // Determine the ID of the message that was replied to.
      var href = $( this ).attr( "href" );
      var hashPosition = href.lastIndexOf( "#" );
      var originalId = href.substr( hashPosition + 1 );

      // Find the original message (if it is still in the log).
      var originalMessage = $( "#message-" + originalId );
      if( 0 < originalMessage.length ) {
        // Get the actual message
        var messageContent = $( ".content", originalMessage ).html();

        // Was the message from us?
        var wasMine = originalMessage.parents( ".user-container" ).hasClass( "mine" );

        // Try to find a timestamp
        // We search a bit here and there, as other extensions can add timestamps at other places.
        var timestamp = null;
        var messageChild = $( ".timestamp", originalMessage );
        var messageSibling = $( originalMessage ).siblings( ".timestamp" );
        if( 0 < messageChild.length ) {
          timestamp = messageChild;
        } else if( 0 < messageSibling.length ) {
          timestamp = messageSibling;
        }

        // Find the author
        var author = null;
        var signature = originalMessage.parents( ".messages" ).siblings( ".signature" );
        if( 0 < signature.length ) {
          author = signature.clone();
          // Remove all but the tiny signature
          var tinySignature = $( ".tiny-signature", author ).detach();
          $( author ).empty().append( tinySignature );
          $( tinySignature ).show();

          // Construct our new author overlay
          var backgroundColor = originalMessage.parents( ".messages" ).css( "background-color" );
          author.attr( "style", "background-color : " + backgroundColor + ";" +
                                "width : inherit;" +
                                "border-top : 1px solid black;" +
                                "border-right : 1px solid black;" +
                                "border-left : 1px solid black;" +
                                "border-top-left-radius : 6px;" +
                                "border-top-right-radius : 6px;" +
                                "padding : 2px 5px 2px 5px;" +
                                "z-index : 2;" +
                                "position : relative;" +
                                "top : 1px;"
          );
        }

        // Construct the final message element.
        quotedMessage = $(
          "<div class='user-container monologue'>"
            + "<div class='messages'>"
            + "<div class='message'>"
            + "<div class='content'>"
            + messageContent
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
        );
        quotedMessage.attr( "style", "position : absolute;" +
                                     "top : -9999;"
        );
        $( ".messages", quotedMessage ).attr( "style", "border : 1px solid black;" +
                                                       "border-top-left-radius : 0;" +
                                                       "max-width : 660px;" +
                                                       "width : inherit;"

        );

        // Add marker if the message was from us.
        if( wasMine ) {
          quotedMessage.addClass( "mine" );
        }

        // Add the timestamp
        if( timestamp ) {
          var timestampNode = $( "<div class='timestamp'>" + timestamp.text() + "</div>" );
          $( ".message", quotedMessage ).before( timestampNode );
        }
        // Add the author
        if( author ) {
          $( ".messages", quotedMessage ).before( author );
        }

        // Add the bubble to the DOM.
        $( this ).parents( ".monologue" ).before( quotedMessage );

        // Remember the element for later removal.
        replyHelper.quotedMessage = quotedMessage;
      }
    } );

    $( document ).on( "mouseleave", ".reply-info", function( event ) {
      if( null != replyHelper.quotedMessage ) {
        // Remove the quote bubble
        replyHelper.quotedMessage.remove();
        replyHelper.quotedMessage = null;
      }
    } );
  }
};

// Construct extension instance
var replyHelper = new ReplyHelper();
