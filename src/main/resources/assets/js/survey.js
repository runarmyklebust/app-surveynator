"use strict";
(function ($) {

    var getActiveSurveys = function () {
        return $.ajax({
            url: svcUrl + 'get-active-survey',
            method: 'GET'
        }).then(function (data) {
            return data;
        })
    };


    var svcUrl = document.currentScript.getAttribute('data-svcurl');
    console.log("Kicking off survey, received param svcUrl", svcUrl);

    getActiveSurveys().then(function (data) {
        console.log("Fetched surveyData", data);
    });


}(jQuery));