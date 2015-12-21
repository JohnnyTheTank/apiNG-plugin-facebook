"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {
        facebook: [
            //{'access_token':'<YOUR_FACBEOOK_ACCESS_TOKEN>'},
            {'access_token':'CAAMC6AyvDH0BAChyXyiSXINl6nAZCaOP0nXS1T67ngaZA0svefRAJyWx3Y5bzic47wE4iZAMHCAAoQCvhUMZB3SQufDyio9g4vZAj5BgQXuMVDjVvqDrajfm7IEvN0U1O2JfC1FA2VfqpnYgRa9fF5ZAQBW4vHc6ZAmXryyJvzPQd5TkIdqUC4n'},
        ],
    });

    $provide.constant("apingDefaultSettings", {
        templateUrl : "aping_design_sample.html",
        items : 20, //items per request
        maxItems: 100, //max items per aping
        orderBy : "timestamp",
        orderReverse : "true",
        model: "social",
        getNativeData: false,
    });

}]);