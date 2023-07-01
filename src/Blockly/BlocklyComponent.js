import React from "react";
import { useEffect, useRef, useState } from "react";

import Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import locale from "blockly/msg/en";
import "blockly/blocks";
import { useDispatch, useSelector } from "react-redux";
import { addBlockInstruction } from "../utils/blocklyInstructionSlice";
import { generateCode } from "../utils/generateBlocklyCode";
import { changeRobotPosition } from "../utils/changeRobotPosition";

Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const {robotPositionRef ,robotPosition, setRobotPosition} = props;
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  let blocklyInstruction = useSelector(
    (store) => store.blocklyInstruction.blockInstructionArray
  );
  const gamesConfig = useSelector((store) => store.matrixConfig);
  const {
    row,
    col,
    batteryPosition,
    obstaclePosition,
  } = gamesConfig.gameConfigOne;

  const dispatch = useDispatch();
  let commandArray = [];

  const generateBlocklyCode = () => {
    commandArray = generateCode(primaryWorkspace.current, javascriptGenerator);
    console.log(commandArray,"---");
    dispatch(addBlockInstruction(commandArray));
    //Below print , means just after dispatch render does't occur - neeche saare execute hone ke baad phir render hoga.
  };

  useEffect(() => {
    console.log("blocklyInstruction- ", blocklyInstruction);
    changeRobotPosition(blocklyInstruction,obstaclePosition,row,col,robotPositionRef,robotPosition,setRobotPosition);
  }, [blocklyInstruction]);

  

  useEffect(() => {
    const { children, ...rest } = props;
    const { readOnly,trashcan,media,move} = props;
    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      readOnly,trashcan,media,move,
      trashcan: props.trashcan,
      media: props.media,
      move: props.move,
    });
  },  [primaryWorkspace, toolbox, blocklyDiv]);

  return (
    <div className="flex flex-col">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-20"
        onClick={generateBlocklyCode}
      >
        Convert
      </button>
      <div ref={blocklyDiv} className="h-screen w-1/2 absolute " />
      <div style={{ display: "none" }} ref={toolbox}>
        {props.children}
      </div>
    </div>
  );
}

export default BlocklyComponent;
