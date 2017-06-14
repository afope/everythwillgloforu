var scene = new THREE.Scene();
var mesh;
var crystals = [];

camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
camera.zoom = 5;
camera.updateProjectionMatrix();

var renderer = new THREE.WebGLRenderer({alpha: true});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

document.body.appendChild( renderer.domElement );

function createMesh() {
  var length  = randBetween(1, 6),
      width   = randBetween(1, 8);

  var shape = new THREE.Shape();
  shape.moveTo( randBetween(0,1.5),randBetween(0,1.5) );
  shape.lineTo( randBetween(0,1.5), width );
  shape.lineTo( length, width );
  shape.lineTo( length, randBetween(0,1.5) );
  shape.lineTo( randBetween(0,1.5), randBetween(0,1.5) );

  var extrudeSettings = {
      steps: 2,
      amount: randBetween(3,6),
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: randBetween(1,3),
      bevelSegments: 1.5
  };

  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

  var textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = true;
  textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/160607/sugar-texture-4.png', function(texture) {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(0.1,0.1);

    var material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      premultipliedAlpha: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    mesh = new THREE.Mesh(geometry, material) ;
    var x = randBetween(-120,120),
        y = randBetween(-120,120),
        z = randBetween(-120,120);
    mesh.position.set(x,y,z);
    mesh.geometry.center();
    mesh.rotateAt = randBetween(0.01, 0.04);
    scene.add(mesh);
    crystals.push(mesh);
  });
}

function render() {
    requestAnimationFrame( render );
  crystals.forEach(function(mesh) {
    mesh.rotation.x += mesh.rotateAt;
    mesh.rotation.y += mesh.rotateAt;
  });
    renderer.render( scene, camera );
}

function randBetween(min, max) {
  return (Math.random() * (max - min)) + min;
}

for ( var i = 0; i < 300; i ++ ) {
  createMesh();
}

render();
