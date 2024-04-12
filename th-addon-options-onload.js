import { ADDON_prefs } from './th-addon-options.js';

document.addEventListener('DOMContentLoaded', () => {
    ADDON_prefs.restoreOptions();
    document.querySelectorAll(".option-input").forEach(element => {
      element.addEventListener("change", ADDON_prefs.saveOptions);
    });
  }, { once: true });