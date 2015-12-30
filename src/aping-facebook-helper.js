"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-facebok
 @licence MIT
 */

jjtApingFacebook.service('apingFacebookHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlattformString = function () {
        return "facebook";
    };

    this.getThisPlattformLink = function () {
        return "https://facebook.com/";
    };

    /**
     * returns object with attributes "width" and "height" of video
     *
     * @param _format {Object}
     * @returns {Object}
     */
    this.getRatioFromFormatObject = function (_format) {
        var ratio = {
            width:undefined,
            height:undefined,
        };
        if (typeof _format !== "undefined" && _format.constructor === Array) {
            angular.forEach(_format, function (value, key) {
                if(typeof value.filter !== "undefined") {
                    if(value.filter === "native") {
                        if(typeof value.width !== "undefined") {
                            ratio.width = value.width;
                        }
                        if(typeof value.height !== "undefined") {
                            ratio.height = value.height;
                        }
                    }
                }
            });
            return ratio;
        }
    };

    /**
     * returns the difference between two integers
     *
     * @param _int1 {number}
     * @param _int2 {number}
     * @returns {number}
     */
    this.getDifference = function (_int1, _int2) {
        if(_int1 > _int2) {
            return _int1 - _int2;
        } else {
            return _int2 - _int1;
        }
    };

    /**
     * returns an object with images urls and dimensions
     *
     * @param _array {Array}
     * @returns {Object}
     */
    this.getImagesFromImageArray = function (_array) {

        var that = this;

        var returnObject = {
            thumb_url: undefined,
            thumb_width: undefined, // best case 200px (min)
            thumb_height: undefined,
            img_url: undefined,
            img_width: undefined, // best case 700px
            img_height: undefined,
            native_url: undefined,
            native_width: undefined,
            native_height: undefined,
        };

        if (_array.constructor === Array) {
            angular.forEach(_array, function (value, key) {
                if(typeof value.source !== "undefined") {
                    if(typeof returnObject.thumb_url === "undefined") {
                        returnObject.thumb_url = value.source;
                        returnObject.thumb_width = value.width;
                        returnObject.thumb_height = value.height;
                    } else {
                        if(
                            that.getDifference(returnObject.thumb_width, 200) > that.getDifference(value.width, 200)
                            &&
                            value.width >= 200
                        ) {
                            returnObject.thumb_url = value.source;
                            returnObject.thumb_width = value.width;
                            returnObject.thumb_height = value.height;
                        }
                    }

                    if(typeof returnObject.img_url === "undefined") {
                        returnObject.img_url = value.source;
                        returnObject.img_width = value.width;
                        returnObject.img_height = value.height;
                    } else {
                        if(
                            that.getDifference(returnObject.img_width, 700) > that.getDifference(value.width, 700)
                        ) {
                            returnObject.img_url = value.source;
                            returnObject.img_width = value.width;
                            returnObject.img_height = value.height;
                        }
                    }

                    if(typeof returnObject.native_url === "undefined") {
                        returnObject.native_url = value.source;
                        returnObject.native_width = value.width;
                        returnObject.native_height = value.height;
                    } else {
                        if(
                            value.width > returnObject.native_width
                        ) {
                            returnObject.native_url = value.source;
                            returnObject.native_width = value.width;
                            returnObject.native_height = value.height;
                        }
                    }
                }
            });
        }

        return returnObject;
    };

    this.getObjectByJsonData = function (_data, _helperObject) {
        var requestResults = [];
        if (_data) {
            var _this = this;

            if (_data.data) {

                angular.forEach(_data.data, function (value, key) {
                    var tempResult;
                    if(_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                        tempResult = value;
                    } else {
                        tempResult = _this.getItemByJsonData(value, _helperObject.model);
                    }
                    if(tempResult) {
                        requestResults.push(tempResult);
                    }
                });
            }

        }
        return requestResults;
    };

    this.getItemByJsonData = function (_item, _model) {
        var returnObject = {};
        if (_item && _model) {
            switch (_model) {
                case "social":
                    returnObject = this.getSocialItemByJsonData(_item);
                    break;
                case "video":
                    returnObject = this.getVideoItemByJsonData(_item);
                    break;
                case "image":
                    returnObject = this.getImageItemByJsonData(_item);
                    break;
                case "event":
                    returnObject = this.getEventItemByJsonData(_item);
                    break;

                default:
                    return false;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingModels.getNew("social", this.getThisPlattformString());

        $.extend(true, socialObject, {
            blog_name: _item.from.name,
            blog_id: _item.from.id,
            blog_link: this.getThisPlattformLink() + _item.from.id + "/",
            intern_type: _item.type,
            intern_id: _item.id,
            img_url: _item.full_picture,
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600*1000)
        });

        socialObject.date_time = new Date(socialObject.timestamp);

        switch (_item.type) {
            case 'photo':
                socialObject.type = "image";
                socialObject.post_url = _item.link;
                socialObject.text = _item.message;
                break;

            case 'status':
                socialObject.type = "post";
                break;

            case 'link':
                socialObject.type = "link";
                socialObject.post_url = this.getThisPlattformLink() + _item.id + "/";
                socialObject.content_url = _item.link;
                socialObject.caption = _item.name;
                break;

            case 'video':
                socialObject.type = "video";
                if (_item.name) {
                    socialObject.caption = _item.name;
                }
                break;

            case 'event':
                socialObject.type = "event";
                socialObject.text = _item.description;
                socialObject.caption = _item.caption || _item.name || undefined;
                break;
        }

        if (!socialObject.text) {
            socialObject.text = _item.message;
        }

        if (!socialObject.text) {
            socialObject.text = _item.name;
        }


        if (!socialObject.post_url) {
            if (!_item.id) {
                socialObject.post_url = _item.link;
            } else {
                socialObject.post_url = this.getThisPlattformLink() + _item.id + "/";
            }
        }


        return socialObject;
    };

    this.getVideoItemByJsonData = function (_item) {
        var videoObject = apingModels.getNew("video", this.getThisPlattformString());

        $.extend(true, videoObject, {
            blog_name: _item.from.name,
            blog_id: _item.from.id,
            blog_link: this.getThisPlattformLink() + _item.from.id + "/",
            intern_id: _item.id,
            post_url: _item.permalink_url,
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600*1000),
            text: _item.description,
            markup: _item.embed_html || undefined,
            source: _item.source || undefined,
        });

        videoObject.date_time = new Date(videoObject.timestamp);

        if(typeof _item.length !== "undefined") {
            videoObject.length = _item.length;
        }

        if(typeof _item.format !== "undefined") {
            if (_item.format.length > 0) {

                if (_item.format.length >= 3) {
                    videoObject.img_url = _item.format[2].picture;
                } else {
                    videoObject.img_url = _item.format[_item.format.length - 1].picture;
                }

                var ratio = this.getRatioFromFormatObject(_item.format);
                if(typeof ratio.width !== "undefined") {
                    videoObject.width = ratio.width;
                }
                if(typeof ratio.height !== "undefined") {
                    videoObject.height = ratio.height;
                }
            }
        }

        return videoObject;
    };

    this.getImageItemByJsonData = function (_item) {
        var imageObject = apingModels.getNew("image", this.getThisPlattformString());

        $.extend(true, imageObject, {
            blog_name: _item.from.name,
            blog_id: _item.from.id,
            blog_link: this.getThisPlattformLink() + _item.from.id + "/",
            intern_id: _item.id,
            post_url: _item.link,
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600*1000),
            text: _item.name || undefined,
            source: _item.images || undefined,
        });

        imageObject.date_time = new Date(imageObject.timestamp);

        if (_item.images.length > 0) {

            var tempImageArray = this.getImagesFromImageArray(_item.images);

            $.extend(true, imageObject, tempImageArray);
        }

        return imageObject;
    };

    this.getEventItemByJsonData = function (_item) {
        var eventObject = apingModels.getNew("event", this.getThisPlattformString());

        $.extend(true, eventObject, {
            artist_name: _item.owner.name,
            artist_id: _item.owner.id,
            artist_link: this.getThisPlattformLink() + _item.owner.id + "/",
            intern_id: _item.id,
            event_url: this.getThisPlattformLink() + _item.owner.id + "_" + _item.id + "/",
            ticket_url: _item.ticket_uri || undefined,
            start_timestamp: apingTimeHelper.getTimestampFromDateString(_item.start_time, 1000, 3600*1000),
            end_timestamp: _item.end_time ? apingTimeHelper.getTimestampFromDateString(_item.end_time, 1000, 3600*1000) : undefined,
            caption: _item.name || undefined,
            text: _item.description || undefined,
            img_url: _item.cover ? _item.cover.source : undefined,
        });

        if(eventObject.start_timestamp) {
            eventObject.start_date_time = new Date(eventObject.start_timestamp);
        }
        if(eventObject.end_timestamp) {
            eventObject.end_date_time = new Date(eventObject.end_timestamp);
        }


        if (_item.place) {
            eventObject.place_name = _item.place.name || undefined;
            if (_item.place.location) {
                eventObject.city = _item.place.location.city || undefined;
                eventObject.country = _item.place.location.country || undefined;
                eventObject.latitude = _item.place.location.latitude || undefined;
                eventObject.longitude = _item.place.location.longitude || undefined;
                eventObject.street = _item.place.location.street || undefined;
                eventObject.zip = _item.place.location.zip || undefined;
            }
        }

        return eventObject;
    };
}]);