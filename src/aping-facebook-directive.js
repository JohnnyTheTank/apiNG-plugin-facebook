"use strict";

var jjtApingFacebook = angular.module("jtt_aping_facebook", ['jtt_facebook'])
    .directive('apingFacebook', ['apingFacebookHelper', 'apingUtilityHelper', 'facebookFactory', 'facebookPagesImages', function (apingFacebookHelper, apingUtilityHelper, facebookFactory, facebookPagesImages) {
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
                        showAvatar: request.showAvatar || false,
                    };
                    if (typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        page: request.page,
                        access_token: apingUtilityHelper.getApiCredentials(apingFacebookHelper.getThisPlattformString(), "access_token"),
                    };
                    if (typeof request.items !== "undefined") {
                        requestObject.limit = request.items;
                    } else {
                        requestObject.limit = appSettings.items;
                    }

                    if (requestObject.limit == 0) {
                        return false;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if (requestObject.limit < 0 || isNaN(requestObject.limit)) {
                        requestObject.limit = undefined;
                    }

                    // the api has a limit of 100 items per request
                    if (requestObject.limit > 100) {
                        requestObject.limit = 100;
                    }

                    if (request.page) { //search for page id

                        switch (appSettings.model) {
                            case "social":

                                if (helperObject.showAvatar === true || helperObject.showAvatar === "true") {
                                    facebookFactory.getPageById({
                                        page: requestObject.page,
                                        access_token: requestObject.access_token
                                    }).then(function (_pageData) {

                                        if (_pageData && _pageData.data && _pageData.data.id && _pageData.data.cover && _pageData.data.cover.source) {
                                            facebookPagesImages[_pageData.data.id] = _pageData.data.cover.source;
                                        }

                                        facebookFactory.getPostsFromPageById(requestObject)
                                            .then(function (_data) {
                                                if (_data) {
                                                    apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                                }
                                            });

                                    });
                                } else {
                                    facebookFactory.getPostsFromPageById(requestObject)
                                        .then(function (_data) {
                                            if (_data) {
                                                apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                            }
                                        });
                                }
                                break;

                            case "video":
                                if (helperObject.showAvatar === true || helperObject.showAvatar === "true") {
                                    facebookFactory.getPageById({
                                        page: requestObject.page,
                                        access_token: requestObject.access_token
                                    }).then(function (_pageData) {

                                        if (_pageData && _pageData.data && _pageData.data.id && _pageData.data.cover && _pageData.data.cover.source) {
                                            facebookPagesImages[_pageData.data.id] = _pageData.data.cover.source;
                                        }

                                        facebookFactory.getVideosFromPageById(requestObject)
                                            .then(function (_data) {
                                                if (_data) {
                                                    apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                                }
                                            });

                                    });
                                } else {
                                    facebookFactory.getVideosFromPageById(requestObject)
                                        .then(function (_data) {
                                            if (_data) {
                                                apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                            }
                                        });
                                }
                                break;

                            case "image":
                                facebookFactory.getPhotosFromPageById(requestObject)
                                    .then(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                        }
                                    });
                                break;

                            case "event":
                                if (helperObject.showAvatar === true || helperObject.showAvatar === "true") {
                                    facebookFactory.getPageById({
                                        page: requestObject.page,
                                        access_token: requestObject.access_token
                                    }).then(function (_pageData) {

                                        if (_pageData && _pageData.data && _pageData.data.id && _pageData.data.cover && _pageData.data.cover.source) {
                                            facebookPagesImages[_pageData.data.id] = _pageData.data.cover.source;
                                        }

                                        facebookFactory.getEventsFromPageById(requestObject)
                                            .then(function (_data) {
                                                if (_data) {
                                                    apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                                }
                                            });
                                    });
                                } else {
                                    facebookFactory.getEventsFromPageById(requestObject)
                                        .then(function (_data) {
                                            if (_data) {
                                                apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings));
                                            }
                                        });
                                }
                                break;
                        }
                    }
                });
            }
        }
    }]);