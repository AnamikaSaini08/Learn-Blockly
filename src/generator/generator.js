import {javascriptGenerator} from 'blockly/javascript';

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
