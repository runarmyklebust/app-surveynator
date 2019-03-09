var util = require('/lib/util');
var surveyLib = require('/lib/survey');
var portalLib = require('/lib/xp/portal');

exports.responseFilter = function (req, res) {

    //log.info("####### In survey response-filter: %s", JSON.stringify(req, null, 4));

    var result = portalLib.getContent();
    if (!result) {
        log.warn("Not able to get content, just continue without survey")
        return res
    }

    var svcUrl = portalLib.serviceUrl({service: 'Z'}).slice(0, -1)

    if (surveyLib.activeSurveys(result._path)) {
        var headEnd = initContribution(res, "headEnd");
        var bodyEnd = initContribution(res, "bodyEnd");

        headEnd.push(util.createCssContribution("css/survey.css"));
        bodyEnd.push(util.createJsContribution("js/survey.js", [{key: "data-svcurl", value: svcUrl}]));
    }

    return res;
};

var initContribution = function (res, type) {

    var contribution = res.pageContributions[type];
    if (!contribution) {
        res.pageContributions[type] = [];
    }
    if (typeof contribution === 'string') {
        res.pageContributions[type] = [contribution];
    }

    return contribution;
};