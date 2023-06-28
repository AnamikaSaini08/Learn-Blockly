import * as THREE from "three";

export const initialMatrixConfiguration = (
  row,
  col,
  batteryPosition,
  obstaclePosition,
  robotStartPosition,
  robotEndPosition,
  robotPosition,
  setRobotPosition,
  sceneRef,
  cameraRef,
  rendererRef,
  containerRef,
  cylinderRef,
  robot,
  filterBatteryPosition,
  setFilteredBatteryPosition
) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth / 2, window.innerHeight);
  containerRef.current.appendChild(renderer.domElement);

  const cellHeight = 2;
  const cellWidth = 4;
  const chessboard = [];

  for (let i = 1; i <= row; i++) {
    for (let j = 1; j <= col; j++) {
      const geometry = new THREE.PlaneGeometry(cellWidth, cellHeight);
      const material = new THREE.MeshBasicMaterial({
        color: (i + j) % 2 === 0 ? "blue" : "pink",
        side: THREE.FrontSide,
      });
      const square = new THREE.Mesh(geometry, material);
      square.position.x = (j - row / 2) * cellWidth;
      square.position.y = (i - col / 2) * cellHeight;
      chessboard.push(square);
      scene.add(square);

      //Obstacle Condition
      if (obstaclePosition && obstaclePosition.some(
        (coor) => coor[0] === i && coor[1] === j
      )) {
        const obstacleGeometry = new THREE.BoxGeometry(2, 1.5, 2);
        const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 'brown' });
        const cube = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
        cube.position.x = square.position.x;
        cube.position.z += 1;
        cube.position.y = square.position.y;
        scene.add(cube);
        continue;
      }
      //Robot Position
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
        continue;
      }
      if (filterBatteryPosition && filterBatteryPosition.length > 0) {
        filterBatteryPosition.forEach((coor) => {
          if (coor[0] === i && coor[1] === j) {
            const geometry = new THREE.CylinderGeometry(0.7, 0.7);
            const material = new THREE.MeshBasicMaterial({
              color: "red",
              transparent: true,
            });
            const cylinder = new THREE.Mesh(geometry, material);
            cylinder.position.x = square.position.x;
            cylinder.position.y = square.position.y;
            scene.add(cylinder);

            const cylinderRef = {
              current: cylinder,
            };

            const animateCylinder = () => {
              cylinderRef.current.rotation.z += 0.01;
              renderer.render(scene, camera);
              requestAnimationFrame(animateCylinder);
            };

            animateCylinder();
            return () => {
              cancelAnimationFrame(animateCylinder);
              scene.clear();
            };
          }
        });
      }
    }
  }

  camera.position.z = 20;
  camera.up.set(0, 0, 1); // Set camera up direction to the positive z-axis (horizontal)
  scene.rotation.x = -Math.PI / 5; // Rotate the scene by 90 degrees around the x-axis

  sceneRef.current = scene;
  cameraRef.current = camera;
  rendererRef.current = renderer;
};