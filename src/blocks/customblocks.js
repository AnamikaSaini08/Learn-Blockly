import * as Blockly from 'blockly/core';

const turnBlock = {
  "type": "turn_block",
  "message0": "Turn %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "DIRECTION",
      "options": [
        ["Left", "LEFT"],
        ["Right", "RIGHT"]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "Turn left or right"
};

Blockly.Blocks['turn_block'] = {
  init: function() {
    this.jsonInit(turnBlock);
    this.setStyle('motion_blocks');
  }
};

//Move Block in forward/backward direction
const moveBlock = {
  "type": "move_block",
  "message0": "Move %1 %2 steps",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "DIRECTION",
      "options": [
        ["Forward", "FORWARD"],
        ["Backward", "BACKWARD"]
      ]
    },
    {
      "type": "field_number",
      "name": "STEPS",
      "value": 1,
      "min": 1
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "Move forward or backward by a certain number of steps"
};
Blockly.Blocks['move_block'] = {
  init: function() {
    this.jsonInit(moveBlock);
    this.setStyle('motion_blocks');
  }
};

