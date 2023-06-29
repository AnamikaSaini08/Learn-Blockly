let interval;

export const changeRobotPosition = (blocklyInstruction , obstaclePosition,row,col,robotPositionRef,robotPosition,setRobotPosition)=>{
   let pos = {x:1 , y:1};
   let index = 1;

      interval = setInterval(()=>
      {
        if(index > blocklyInstruction.length){
          clearInterval(interval);
          return;
        }
        const direction = blocklyInstruction[index-1];
        if(direction === "BACKWARD"){
          console.log("BACKWARD- ",pos.y);
          if (pos.y > 1) {
            if (
              obstaclePosition &&
              obstaclePosition.some(
                (coord) => coord[0] === pos.x && coord[1] === pos.y - 1
              )
            ) {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
            } else {
              pos = { ...pos, y: pos.y - 1 };
            }
          } else {
            alert("Stuck", "You Fail! Robot got stuck on the way");
            clearInterval(interval);
            return;
          }
        }
        else if(direction === "FORWARD"){
          console.log("Forward- ",pos.y);
          if (pos.y < col) {
            if (
              obstaclePosition &&
              obstaclePosition.some(
                (coord) => coord[0] === pos.x && coord[1] === pos.y + 1
              )
            ) {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
            } else {
              pos = { ...pos, y: pos.y + 1 };
             
            }
          } else {
            alert("Stuck", "You Fail! Robot got stuck on the way");
            clearInterval(interval);
            return;
          }
        }
        else if(direction === "LEFT"){
          console.log("left- ",pos.x);
          if (pos.x > 1) {
            if (
              obstaclePosition &&
              obstaclePosition.some(
                (coord) => coord[0] === pos.x - 1 && coord[1] === pos.y
              )
            ) {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
            } else {
              pos = { ...pos, x: pos.x - 1 };
            }
          } else {
            alert("Stuck", "You Fail! Robot got stuck on the way");
            clearInterval(interval);
            return;
          }
        }
        else if(direction === "RIGHT")
        { 
          console.log("right- ",pos.x);
          if (pos.x < row) {
            if (
              obstaclePosition &&
              obstaclePosition.some(
                (coord) => coord[0] === pos.x + 1 && coord[1] === pos.y
              )
            ) {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
            } else {
              pos = { ...pos, x: pos.x + 1 };
              
            }
          } else {
            alert("Stuck", "You Fail! Robot got stuck on the way");
            clearInterval(interval);
            return;
          }
        }
        index++;
        //robotPositionRef.current = { ...robotPositionRef.current, ...pos };
        setRobotPosition({...pos}); 
      },1500);
  }