**_apiNG-plugin-facebook_** is a [Facebook Graph API](https://developers.facebook.com/docs/graph-api) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
Used promise library: [angular-facebook-api-factory](https://github.com/JohnnyTheTank/angular-facebook-api-factory) _(included in minified distribution file)_

## Supported apiNG models
|  model   | support |
|----------|---------|
| `social` | full    |
| `image`  | full    |
| `video`  | full    |
| `event`  | full    |

* full: _the source platform provides a full list with usable results_
* partly: _the source platfrom provides just partly usable results_

# Documentation
    1. Installation
    2. Access Token
    3. Usage

## 1. Installation
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

## 2. Access Token
    a) Generate your `access_token`
    b) Insert your token into `aping-config.js`

### a) Generate your `access_token`
_coming soon ..._

### b) Insert your token into `aping-config.js`
_coming soon ..._

## 3. Usage
_coming soon ..._

