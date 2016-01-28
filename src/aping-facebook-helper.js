"use strict";

angular.module("jtt_aping_facebook")
    .service('apingFacebookHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', 'facebookPagesImages', function (apingModels, apingTimeHelper, apingUtilityHelper, facebookPagesImages) {
        this.getThisPlatformString = function () {
            return "facebook";
        };

        this.getThisPlatformLink = function () {
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
                width: undefined,
                height: undefined,
            };
            if (typeof _format !== "undefined" && _format.constructor === Array) {
                angular.forEach(_format, function (value, key) {
                    if (typeof value.filter !== "undefined") {
                        if (value.filter === "native") {
                            if (typeof value.width !== "undefined") {
                                ratio.width = value.width;
                            }
                            if (typeof value.height !== "undefined") {
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
            if (_int1 > _int2) {
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
        this.getImagesFromArray = function (_array, _imgPropertyName) {

            if (angular.isUndefined(_imgPropertyName)) {
                _imgPropertyName = "source";
            }

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

                    if (angular.isDefined(value[_imgPropertyName])) {
                        if (angular.isUndefined(returnObject.thumb_url)) {
                            returnObject.thumb_url = value[_imgPropertyName];
                            returnObject.thumb_width = value.width;
                            returnObject.thumb_height = value.height;
                        } else {
                            if (
                                that.getDifference(returnObject.thumb_width, 200) > that.getDifference(value.width, 200)
                                &&
                                value.width >= 200
                            ) {
                                returnObject.thumb_url = value[_imgPropertyName];
                                returnObject.thumb_width = value.width;
                                returnObject.thumb_height = value.height;
                            }
                        }

                        if (angular.isUndefined(returnObject.img_url)) {
                            returnObject.img_url = value[_imgPropertyName];
                            returnObject.img_width = value.width;
                            returnObject.img_height = value.height;
                        } else {
                            if (
                                that.getDifference(returnObject.img_width, 700) > that.getDifference(value.width, 700)
                            ) {
                                returnObject.img_url = value[_imgPropertyName];
                                returnObject.img_width = value.width;
                                returnObject.img_height = value.height;
                            }
                        }

                        if (angular.isUndefined(returnObject.native_url)) {
                            returnObject.native_url = value[_imgPropertyName];
                            returnObject.native_width = value.width;
                            returnObject.native_height = value.height;
                        } else {
                            if (
                                value.width > returnObject.native_width
                            ) {
                                returnObject.native_url = value[_imgPropertyName];
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

                if (_data.data && _data.data.data) {

                    angular.forEach(_data.data.data, function (value, key) {
                        var tempResult;
                        if (_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                            tempResult = value;
                        } else {
                            tempResult = _this.getItemByJsonData(value, _helperObject);
                        }
                        if (tempResult) {
                            requestResults.push(tempResult);
                        }
                    });
                }

            }
            return requestResults;
        };

        this.getItemByJsonData = function (_item, _helperObject) {
            var returnObject = {};
            if (_item && _helperObject.model) {
                switch (_helperObject.model) {
                    case "social":
                        returnObject = this.getSocialItemByJsonData(_item, _helperObject);
                        break;
                    case "video":
                        returnObject = this.getVideoItemByJsonData(_item, _helperObject);
                        break;
                    case "image":
                        returnObject = this.getImageItemByJsonData(_item, _helperObject);
                        break;
                    case "event":
                        returnObject = this.getEventItemByJsonData(_item, _helperObject);
                        break;

                    default:
                        return false;
                }
            }
            return returnObject;
        };

        this.getSocialItemByJsonData = function (_item, _helperObject) {
            var socialObject = apingModels.getNew("social", this.getThisPlatformString());

            angular.extend(socialObject, {
                blog_name: _item.from.name,
                blog_id: _item.from.id,
                blog_link: this.getThisPlatformLink() + _item.from.id + "/",
                intern_type: _item.type,
                intern_id: _item.id,
                thumb_url: _item.picture,
                img_url: _item.full_picture,
                native_url: _item.full_picture,
                timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600 * 1000)
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
                    socialObject.post_url = this.getThisPlatformLink() + _item.id + "/";
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
                    socialObject.post_url = this.getThisPlatformLink() + _item.id + "/";
                }
            }

            if ((_helperObject.showAvatar === true || _helperObject.showAvatar === "true") && !socialObject.img_url) {
                if (facebookPagesImages[_item.from.id]) {
                    socialObject.img_url = facebookPagesImages[_item.from.id];
                }
            }

            return socialObject;
        };

        this.getVideoItemByJsonData = function (_item, _helperObject) {
            var videoObject = apingModels.getNew("video", this.getThisPlatformString());

            angular.extend(videoObject, {
                blog_name: _item.from.name,
                blog_id: _item.from.id,
                blog_link: this.getThisPlatformLink() + _item.from.id + "/",
                intern_id: _item.id,
                post_url: _item.permalink_url,
                timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600 * 1000),
                text: _item.description,
                markup: _item.embed_html || undefined,
                source: _item.source || undefined,
            });

            videoObject.date_time = new Date(videoObject.timestamp);

            if (typeof _item.length !== "undefined") {
                videoObject.length = _item.length;
            }


            if (typeof _item.format !== "undefined") {
                if (_item.format.length > 0) {

                    var tempImageArray = this.getImagesFromArray(_item.format, "picture");

                    tempImageArray.thumb_width = undefined;
                    tempImageArray.thumb_height = undefined;
                    tempImageArray.img_width = undefined;
                    tempImageArray.img_height = undefined;
                    tempImageArray.native_width = undefined;
                    tempImageArray.native_height = undefined;

                    angular.extend(videoObject, tempImageArray);


                    var ratio = this.getRatioFromFormatObject(_item.format);
                    if (typeof ratio.width !== "undefined") {
                        videoObject.width = ratio.width;
                    }
                    if (typeof ratio.height !== "undefined") {
                        videoObject.height = ratio.height;
                    }
                }
            }

            if ((_helperObject.showAvatar === true || _helperObject.showAvatar === "true") && !videoObject.img_url) {
                if (facebookPagesImages[_item.from.id]) {
                    videoObject.img_url = facebookPagesImages[_item.from.id];
                }
            }

            return videoObject;
        };

        this.getImageItemByJsonData = function (_item, _helperObject) {
            var imageObject = apingModels.getNew("image", this.getThisPlatformString());

            angular.extend(imageObject, {
                blog_name: _item.from.name,
                blog_id: _item.from.id,
                blog_link: this.getThisPlatformLink() + _item.from.id + "/",
                intern_id: _item.id,
                post_url: _item.link,
                timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600 * 1000),
                text: _item.name || undefined,
                source: _item.images || undefined,
            });

            imageObject.date_time = new Date(imageObject.timestamp);

            if (_item.images.length > 0) {

                var tempImageArray = this.getImagesFromArray(_item.images, "source");
                angular.extend(imageObject, tempImageArray);
            }

            return imageObject;
        };

        this.getEventItemByJsonData = function (_item, _helperObject) {
            var eventObject = apingModels.getNew("event", this.getThisPlatformString());

            angular.extend(eventObject, {
                artist_name: _item.owner.name,
                artist_id: _item.owner.id,
                artist_link: this.getThisPlatformLink() + _item.owner.id + "/",
                intern_id: _item.id,
                event_url: this.getThisPlatformLink() + _item.owner.id + "_" + _item.id + "/",
                ticket_url: _item.ticket_uri || undefined,
                start_timestamp: apingTimeHelper.getTimestampFromDateString(_item.start_time, 1000, 3600 * 1000),
                end_timestamp: _item.end_time ? apingTimeHelper.getTimestampFromDateString(_item.end_time, 1000, 3600 * 1000) : undefined,
                caption: _item.name || undefined,
                text: _item.description || undefined,
                img_url: _item.cover ? _item.cover.source : undefined,
            });

            if (eventObject.start_timestamp) {
                eventObject.start_date_time = new Date(eventObject.start_timestamp);
            }
            if (eventObject.end_timestamp) {
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

            if ((_helperObject.showAvatar === true || _helperObject.showAvatar === "true") && !eventObject.img_url) {
                if (facebookPagesImages[_item.from.id]) {
                    eventObject.img_url = facebookPagesImages[_item.from.id];
                }
            }
            return eventObject;
        };
    }]);