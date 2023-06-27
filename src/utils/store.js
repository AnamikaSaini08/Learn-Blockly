import { configureStore } from "@reduxjs/toolkit";
import blocklyInstructionSlice from './blocklyInstructionSlice';

const store = configureStore(
    {
        reducer:{
            blockInstruction : blocklyInstructionSlice,
        }
    }
);
export default store;