import { createSlice } from "@reduxjs/toolkit";

const blocklyInstructionSlice = createSlice({
    name: 'blocklyInstruction',
    initialState: {
        blockInstructionArray : []
    },
    reducers: {
        addBlockInstruction : (state,action)=>{
            state.blockInstructionArray.push(action.payload);
        }
    }
});
export const {addBlockInstruction} = blocklyInstructionSlice.actions;
export default blocklyInstructionSlice.reducer;