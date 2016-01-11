"use strict";
apingApp.config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            //...
            facebook: [
                {'access_token':'<YOUR_FACBEOOK_ACCESS_TOKEN>'},
            ],
            //...
        }
    });
}]);