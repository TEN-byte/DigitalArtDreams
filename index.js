/*the first step is how to make particles and activate with a button in html
I mean hide all the THREEjs Stuff before a mouseEvent.
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

//play with the canvas

const geometry = new THREE.CircleGeometry( 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const circle = new THREE.Mesh( geometry, material );
scene.add( circle );

camera.position.z = 15;



//render the camera
function animate (){
    requestAnimationFrame( animate );

    //animate the stuff

    circle.rotation.x += 0.01;
    circle.rotation.y += 0.01;

    renderer.render( scene, camera );
};
animate();

