/*The first step is how to activate the points with a button or text data in html
I mean, hide all the THREEjs Stuff before a mouseEvent or a submit action.
*/

//Init the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

//add some lights
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

//the audio interface go here

//play with the canvas
const vertices = [];
for (let i = 0; i < 1000; i++){
  const x = THREE.MathUtils.randFloatSpread(400);
  const y = THREE.MathUtils.randFloatSpread(400);
  const z = THREE.MathUtils.randFloatSpread(400);
  vertices.push(x, y, z);
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new
THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({color: 0x888888});
const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 15;

//render the camera
function animate (){
    requestAnimationFrame( animate );

    //animate the stuff

    points.rotation.x += 0.01;
    points.rotation.y += 0.01;

    renderer.render( scene, camera );
};
animate();
