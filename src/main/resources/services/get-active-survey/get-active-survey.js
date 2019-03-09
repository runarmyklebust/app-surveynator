var surveyLib = require("/lib/survey");

exports.get = function (req) {

    var result = surveyLib.getActiveSurvey("/");

    return {
        status: 200,
        body: result,
        contentType: 'application/json'
    }
};
