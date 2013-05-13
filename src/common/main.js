﻿// ==UserScript==
//
// @name           SE Chat Reply Helper
// @description    Highlights the message you're replying to.
// @homepage       http://github.com/oliversalzburg/se-chat-reply-highlight/
// @namespace      http://oliversalzburg.github.com/
// @author         Oliver Salzburg, oliversalzburg (http://github.com/oliversalzburg/)
// @license        MIT License (http://opensource.org/licenses/mit-license.php)
//
// @include        http://chat.stackexchange.com/*
// @require        jquery-1.8.3.min.js
//
// @version        1.0.1
//
// ==/UserScript==

var $ = window.$.noConflict(true); // Required for Opera and IE

// jQuery Caret Plugin
/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($,len,createRange,duplicate){
  $.fn.caret=function(options,opt2){
    var start,end,t=this[0],browser=$.browser.msie;
    if(typeof options==="object" && typeof options.start==="number" && typeof options.end==="number") {
      start=options.start;
      end=options.end;
    } else if(typeof options==="number" && typeof opt2==="number"){
      start=options;
      end=opt2;
    } else if(typeof options==="string"){
      if((start=t.value.indexOf(options))>-1) end=start+options[len];
      else start=null;
    } else if(Object.prototype.toString.call(options)==="[object RegExp]"){
      var re=options.exec(t.value);
      if(re != null) {
        start=re.index;
        end=start+re[0][len];
      }
    }
    if(typeof start!="undefined"){
      if(browser){
        var selRange = this[0].createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', start);
        selRange.moveEnd('character', end-start);
        selRange.select();
      } else {
        this[0].selectionStart=start;
        this[0].selectionEnd=end;
      }
      this[0].focus();
      return this
    } else {
      if(browser){
        var selection=document.selection;
        if (this[0].tagName.toLowerCase() != "textarea") {
          var val = this.val(),
            range = selection[createRange]()[duplicate]();
          range.moveEnd("character", val[len]);
          var s = (range.text == "" ? val[len]:val.lastIndexOf(range.text));
          range = selection[createRange]()[duplicate]();
          range.moveStart("character", -val[len]);
          var e = range.text[len];
        } else {
          var range = selection[createRange](),
            stored_range = range[duplicate]();
          stored_range.moveToElementText(this[0]);
          stored_range.setEndPoint('EndToEnd', range);
          var s = stored_range.text[len] - range.text[len],
            e = s + range.text[len]
        }
      } else {
        var s=t.selectionStart,
          e=t.selectionEnd;
      }
      var te=t.value.substring(s,e);
      return {start:s,end:e,text:te,replace:function(st){
        return t.value.substring(0,s)+st+t.value.substring(e,t.value[len])
      }}
    }
  }
})($,"length","createRange","duplicate");

$.fn.reverse = [].reverse;

function MyExtension() {
  this.registerHandler();
}

MyExtension.prototype = {

  _onCommand: function() {
    kango.browser.tabs.create( {url: 'http://kangoextensions.com/'} );
  },

  /**
   * Reply to a message with a given ID
   * @param id The ID of the message to reply to
   */
  replyTo: function( id ) {
    var _inputElement = $( "#input" );
    var _caretPosition = _inputElement.caret().start;
    var _currentText = _inputElement.val();
    var _newText = _currentText.replace( /^:\d* ?/, ":" + id + " " );
    _inputElement.val( _newText );
    _inputElement.caret( _caretPosition, _caretPosition );
  },

  /**
   * Scroll a given message into view
   * @param message The message to scroll into view (jQuery object)
   */
  scrollTo   : function( message ) {
    if( !message.offset() ) return;

    var _target = message.offset().top - 10;
    if( _target < 0 ) _target = 0;
    $( "html, body" ).animate( { scrollTop: _target }, 50 );
  },

  /**
   * Does all the things needed to mark a new message as the message that is being replied to.
   * @param _target
   */
  updateReply: function( _target ) {
    // Put our marker and highlight classes on it...
    _target.addClass( "reply-child se-highlight-helper" );
    // ...and make sure it's scrolled into view.
    this.scrollTo( _target );

    // Now grab the ID of the new message...
    var _id = _target.attr( "id" );
    // ...and update our input box.
    if( _id ) this.replyTo( _id.substring( "message-".length ) );
  },

  registerHandler:function() {
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
        var _idMatch = _text.match( /^:($|\d+| )/ );

        // If the expression matched anything...
        if( _idMatch ) {
          // 38 = Up Arrow, 40 == Down Arrow
          if( 38 == e.keyCode || 40 == e.keyCode ) {

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

                  replyHelper.updateReply( _target );
                }
              } );

            } else {
              // If no message was previously selected, just target the last message in the log.
              var _messages = $( ".messages .message" );
              var _target = _messages.last();
              if( !_target ) return;

              replyHelper.updateReply( _target );

              // If we were just beginning a new reply, put the caret after the ID
              if( _text == ":" ) {
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
  }
};

var extension = new MyExtension();