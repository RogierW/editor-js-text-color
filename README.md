
# Text color Tool for Editor.js

This Tool for the [Editor.js](https://editorjs.io) allows you to change the color of the selected text.

## Installation

### Install via NPM

Get the package

```shell
npm i @itech-indrustries/editor-js-text-color
```

Include module at your application

```javascript
const Header = require('@itech-indrustries/editor-js-text-color');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@itech-indrustries/editor-js-text-color).

`https://cdn.jsdelivr.net/npm/@itech-indrustries/editor-js-text-color`

Then require this script on page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/@itech-indrustries/editor-js-text-color@latest"></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    ColorPicker: TextColor,
  },

  ...
});
```