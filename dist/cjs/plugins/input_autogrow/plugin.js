/**
* Tom Select v1.5.0
* Licensed under the Apache License, Version 2.0 (the "License");
*/

'use strict';

var tomSelect = require('../../tom-select.js');
var utils = require('../../utils.js');

/**
 * Plugin: "input_autogrow" (Tom Select)
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */
tomSelect.define('input_autogrow', function () {
  var self = this;
  self.hook('after', 'setup', () => {
    var test_input = document.createElement('span');
    var control = self.control_input;
    test_input.style.cssText = 'position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ';
    self.wrapper.appendChild(test_input);
    var transfer_styles = ['letterSpacing', 'fontSize', 'fontFamily', 'fontWeight', 'textTransform'];

    for (const style_name of transfer_styles) {
      test_input.style[style_name] = control.style[style_name];
    }
    /**
     * Set the control width
     *
     */


    var resize = () => {
      if (self.items.length > 0) {
        test_input.textContent = control.value;
        control.style.width = test_input.clientWidth + 'px';
      } else {
        control.style.width = '';
      }
    };

    resize();
    self.on('update item_add item_remove', resize);
    utils.addEvent(control, 'input', resize);
    utils.addEvent(control, 'keyup', resize);
    utils.addEvent(control, 'blur', resize);
    utils.addEvent(control, 'update', resize);
  });
});
//# sourceMappingURL=plugin.js.map