// ==UserScript==
//
// @name           SE Chat Reply Helper
// @description    Highlights the message you're replying to.
// @homepage       http://github.com/oliversalzburg/se-chat-reply-highlight/
// @namespace      http://oliversalzburg.github.com/
// @author         Oliver Salzburg, oliversalzburg (http://github.com/oliversalzburg/)
// @license        MIT License (http://opensource.org/licenses/mit-license.php)
//
// @include        http://chat.stackexchange.com/*
//
// @version        0.999
//
// ==/UserScript==

// jQuery loading from http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery( callback, jqVersion ) {
  jqVersion = jqVersion || "1.8.3";
  var D = document;
  var target = D.getElementsByTagName( "head" )[ 0 ] || D.body || D.documentElement;
  var scriptNode = D.createElement( "script" );
  scriptNode.src = "//ajax.googleapis.com/ajax/libs/jquery/" + jqVersion + "/jquery.min.js";
  scriptNode.addEventListener( "load", function() {
    var scriptNode = D.createElement( "script" );
    scriptNode.textContent = "var gm_jQuery  = jQuery.noConflict(true);\n" +
                             "(" + callback.toString() + ")(gm_jQuery);";
    target.appendChild( scriptNode );
  }, false );
  target.appendChild( scriptNode );
}

/**
 * Main entry point
 * @param $ A reference to jQuery
 */
function main( $ ) {
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

  $( function() {
    
    $.fn.reverse = [].reverse;
    
    function replyTo( id ) {
      var _inputElement = $( "#input" );
      var _caretPosition = _inputElement.caret().start;
      var _currentText = _inputElement.val();
      var _newText = _currentText.replace( /^:\d* ?/, ":" + id + " " );
      _inputElement.val( _newText );
      _inputElement.caret( _caretPosition, _caretPosition );
    }
   
    function scrollTo( message ) {
      if( !message.offset() ) return;
      
      var _target = message.offset().top - 10;
      if( _target < 0 ) _target = 0;
      $( "html, body" ).animate( { scrollTop: _target }, 50 );
    }
    
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

            var _direction = ( 38 == e.keyCode ) ? -1 : 1;
            
            var _previousMarker = $( ".reply-child" );
            if( 0 < _previousMarker.length ) {
              _previousMarker = _previousMarker.first();
              $( ".reply-child" ).removeClass( "reply-child" );
              
              var _messages = $( ".messages .message" );
              if( -1 == _direction ) _messages = _messages.reverse();
              
              _messages.each( function( index, item ) {
                if( $( item ).attr( "id" ) == _previousMarker.attr( "id" ) ) {
                  var _target = $( _messages[ index + 1 ] ).first();
                  if( !_target ) return;
                  
                  _target.addClass( "reply-child" );
                  scrollTo( _target );
                  
                  var _id = $( _messages[ index + 1 ] ).attr( "id" );
                  if( _id ) replyTo( _id.substring( "message-".length ) );
                }
              } );
              
            } else {
              var _target = $( ".messages .message" ).last();
              if( !_target ) return;
              
              _target.addClass( "reply-child" );
              scrollTo( _target );
              
              var _id = $( ".messages .message" ).last().attr( "id" );
              if( _id ) replyTo( _id.substring( "message-".length ) );
            }
            
            e.preventDefault();
          }
          
        } else {
        
          var _pattern = /^:(\d+)/g;
          var _matches = _pattern.exec( _text );
  
          $( ".reply-child" ).removeClass( "reply-child" );
          if( _matches && _matches[1] ) {
            $( "#message-" + _matches[1] ).first().addClass( "reply-child" );
          }
        }
        
      } );

  } );
}

// load jQuery and execute the main function
addJQuery( main );