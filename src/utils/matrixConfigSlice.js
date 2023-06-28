import { createSlice } from "@reduxjs/toolkit";

const matrixConfigSlice = createSlice({
    name:'matrixConfig',
    initialState:{
        gameConfig:{
            row: 10,
            col: 10,
            robotStartPosition: {x:1,y:1},
            robotEndPosition : {x:10 , y:10},
            obstaclePosition:[[2,3],[7,7]],
            batteryPosition:[[4,4],[9,9]],
        }
    }
});
export default matrixConfigSlice.reducer;