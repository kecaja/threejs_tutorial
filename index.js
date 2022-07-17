// const { LineSegments } = require("./lib/three");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(24, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const colorPink = new THREE.Color('hsl(306, 100%, 50%)')
const colorYellow = new THREE.Color('hsl(40, 100%, 50%)')
const colorBlue = new THREE.Color('hsl(160, 100%, 50%)')



const cubeGeometry = new THREE.BoxGeometry()
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: colorPink
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


const light = new THREE.PointLight(colorYellow,0.5)
light.position.set(200,-400,400)
const light2 = new THREE.PointLight(colorBlue,3)
light2.position.set(10,100,200)

// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
// const points = [];
// points.push( new THREE.Vector3( 0, 0, 0 ) );
// points.push( new THREE.Vector3( 1, 1, 2 ) );
// points.push( new THREE.Vector3( 0, 6, 0 ) );
// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const line = new THREE.Line( geometry, material );

// const curve = new THREE.QuadraticBezierCurve(
// 	new THREE.Vector2( -10, 0 ),
// 	new THREE.Vector2( 20, 15 ),
// 	new THREE.Vector2( 10, 0 )
// );

// const points = curve.getPoints( 50 );
// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// const curveObject = new THREE.Line( geometry, material );
// Create the final object to add to the scene

class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}

const path = new CustomSinCurve( 10 );
const geometry = new THREE.TubeGeometry( path, 200, 2, 8, false );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
//scene.add( mesh );




scene.add(cube);
scene.add(light);
scene.add(light2);
// scene.add( line );
// scene.add(curveObject)

camera.position.z = 10
// scene.background.set(new THREE.Color( 0xff0000 ));
scene.background = new THREE.Color(0xffffff);
//renderer.setClearColorHex( 0x000000, 1 );
renderer.render(scene, camera)



/////////////// Functions
var slider = document.getElementById('myRange');
function size(scalar){
    cube.scale.x = 1*scalar;
    cube.rotation.x = scalar;
    cube.rotation.y = scalar * 2;
}

slider.addEventListener('input', ()=>{
    console.log(slider.value);
    size(slider.value);
    renderer.render(scene, camera)
});