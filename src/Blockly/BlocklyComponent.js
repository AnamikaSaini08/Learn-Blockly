 import React from 'react';
 import {useEffect, useRef} from 'react';

 import Blockly from 'blockly/core';
 import {javascriptGenerator} from 'blockly/javascript';
 import locale from 'blockly/msg/en';
 import 'blockly/blocks';

 Blockly.setLocale(locale);

 function BlocklyComponent(props) {
    const blocklyDiv = useRef();
    const toolbox = useRef();
    let primaryWorkspace = useRef();
  
    const generateCode = () => {
      var code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
      console.log(code);
    };
  
    useEffect(() => {
      const { initialXml, children, ...rest } = props;
      primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox.current,
        ...rest,
      });
  
      if (initialXml) {
        Blockly.Xml.domToWorkspace(
          Blockly.Xml.textToDom(initialXml),
          primaryWorkspace.current
        );
      }
    }, [props]);
  
    return (
      <div className="flex flex-col">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={generateCode}
        >
          Convert
        </button>
        <div
          ref={blocklyDiv}
          className="h-screen w-1/2 absolute z-10"
        />
        <div style={{ display: 'none' }} ref={toolbox}>
          {props.children}
        </div>
      </div>
    );
  }
  
  export default BlocklyComponent;
  