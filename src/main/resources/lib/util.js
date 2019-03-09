var portal = require('/lib/xp/portal');

var monthNames = [
    "jan", "feb", "mar",
    "apr", "mai", "jun", "jul",
    "aug", "sep", "okt",
    "nov", "des"
];

exports.keyExists = function checkNested(obj /*, level1, level2, ... levelN*/) {
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < args.length; i++) {
        if (!obj || !obj.hasOwnProperty(args[i])) {
            return false;
        }
        obj = obj[args[i]];
    }
    return true;
};

exports.formatDateTimeString = function (dateTimeString) {
    if (!dateTimeString) {
        return "";
    }
    var isoDate = new Date(dateTimeString);

    var date = new Date(isoDate.toLocaleDateString() + " " + isoDate.toLocaleTimeString());

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' kl. ' + hours + ":" + minutes;
};

exports.formatDateString = function (dateString) {
    if (!dateString) {
        return "";
    }
    var date = new Date(dateString);


    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
};

exports.createCssContribution = function (styleSheetPath) {

    var cssAssetPath = portal.assetUrl({
        path: styleSheetPath
    });

    if (!cssAssetPath) {
        log.warn("Could not find css-asset: %s", styleSheetPath);
    }

    return '<link rel="stylesheet" type="text/css" href="' + cssAssetPath + '">';
};

exports.createJsContribution = function (jsPath, params) {

    var jsAssetPath = portal.assetUrl({
        path: jsPath
    });

    if (!jsAssetPath) {
        log.warn("Could not find js-asset: %s", jsPath);
    }

    function createParamsString() {
        var pTags = "";
        params.forEach(function (param) {
            pTags += ' ' + param.key + '=' + '"' + param.value + '"'
        });
        return pTags;
    }

    return '<script type="text/javascript" src="' + jsAssetPath + '"' + createParamsString() + "></script>";
};

exports.getContentName = function (fullContentType) {

    var contentTypeSeparator = fullContentType.lastIndexOf(':');

    return fullContentType.substring(contentTypeSeparator + 1, fullContentType.length);
};

exports.forceArray = function (data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    return data;
};
