var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

pageMod.PageMod({
  include: ["@ant-sites-firefox-list@"],
  contentScriptFile: [data.url("jquery-1.8.3.min.js"), data.url("se-chat-replyhelper.js")],
  contentScriptWhen: "end"
});
