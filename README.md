# Thunderbird Addon Options Manager

This guide explains how to use the provided files to manage the options page in a Thunderbird extension.
<br>These files facilitate the handling of user preferences, providing a framework for both the presentation and persistence of settings.



<br>




## Overview

- **`th-addon-options.js**`: Contains logic for saving user preferences. It imports default settings from `th-addon-options-default.js` and provides methods to handle form submissions and preference storage.
- **`th-addon-options-default.js`**: Defines default preferences for the extension. This can be customized to include any number of default settings your extension requires.
- **`th-addon-options-onload.js`**: Loads the needed scripts in the option page.
- **`th-addon-options.html`**: The HTML options example page.
- **`th-addon-options.css`**: The CSS file to style your option page.



<br>




## Setup

1. **Include the Files**: Ensure that all four files are included in your extension's directory structure, ideally within a folder dedicated to options or preferences.
2. **Define the options page**: Add your options page in the `manifest.json` extension's file, adding the needed section:
```javascript
"options_ui": {
		"page": "PATH/TO/THE/FILES/th-addon-options.html"
	}
```

<br>




### Defining Default Preferences

Modify `th-addon-options-default.js` to include all the default settings for your extension.
<br>For example:

```javascript
export const prefs_default = {
    'example_setting': true,
    'number_of_days': 7
};
```


<br>




### Saving Preferences

`th-addon-options.js` is set up to save and load preferences when each of them is modified.
<br>Ensure your options inputs have the `option-input` class.
<br>For example, for a checkbox:

```html
<input type="checkbox" id="example_setting" name="example_setting" class="option-input" />
```

See more examples in the `th-addon-options.html` file.

Define your options page in the `th-addon-options.html` file and the default values in the `th-addon-options-default.js` file.
<br>After that, everythig is handled automatically.

> [!IMPORTANT]
> Only the inputs with the `option-input` class are loaded and saved when modified. Without this class they are ignored.



<br>




## Usage

In your extension javscript files you have to import the needed objects like this:

```javascript
import { ADDON_prefs } from '<PATH/TO/THE/FILES/th-addon-options.js';
```

And get the preferences using the `getPref` method:

```javascript
let string_pref = await ADDON_prefs.getPref("string_pref");
```
The method will load the string_pref value if present, or the default one, to the `string_pref` variable.



<br>




## How to contribute

Feel free to make a pull request to improve the code or this guide.




<br>




## LICENSE

This code is distributed under the [GPL 3 license](LICENSE).
