**_apiNG-plugin-facebook_** is a [Facebook Graph API](https://developers.facebook.com/docs/graph-api) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `social`, `image`, `video`, `event`**
* Used promise library: [angular-facebook-api-factory](https://github.com/JohnnyTheTank/angular-facebook-api-factory) _(included in minified distribution file)_

# Documentation
    I.   INSTALLATION
    II.  ACCESS TOKEN
    III. USAGE

## I. INSTALLATION
    a) Get files
    b) Include files
    c) Add dependencies
    d) Add the plugin

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

### d) Add the plugin
Add the plugin's directive `aping-facebook="[]"` to your apiNG directive and configure your requests (_**III. USAGE**_)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-facebook="[{'page':'<PAGE_NAME>'}]">
</aping>
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

:warning: Replace `<YOUR_FACEBOOK_TOKEN>` with your facebook `access_token`

## III. USAGE
    a) Models
    b) Requests
    c) Rate limit

### a) Models
Supported apiNG models

|  model   | content | support | max items<br>per request | (native) default items<br>per request |
|----------|---------|---------|--------|---------|
| `social` | last **posts** from users wall | full    | `100`   | `25`   |
| `image`  | last **images** from users wall | full    | `100`   | `25`   |
| `video`  | last **videos** from users wall  | full    | `100`   | `25`   |
| `event`  | last **events** from users wall  | full    | `100`   | `25`   |

**support:**
* full: _the source platform provides a full list with usable results_ <br>
* partly: _the source platfrom provides just partly usable results_


### b) Requests
* Every **apiNG plugin** expects an array of **requests** as html attribute.
* Every **request** is defined as single API call or something like that.

Possible parameters:

|  parameter  | sample | description | optional |
|----------|---------|---------|---------|
| **`page`** | `michaeljackson` | name or id of any facebook page | no |
| **`items`**  | `0`-`100` | items per request |  yes  |

Samples:
* `[{'page':'muenchen'}, {'page':'Berlin'}, {'page':'Koeln'}]`
* `[{'page':'muenchen', 'items':10}, {'page':'Berlin', 'items':70}]`

### c) Rate limit

Visit the [official API rate limit documentation](https://developers.facebook.com/docs/graph-api/advanced/rate-limiting)

Here's how rate limiting on the Facebook Graph API works:
- Rate limiting is done on your Facebook AppId. If your app reaches a rate limit, all calls made for that app will be limited not just on a per-user basis.
- Rate limiting is calculated by taking the number of users your app had the previous day and adding today's new logins. This gives a base number of users that your app has.
- **Each app** is given an allotment of **200 API calls per user** in any given **60 minute window**.



