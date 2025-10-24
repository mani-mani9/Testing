// Basic Three.js 3D Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene-container").appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffe58a, 1);
sunLight.position.set(10, 10, 10);
scene.add(sunLight);

// Ground (Field)
const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Simple Barn (Red Box)
const barnGeometry = new THREE.BoxGeometry(5, 3, 5);
const barnMaterial = new THREE.MeshLambertMaterial({ color: 0xff3b3b });
const barn = new THREE.Mesh(barnGeometry, barnMaterial);
barn.position.set(0, 1.5, -10);
scene.add(barn);

// Windmill (Cylinder + Blades)
const towerGeometry = new THREE.CylinderGeometry(0.3, 0.5, 6, 16);
const towerMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd });
const tower = new THREE.Mesh(towerGeometry, towerMaterial);
tower.position.set(8, 3, -5);
scene.add(tower);

const bladeGeometry = new THREE.BoxGeometry(0.2, 4, 0.1);
const bladeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const blades = [];
for (let i = 0; i < 4; i++) {
  const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
  blade.position.set(8, 6, -5);
  blade.rotation.z = i * Math.PI / 2;
  blades.push(blade);
  scene.add(blade);
}

// Camera Start Position
camera.position.set(15, 10, 25);
camera.lookAt(0, 0, 0);

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Rotate windmill blades
  blades.forEach(blade => blade.rotation.z += 0.05);

  // Move sunlight slowly for dynamic effect
  sunLight.position.x = Math.sin(Date.now() * 0.001) * 15;

  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Button Action
document.getElementById("explore-btn").addEventListener("click", () => {
  alert("Welcome to the Smart Agriculture Portal! 🚜");
});

