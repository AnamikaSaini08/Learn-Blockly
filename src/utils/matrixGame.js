import * as THREE from 'three';

export const initialMatrixConfiguration = (row,col,batteryPosition,obstaclePosition,robotStartPosition,robotEndPosition,robotPosition,setRobotPosition,sceneRef,cameraRef,rendererRef,containerRef,cylinderRef,robot)=>{
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
 }