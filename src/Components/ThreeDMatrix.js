import React, { useEffect, useRef,useState } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import robot from '../images/robot.jpg';

const Matrix3D = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const isCursorPressedRef = useRef(false);
  const cursorXRef = useRef(0);
  const cursorYRef = useRef(0);
  const cylinderRef = useRef(null);
  let blocklyInstruction = useSelector((store)=>store.blocklyInstruction.blockInstructionArray);
  const [robotPosition,setRobotPosition] = useState({x:1,  y:1});
  const gameConfig = useSelector(store=>store.matrixConfig.gameConfig);
  console.log("gameConfig- ",gameConfig);
  const {row,col,batteryPosition,obstaclePosition,robotStartPosition,robotEndPosition} = {...gameConfig};

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      (window.innerWidth) /( window.innerHeight),
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize((window.innerWidth/2), window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const cellHeight = 2;
    const cellWidth = 4;
    const chessboard = [];

    for (let i = 1; i <= row; i++) {
      for (let j = 1; j <= col; j++) {
        const geometry = new THREE.PlaneGeometry(cellWidth, cellHeight);
        const material = new THREE.MeshBasicMaterial({
          color: (i + j) % 2 === 0 ? 'blue' : 'pink',
          side: THREE.FrontSide,
        });
        const square = new THREE.Mesh(geometry, material);
        square.position.x = (j - row / 2) * cellWidth;
        square.position.y = (i - row / 2) * cellHeight;
        chessboard.push(square);
        scene.add(square);
        if (i === robotPosition.x && j === robotPosition.y) {
          const robotGeometry = new THREE.PlaneGeometry(cellWidth, cellHeight);
          const robotTexture = new THREE.TextureLoader().load(robot);
          const robotMaterial = new THREE.MeshBasicMaterial({
            map: robotTexture,
            side: THREE.DoubleSide,
          });
          const robotMesh = new THREE.Mesh(robotGeometry, robotMaterial);
          robotMesh.position.x = square.position.x;
          robotMesh.position.y = square.position.y;
          scene.add(robotMesh);
          
        }
        if (i === 5 && j === 5) {
          const geometry = new THREE.CylinderGeometry(0.7, 0.7);
          const material = new THREE.MeshBasicMaterial({
            color: 'red',
            transparent: true,
          });
          const cylinder = new THREE.Mesh(geometry, material);
          cylinder.position.z += 2;
         
          scene.add(cylinder);
          cylinderRef.current = cylinder;
        }
      }
    }

    camera.position.z = 20;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer; 

    const animate = () => {
      requestAnimationFrame(animate);

      // Update cylinder position and rotation
      if (cylinderRef.current) {
        cylinderRef.current.rotation.z += 0.01;
       // cylinderRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animate);
      scene.clear();
    };
  }, []);

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
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className="" />;
};

export default Matrix3D;
