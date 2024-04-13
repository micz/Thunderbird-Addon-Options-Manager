/*
 *  Copyright  Mic  (email: m@micz.it)
 *
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * 
 *  This file is avalable in the original repo: https://github.com/micz/Thunderbird-Addon-Options-Manager
 * 
 */


import { ADDON_prefs } from './th-addon-options.js';

document.addEventListener('DOMContentLoaded', () => {
    ADDON_prefs.restoreOptions();
    document.querySelectorAll(".option-input").forEach(element => {
      element.addEventListener("change", ADDON_prefs.saveOptions);
    });
  }, { once: true });