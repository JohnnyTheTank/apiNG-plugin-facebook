"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-facebook
 @licence MIT
 */

var jjtApingFacebook = angular.module("jtt_aping_facebook", ['jtt_facebook'])
    .directive('apingFacebook', ['apingFacebookHelper', 'apingUtilityHelper', 'facebookFactory', function (apingFacebookHelper, apingUtilityHelper, facebookFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingFacebook, apingFacebookHelper.getThisPlattformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };
                    if(typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        page: request.page,
                        access_token: apingUtilityHelper.getApiCredentials(apingFacebookHelper.getThisPlattformString(), "access_token"),
                    };
                    if(typeof request.items !== "undefined") {
                        requestObject.limit = request.items;
                    } else {
                        requestObject.limit = appSettings.items;
                    }

                    if(requestObject.limit == 0) {
                        return false;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if(requestObject.limit < 0 || isNaN(requestObject.limit)) {
                        requestObject.limit = undefined;
                    }

                    // the api has a limit of 100 items per request
                    if(requestObject.limit > 100) {
                        requestObject.limit = 100;
                    }

                    if (request.page) { //search for page id

                        switch(appSettings.model) {
                            case "social":
                                facebookFactory.getPostsFromPageById(requestObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                        }
                                    });
                                break;

                            case "video":
                                facebookFactory.getVideosFromPageById(requestObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                        }
                                    });
                                break;

                            case "image":
                                facebookFactory.getPhotosFromPageById(requestObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                        }
                                    });
                                break;

                            case "event":
                                facebookFactory.getEventsFromPageById(requestObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                        }
                                    });
                                break;
                        }

                    }

                });
            }
        }
    }]);