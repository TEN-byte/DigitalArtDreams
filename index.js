/*The first step is how to activate the points with a button or text data in html
I mean, hide all the THREEjs Stuff before a mouseEvent or a submit action.
*/

//Init the scene

const scene = new THREE.Scene();
{
  const color = 0xff44af;
  const near = 10;
  const far = 250;
  scene.background = new THREE.Color(0x0a0317);
  scene.fog = new THREE.Fog(color, near, far);
 
}

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);
//add some lights
const directionalLight = new THREE.DirectionalLight( 0xf0caf0, 0.5 );
scene.add( directionalLight );
const light = new THREE.HemisphereLight(0x6289FF, 0x08020, 1);
scene.add(light);

//start the audio interface
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

//get the audio element
const audioElement = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audioElement);
//connect the nodes to the BaseAudioContext.destination
track.connect(audioContext.destination);
//select the play button 
const playButton = document.querySelector('button');
playButton.addEventListener('click', function(){
  //check if the context is in suspended state, because the Autoplay policy 
  if (audioContext.state === 'suspended'){
    audioContext.resume();
  }
  //play or pause the track
  if (this.dataset.playing === 'false'){
    audioElement.play();
    this.dataset.playing = 'true';
  } else if (this.dataset.playing === 'true'){
    audioElement.pause();
    this.dataset.playing = 'false';
  }
}, false);

//The HTMLMediaElement fires an ended event once it's finished playing
audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
}, false);
//Modifying sound
const gainNode = audioContext.createGain();
track.connect(gainNode).connect(audioContext.destination);
const volumeControl = document.querySelector('#volume');
volumeControl.addEventListener('input', function (){
  gainNode.gain.value = this.value;
}, false);
//add a stereo panning
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);
//Using the values from the setup in the HTML
const pannerControl = document.querySelector('#panner');
pannerControl.addEventListener('input', function(){
  panner.pan.value = this.value;
}, false);
//adjust the audio graph gain
track.connect(gainNode).connect(panner).connect(audioContext.destination);

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
const material = new THREE.PointsMaterial({color: 0x48e5c2});
const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 200;

//render the camera
function animate (){
    requestAnimationFrame( animate );

    //animate the stuff
    points.rotation.x += 0.01;
    points.rotation.y += 0.01;

    renderer.render( scene, camera );
};
animate();
