import React from "react";
import { useEffect, useRef, useState } from "react";

import Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import locale from "blockly/msg/en";
import "blockly/blocks";
import { useDispatch, useSelector } from "react-redux";
import { addBlockInstruction } from "../utils/blocklyInstructionSlice";
import { generateCode } from "../utils/generateBlocklyCode";
import {changeRobotPosition} from '../utils/changeRobotPosition';

Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  let blocklyInstruction = useSelector(
    (store) => store.blocklyInstruction.blockInstructionArray
  );
  const dispatch = useDispatch();
  const [blockInsState, setBlockInsState] = useState([]);
  let commandArray= [];

  const generateBlocklyCode = ()=>{
    commandArray = generateCode(primaryWorkspace,javascriptGenerator);
    dispatch(addBlockInstruction(commandArray));
     //Below print , means just after dispatch render does't occur - neeche saare execute hone ke baad phir render hoga.
  }

  useEffect(() => {
    setBlockInsState(blocklyInstruction);
    console.log("blocklyInstruction- ", blocklyInstruction);
    //changeRobotPosition(blocklyInstruction,robotPosition,setRobotPosition,obstaclePosition,row,col);
  }, [blocklyInstruction]);

  useEffect(() => {
    const { children, ...rest } = props;
    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...rest,
    });
  }, [props]);

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
