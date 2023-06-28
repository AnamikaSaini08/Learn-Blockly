const changeRobotPosition = (blocklyInstruction , robotPosition ,setRobotPosition,obstaclePosition,row,col)=>{
    for(let i=1 ; i<=blocklyInstruction.length ; i++){
      const direction = blocklyInstruction[i-1];
      let pos = {x:1 , y:1};
      setTimeout(()=>{
        if(direction === "moveForward"){
          if (pos.y > 1) {
            if (
              obstaclePosition &&
              obstaclePosition.some(
                (coord) => coord[0] === pos.x && coord[1] === pos.y - 1
              )
            ) {
              console.log("Stuck", "You Fail! Robot got stuck on the way");
            } else {
              pos = { ...pos, y: pos.y - 1 };
            }
          } else {
            console.log("Stuck", "You Fail! Robot got stuck on the way");
            return;
          }
        }
        else if(direction === "moveBackward"){
          if (pos.y < col) {
            if (
              obstaclePosition &&
              obstaclePosition.some(
                (coord) => coord[0] === pos.x && coord[1] === pos.y + 1
              )
            ) {
              console.log("Stuck", "You Fail! Robot got stuck on the way");
            } else {
              pos = { ...pos, y: pos.y + 1 };
            }
          } else {
            console.log("Stuck", "You Fail! Robot got stuck on the way");
            return;
          }
        }
        else if(direction === "turnLeft"){
          if (pos.x > 1) {
            if (
              obstaclePosition &&
              obstaclePosition.some(
                (coord) => coord[0] === pos.x - 1 && coord[1] === pos.y
              )
            ) {
              console.log("Stuck", "You Fail! Robot got stuck on the way");
            } else {
              pos = { ...pos, x: pos.x - 1 };
            }
          } else {
            console.log("Stuck", "You Fail! Robot got stuck on the way");
            return;
          }
        }
        else if(direction === "turnRight")
        {
          if (pos.x < row) {
            if (
              obstaclePosition &&
              obstaclePosition.some(
                (coord) => coord[0] === pos.x + 1 && coord[1] === pos.y
              )
            ) {
              console.log("Stuck", "You Fail! Robot got stuck on the way");
            } else {
              pos = { ...pos, x: pos.x + 1 };
            }
          } else {
            console.log("Stuck", "You Fail! Robot got stuck on the way");
            return;
          }
        }
        setRobotPosition()
      },1500)
    }
  }