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
    var _newText = _currentText.replace( new RegExp( "^" + trigger + "\\d* ?" ), trigger + _padding + id + " " );
    _inputElement.val( _newText );
    _inputElement.caret( _caretPosition, _caretPosition );
  },

  /**
   * Scroll a given message into view
   * @param message The message to scroll into view (jQuery object)
   */
  scrollTo : function( message ) {
    // new mobile UI uses a scroll container
    var scrollContainer = $('main.scrollable');
    if (scrollContainer.length) {
      // See http://stackoverflow.com/a/2906009
      var _target = message.offset().top // message to top of screen
          - scrollContainer.offset().top // scroll container to top of screen - exclude header
          + scrollContainer.scrollTop() // current scroll position - since message.offset() is viewport distance, need to compensate
          - message.closest('.user-container').find('.signature').height(); // username & avatar
      if (_target < 0) _target = 0;
      scrollContainer.animate( { scrollTop : _target }, 50 );
    } else { // desktop and old mobile UI just scrolled the whole page
      if( !message.offset() ) return;

      var _target = message.offset().top - 10;
      if( _target < 0 ) _target = 0;
      $( "html, body" ).animate( { scrollTop : _target }, 50 );
    }
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
        var _idMatch = _text.match( /^(:|!!tell ?)($|\d+| )/ );

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
