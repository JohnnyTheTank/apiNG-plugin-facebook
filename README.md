[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

[![Join the chat at https://gitter.im/JohnnyTheTank/apiNG](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/JohnnyTheTank/apiNG?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/aping-plugin-facebook.svg)](https://badge.fury.io/js/aping-plugin-facebook)
[![Bower version](https://badge.fury.io/bo/apiNG-plugin-facebook.svg)](https://badge.fury.io/bo/apiNG-plugin-facebook)

**_apiNG-plugin-facebook_** is a [Facebook Graph API](https://developers.facebook.com/docs/graph-api) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `social`, `image`, `video`, `event`**
* This plugin supports the [`get-native-data` parameter](https://aping.readme.io/docs/advanced#parameters)
* This plugin needs an [access token](#2-access-token) :warning:
* Used promise library: [angular-facebook-api-factory](https://github.com/JohnnyTheTank/angular-facebook-api-factory) _(included in distribution files)_

# Documentation

1. [INSTALLATION](#1-installation)
    1. Get file
    2. Include file
    3. Add dependency
    4. Add plugin
2. [ACCESS TOKEN](#2-access-token)
    1. Generate your `access_token`
    2. Insert your `access_token` into `aping-config.js`
3. [USAGE](#3-usage)
    1. Models
    2. Requests
    3. Rate limit


## 1. INSTALLATION

### I. Get file
Install via either [bower](http://bower.io/), [npm](https://www.npmjs.com/), CDN (jsDelivr) or downloaded files:

* `bower install apiNG-plugin-facebook --save`
* `npm install aping-plugin-facebook --save`
* use [CDN file](https://www.jsdelivr.com/projects/aping.plugin-facebook)
* download [apiNG-plugin-facebook.zip](https://github.com/JohnnyTheTank/apiNG-plugin-facebook/zipball/master)

### II. Include file
Include `aping-plugin-facebook.min.js` in your apiNG application

```html
<!-- when using bower -->
<script src="bower_components/apiNG-plugin-facebook/dist/aping-plugin-facebook.min.js"></script>

<!-- when using npm -->
<script src="node_modules/aping-plugin-facebook/dist/aping-plugin-facebook.min.js"></script>

<!-- when using cdn file -->
<script src="//cdn.jsdelivr.net/aping.plugin-facebook/latest/aping-plugin-facebook.min.js"></script>

<!-- when using downloaded files -->
<script src="aping-plugin-facebook.min.js"></script>
```

### III. Add dependency
Add the module `jtt_aping_facebook` as a dependency to your app module:
```js
angular.module('app', ['jtt_aping', 'jtt_aping_facebook']);
```

### IV. Add the plugin
Add the plugin's directive `aping-facebook="[]"` to your apiNG directive and [configure your requests](#ii-requests)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-facebook="[{'page':'<PAGE_NAME>'}]">
</aping>
```

## 2. ACCESS TOKEN

### I. Generate your `access_token`
1. Login on [developers.facebook.com](https://developers.facebook.com/)
    - Create an new app
    - Choose website/webapp
2. Open [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
    - Press on `Graph API Explorer` dropdown button
    - Choose your app
    - Press on `Get Token` dropdown buton
    - Choose `Get App Token`
    - Copy generated `access_token`

### II. Insert your `access_token` into `aping-config.js`
Create and open `js/apiNG/aping-config.js` in your application folder. It should be look like this snippet:
```js
angular.module('jtt_aping').config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            facebook: [
                {'access_token':'<YOUR_FACEBOOK_TOKEN>'}
            ],
            //...
        }
    });
}]);
```

:warning: Replace `<YOUR_FACEBOOK_TOKEN>` with your facebook `access_token`

## 3. USAGE

### I. Models
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


### II. Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.

#### Requests by Page
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`page`** | `michaeljackson` |  | name or id of any facebook page | no |
| **`items`**  | `0`-`100` | `25` | items per request |  yes  |
| **`showAvatar`** | `true` | `false` | Use `true` for show users avatar as image if post has no own image | yes |

Samples:
* `[{'page':'muenchen'}, {'page':'Berlin'}, {'page':'Koeln'}]`
* `[{'page':'muenchen', 'items':10}, {'page':'Berlin', 'items':70}]`

### III. Rate limit

Visit the [official API rate limit documentation](https://developers.facebook.com/docs/graph-api/advanced/rate-limiting)

Here's how rate limiting on the Facebook Graph API works:
- Rate limiting is done on your Facebook AppId. If your app reaches a rate limit, all calls made for that app will be limited not just on a per-user basis.
- Rate limiting is calculated by taking the number of users your app had the previous day and adding today's new logins. This gives a base number of users that your app has.
- **Each app** is given an allotment of **200 API calls per user** in any given **60 minute window**.

# Licence
MIT

