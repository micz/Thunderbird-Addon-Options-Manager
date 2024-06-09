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


import { prefs_default } from './th-addon-options-default.js';

export const ADDON_prefs = {

  logger: console,

  saveOptions(e) {
    e.preventDefault();
    let options = {};
    let element = e.target;
      switch (element.type) {
        case 'checkbox':
          options[element.id] = element.checked;
          ADDON_prefs.logger.log('Saving option: ' + element.id + ' = ' + element.checked);
          break;
        case 'number':
          options[element.id] = element.valueAsNumber;
          ADDON_prefs.logger.log('Saving option: ' + element.id + ' = ' + element.valueAsNumber);
          break;
        case 'text':
          options[element.id] = element.value.trim();
          ADDON_prefs.logger.log('Saving option: ' + element.id + ' = ' + element.value);
          break;
        default:
          if (element.tagName === 'SELECT') {
            options[element.id] = element.value;
            ADDON_prefs.logger.log('Saving option: ' + element.id + ' = ' + element.value);
          }else{
            ADDON_prefs.logger.log('Unhandled input type:', element.type);
          }
      }
    browser.storage.sync.set(options);
  },

  async setPref(pref_id, value){
    let obj = {};
    obj[pref_id] = value;
    ADDON_prefs.logger.log('Saving option: ' + pref_id + ' = ' + JSON.stringify(value));
    browser.storage.sync.set(obj)
  },

  async getPref(pref_id){
    let obj = {};
    obj[pref_id] = prefs_default[pref_id];
    let prefs = await browser.storage.sync.get(obj)
    ADDON_prefs.logger.log("getPref: " + JSON.stringify(prefs));
    return prefs[pref_id];
  },

  
  async getPrefs(pref_ids){
    let obj = {};
    pref_ids.forEach(pref_id => {
      obj[pref_id] = prefs_default[pref_id];
    });
    let prefs = await browser.storage.sync.get(obj)
    ADDON_prefs.logger.log("getPrefs: " + JSON.stringify(prefs));
    let result = {};
    pref_ids.forEach(pref_id => {
      result[pref_id] = prefs[pref_id];
    });
    return result;
  },


  restoreOptions() {
    function setCurrentChoice(result) {
      document.querySelectorAll(".option-input").forEach(element => {
        const defaultValue = prefs_default[element.id];
        switch (element.type) {
          case 'checkbox':
            let default_checkbox_value = defaultValue !== undefined ? defaultValue : false;
            element.checked = result[element.id] !== undefined ? result[element.id] : default_checkbox_value;
            break;
          case 'number':
            let default_number_value = defaultValue !== undefined ? defaultValue : 0;
            element.value = result[element.id] !== undefined ? result[element.id] : default_number_value;
            break;
          case 'text':
            let default_text_value = defaultValue !== undefined ? defaultValue : '';
            element.value = result[element.id] !== undefined ? result[element.id] : default_text_value;
            break;
          default:
          if (element.tagName === 'SELECT') {
            let default_select_value = defaultValue !== undefined ? defaultValue : '';
            if(element.id == 'reply_type') default_select_value = 'reply_all';
            element.value = result[element.id] !== undefined ? result[element.id] : default_select_value;
            if (element.value === '') {
              element.selectedIndex = -1;
            }
          }else{
            ADDON_prefs.logger.log('Unhandled input type:', element.type);
          }
        }
      });
    }

    function onError(error) {
      ADDON_prefs.logger.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get(null);
    getting.then(setCurrentChoice, onError);
  }
};
