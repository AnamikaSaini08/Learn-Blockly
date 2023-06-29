import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import robot from "../images/robot.jpg";
import { initialMatrixConfiguration } from "../utils/matrixGame";

const ThreeDMatrix = ({
  row,
  col,
  batteryPosition,
  obstaclePosition,
  robotStartPosition,
  robotEndPosition,
  robotPositionRef,
  robotPosition,
  setRobotPosition,
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const isCursorPressedRef = useRef(false);
  const cursorXRef = useRef(0);
  const cursorYRef = useRef(0);
  const cylinderRef = useRef(null);

  const [filterBatteryPosition, setFilteredBatteryPosition] = useState(
    batteryPosition
  );

  useEffect(() => {
    // Update the matrix when robotPosition changes
    const container = containerRef.current;
    container.innerHTML = ""; // Clear the previous matrix
    initialMatrixConfiguration(
      row,
      col,
      batteryPosition,
      obstaclePosition,
      robotStartPosition,
      robotEndPosition,
      robotPositionRef,
      sceneRef,
      cameraRef,
      rendererRef,
      containerRef,
      cylinderRef,
      robot,
      filterBatteryPosition,
      setFilteredBatteryPosition,
      robotPosition
    );
  }, [robotPosition]);

  const handleMouseDown = () => {
    isCursorPressedRef.current = true;
  };

  const handleMouseUp = () => {
    isCursorPressedRef.current = false;
  };

  const handleMouseMove = (event) => {
    if (isCursorPressedRef.current) {
      const movementX =
        event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      const movementY =
        event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      cursorXRef.current += movementX;
      cursorYRef.current += movementY;

      const rotationSpeed = 0.01;
      sceneRef.current.rotation.z = 0;

      sceneRef.current.rotation.x = cursorYRef.current * rotationSpeed;
      sceneRef.current.rotation.y = cursorXRef.current * rotationSpeed;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className="" />;
};

export default ThreeDMatrix;
