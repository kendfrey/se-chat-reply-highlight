// ==UserScript==
//
// @name           SE Chat Reply Highlight
// @description    Highlights the message you're replying to.
// @homepage       http://github.com/oliversalzburg/se-chat-reply-highlight/
// @namespace      http://oliversalzburg.github.com/
// @author         Oliver Salzburg, oliversalzburg (http://github.com/oliversalzburg/)
// @license        MIT License (http://opensource.org/licenses/mit-license.php)
//
// @include        http://chat.stackexchange.com/*
//
// @version        0.3
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
  $( function() {

    $( "#input" ).keyup(
      function() {
        var _text = $( "#input" ).val();
        var _pattern = /^:(\d+)/g;
        var _matches = _pattern.exec( _text );

        $( ".reply-child" ).removeClass( "reply-child" );
        if( _matches && _matches[1] ) {
          $( "#message-" + _matches[1] ).first().addClass( "reply-child" );
        }
      } );

  } );
}

// load jQuery and execute the main function
addJQuery( main );