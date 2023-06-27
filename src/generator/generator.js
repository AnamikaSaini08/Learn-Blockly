/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import {javascriptGenerator} from 'blockly/javascript';

/*javascriptGenerator['custom_variable_field'] = function (block) {
    var variableName = block.getFieldValue('VAR');
    return variableName + ' = value;\n';
  };

javascriptGenerator['test_react_field'] = function (block) {
    return 'console.log(\'custom block\');\n';
};

javascriptGenerator['test_react_date_field'] = function (block) {
    return 'console.log(' + block.getField('DATE').getText() + ');\n';
};*/
javascriptGenerator['turn_block'] = function(block) {
    const direction = block.getFieldValue('DIRECTION');
  
    let turnCode;
    if (direction === 'LEFT') {
      turnCode = 'turnLeft();\n';
    } else {
      turnCode = 'turnRight();\n';
    }
  
    return turnCode;
  };
  javascriptGenerator['move_block'] = function(block) {
    const direction = block.getFieldValue('DIRECTION');
    const steps = block.getFieldValue('STEPS');
  
    let moveCode;
    if (direction === 'FORWARD') {
      moveCode = `moveForward(${steps});\n`;
    } else {
      moveCode = `moveBackward(${steps});\n`;
    }
  
    return moveCode;
  };
