**_apiNG-plugin-facebook_** is a [Facebook Graph API](https://developers.facebook.com/docs/graph-api) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
Used promise library: [angular-facebook-api-factory](https://github.com/JohnnyTheTank/angular-facebook-api-factory) _(included in minified distribution file)_

## Supported apiNG models
|  model   | support | max items<br>per request |
|----------|---------|---------|
| `social` | full    | `100`   |
| `image`  | full    | `100`   |
| `video`  | full    | `100`   |
| `event`  | full    | `100`   |

full: _the source platform provides a full list with usable results_ <br>
partly: _the source platfrom provides just partly usable results_

# Documentation
    I.   INSTALLATION
    II.  ACCESS TOKEN
    III. USAGE

## I. INSTALLATION
    a) Get files
    b) Include files
    c) Add dependencies

### a) Get files
You can choose your preferred method of installation:

* Via bower: `bower install apiNG-plugin-facebook --save`
* Download from github: [apiNG-plugin-facebook.zip](https://github.com/JohnnyTheTank/apiNG-plugin-facebook/zipball/master)

### b) Include files
Include `apiNG-plugin-facebook.min.js` in your apiNG application
```html
<script src="bower_components/apiNG-plugin-facebook/dist/apiNG-plugin-facebook.min.js"></script>
```

### c) Add dependencies
Add the module `jtt_aping_facebook` as a dependency to your app module:
```js
var app = angular.module('app', ['jtt_aping', 'jtt_aping_facebook']);
```

## II. ACCESS TOKEN
    a) Generate your `access_token`
    b) Insert your `access_token` into `aping-config.js`

### a) Generate your `access_token`
1. Login on [developers.facebook.com](https://developers.facebook.com/)
    - Create an new app
    - Choose website/webapp
2. Open [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
    - Press on `Graph API Explorer` dropdown button
    - Choose your app
    - Press on `Get Token` dropdown buton
    - Choose `Get App Token`
    - Copy generated `access_token`

### b) Insert your `access_token` into `aping-config.js`
Open `js/apiNG/aping-config.js` in your application folder. It should be look like this snippet:
```js
apingApp.config(['$provide', function ($provide) {
    $provide.constant("apingApiKeys", {
        //...
        facebook: [
            {'access_token':'<YOUR_FACEBOOK_TOKEN>'}
        ],
        //...
    });

    $provide.constant("apingDefaultSettings", {
        //...
    });
}]);
```

Replace `<YOUR_FACEBOOK_TOKEN>` with your facebook `access_token`

## III. USAGE
Add the plugin's directive `aping-facebook="[]"` to your apiNG directive and configure your requests
```html
<aping
    template-url="/template.html"
    model="social"
    items="20"
    aping-facebook="[{'page':'<PAGE_NAME>'}]">
</aping>
```

_full documentation coming soon ..._



