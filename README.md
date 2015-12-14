[Facebook Graph API](https://developers.facebook.com/docs/graph-api) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG)

## Supported apiNG models
|  model   | support |
|----------|---------|
| `social` | full    |
| `image`  | full   |
| `video`  | full    |
| `event`  | full    |

* full: _the source platform provides a full list with usable results_
* partly: _the source platfrom provides just partly usable results_

## Dependencies
* [apiNG](https://github.com/JohnnyTheTank/apiNG)
* [angular-facebook-api-factory](https://github.com/JohnnyTheTank/angular-facebook-api-factory) _(already included in `dist/apiNG-plugin-facebook.min.js`)_

## Installation
You can choose your preferred method of installation:

* Via bower: `bower install apiNG-plugin-facebook --save`
* Download from github: [apiNG-plugin-facebook.zip](https://github.com/JohnnyTheTank/apiNG-plugin-facebook/zipball/master)

Include `apiNG-plugin-facebook.min.js` in your apiNG application
```html
<script src="bower_components/apiNG-plugin-facebook/dist/apiNG-plugin-facebook.min.js"></script>
```

Add the module `jtt_aping_facebook` as a dependency to your app module:
```js
var app = angular.module('app', ['jtt_aping', 'jtt_aping_facebook']);
```

## Usage
full documentation coming soon ...