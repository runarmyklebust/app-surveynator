var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');

var surveyFolderPath;


exports.activeSurveys = function (path) {

    log.info("Checking for active services");

    var result = getSurveys(0, path);

    if (result.total > 0) {
        return true;
    }

    return false;
};

var getSurveys = function (count, path) {

    var query = {
        start: 0,
        count: count,
        query: "_parentPath = '" + "/content" + getSurveyFolderPath() + "'" +
               " AND data.active = 'true'" +
               " AND " +
               " ( data.surveyPaths = '" + getParentPath(path) + "' )"
    };

    //log.info("QUERY: %s", JSON.stringify(query, null, 4));
    return contentLib.query(query);

    //log.info("RESULT GET SURVEYS: %s", JSON.stringify(result, null, 4));
};

var getParentPath = function (path) {
    var parentPath = path.substr(0, path.lastIndexOf("/"));
    return parentPath ? parentPath : "/";
};

var getSurveyFolderPath = function () {

    if (surveyFolderPath) {
        return surveyFolderPath;
    }

    var config = portalLib.getSiteConfig();
    if (!config.surveysFolder) {
        log.error("Missing surveysFolder config");
        return null

    }

    var surveyContent = contentLib.get({
        key: config.surveysFolder
    });

    surveyFolderPath = surveyContent._path;
    return surveyFolderPath;
};

