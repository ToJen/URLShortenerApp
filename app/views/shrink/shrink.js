var fetchModule = require("fetch");
var applicationSettings = require("application-settings");
var frameModule = require("ui/frame");

var longUrl;
var urls;

exports.pageLoaded = function(args) {
    var page = args.object;
    longUrl = page.getViewById("longUrl");
    urls = JSON.parse(applicationSettings.getString("urls", "[]"));
}

exports.shorten = function() {
    if(longUrl.text) {
        var urlCheck = RegExp("^(http|https)://");
        var parsedUrl = urlCheck.test(longUrl.text) ? longUrl.text : "http://" + longUrl.text ;
        fetchModule.fetch("http://tinyurl.com/api-create.php?url=" + parsedUrl)
        .then(function (response) {
            urls.push({longUrl: parsedUrl, shortUrl: response._bodyText});
            applicationSettings.setString("urls", JSON.stringify(urls));
            frameModule.goBack();
            // alert({title: "Success!", message: response._bodyText, okButtonText: "Close"});
        }, function (error) {
            console.log(JSON.stringify(error));
        })
    }
    else {
        alert({title: "Attention!", message: "The URL field cannot be empty", okButtonText: "Close"});
    }
}