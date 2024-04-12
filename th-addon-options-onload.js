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


import { ADDON_prefs } from './th-addon-options.js';

document.addEventListener('DOMContentLoaded', () => {
    ADDON_prefs.restoreOptions();
    document.querySelectorAll(".option-input").forEach(element => {
      element.addEventListener("change", ADDON_prefs.saveOptions);
    });
  }, { once: true });