var frameModule = require("ui/frame");
var applicationSettings = require("application-settings");
var utilityModule = require("utils/utils");

var urls;

exports.pageLoaded = function(args) {
    var page = args.object;
    urls = JSON.parse(applicationSettings.getString("urls", "[]"));
    page.bindingContext = { myUrls: urls };
}

exports.shorten = function() {
    frameModule.topmost().navigate("views/shrink/shrink");
}

exports.launch = function(args) {
    utilityModule.openUrl(args.view.bindingContext.shortUrl);
}