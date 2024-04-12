/*  Copyright  Mic  (email: m@micz.it)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 3, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

    This file is avalable in the original repo: https://github.com/micz/Thunderbird-Addon-Option-Manager
*/


import { prefs_default } from './th-addon-options-default.js';

export const ADDON_prefs = {

  saveOptions(e) {
    console.log('Saving option: ' + e.target.id + ' = ' + e.target.value);
    e.preventDefault();
    let options = {};
    let element = e.target;
      switch (element.type) {
        case 'checkbox':
          options[element.id] = element.checked;
          break;
        case 'number':
          options[element.id] = element.valueAsNumber;
          break;
        case 'text':
          options[element.id] = element.value.trim();
          break;
        default:
          if (element.tagName === 'SELECT') {
            options[element.id] = element.value;
          }else{
            console.log('Unhandled input type:', element.type);
          }
      }
    browser.storage.sync.set(options);
  },

  async getPref(pref_id){
    let obj = {};
    obj[pref_id] = prefs_default[pref_id];
    console.log(JSON.stringify(obj));
    let prefs = await browser.storage.sync.get(obj)
    return prefs[pref_id];
  },

  restoreOptions() {
    function setCurrentChoice(result) {
      document.querySelectorAll(".option-input").forEach(element => {
        const defaultValue = prefs_default[element.id];
        switch (element.type) {
          case 'checkbox':
            let default_checkbox_value = defaultValue !== undefined ? defaultValue : false;
            element.checked = result[element.id] || default_checkbox_value;
            break;
          case 'number':
            let default_number_value = defaultValue !== undefined ? defaultValue : 0;
            element.value = result[element.id] || default_number_value;
            break;
          case 'text':
            let default_text_value = defaultValue !== undefined ? defaultValue : '';
            element.value = result[element.id] || default_text_value;
            break;
          default:
          if (element.tagName === 'SELECT') {
            let default_select_value = defaultValue !== undefined ? defaultValue : '';
            if(element.id == 'reply_type') default_select_value = 'reply_all';
            element.value = result[element.id] || default_select_value;
            if (element.value === '') {
              element.selectedIndex = -1;
            }
          }else{
            console.log('Unhandled input type:', element.type);
          }
        }
      });
    }

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get(null);
    getting.then(setCurrentChoice, onError);
  }
};