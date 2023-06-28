import { createSlice } from "@reduxjs/toolkit";

const matrixConfigSlice = createSlice({
    name:'matrixConfig',
    initialState:{
        gameConfig:{
            row: 10,
            col: 10,
            robotStartPosition: {x:1,y:1},
            robotEndPosition : {x:10 , y:10},
            obstaclePosition:[],
            batteryPosition:[],
        }
    }
});
export default matrixConfigSlice.reducer;