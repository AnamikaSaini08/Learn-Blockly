import { createSlice } from "@reduxjs/toolkit";

const matrixConfigSlice = createSlice({
    name:'matrixConfig',
    initialState:{
        gameConfigOne:{
            row: 10,
            col: 10,
            robotStartPosition: {x:1,y:1},
            robotEndPosition : {x:10 , y:10},
            obstaclePosition:[[2,3],[7,7]],
            batteryPosition:[[4,4],[9,9]],
        },
        gameConfigTwo:{
            row: 10,
            col: 10,
            robotStartPosition: {x:1,y:1},
            robotEndPosition : {x:10 , y:10},
            obstaclePosition:[[2,3],[7,7]],
            batteryPosition:[[4,4],[9,9]],
        },
        gameConfigThree:{
            row: 10,
            col: 10,
            robotStartPosition: {x:1,y:1},
            robotEndPosition : {x:10 , y:10},
            obstaclePosition:[[2,3],[7,7]],
            batteryPosition:[[4,4],[9,9]],
        },
        gameConfigFour:{
            row: 10,
            col: 10,
            robotStartPosition: {x:1,y:1},
            robotEndPosition : {x:10 , y:10},
            obstaclePosition:[[2,3],[7,7]],
            batteryPosition:[[4,4],[9,9]],
        },
        gameConfigFive:{
            row: 10,
            col: 10,
            robotStartPosition: {x:1,y:1},
            robotEndPosition : {x:10 , y:10},
            obstaclePosition:[[2,3],[7,7]],
            batteryPosition:[[4,4],[9,9]],
        },
    }
});
export default matrixConfigSlice.reducer;