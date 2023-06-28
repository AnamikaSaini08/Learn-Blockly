import React from 'react';
import ThreeDMatrix from './Components/ThreeDMatrix';
import BlocklyComponent, { Block } from './Blockly';
import './blocks/customblocks';
import './generator/generator';
import { Provider } from 'react-redux';
import store from '../src/utils/store';

function App() {
  return (
    <Provider store={store}>
    <div className="flex w-full ">
      <div className="w-1/2">
        <BlocklyComponent
          readOnly={false}
          trashcan={true}
          media={'media/'}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}
        >
          <Block type="turn_block" />
          <Block type="move_block" />
        </BlocklyComponent>
      </div>
      <div className="w-1/2">
        <ThreeDMatrix />
      </div>
    </div>
    </Provider>
  );
}
export default App;