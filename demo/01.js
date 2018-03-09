var renderer,
    scene,
    camera,
    cube,
    plane,
    control,
    spotLight,
		stats
		
stats = new Stats()
stats.showPanel(1)
document.body.appendChild( stats.dom )

function init() { 
  // Three.js initialization code.
  scene = new THREE.Scene()

  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0x000000, 1.0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMapEnabled = true

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.x = 15
  camera.position.y = 16
  camera.position.z = 13
  camera.lookAt(scene.position)

  spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.name = 'Spot Light';
	spotLight.angle = Math.PI / 5;
	spotLight.penumbra = 0.1;
	spotLight.position.set( 10, 20, 20 );
	spotLight.castShadow = true;
	spotLight.shadow.camera.near = 8;
	spotLight.shadow.camera.far = 30;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	scene.add( spotLight );

  var planeGeometry = new THREE.PlaneGeometry(20,20)
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcccccc
  })
  plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.receiveShadow = true
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -2

  scene.add(plane)


  var cubeGeometry = new THREE.CubeGeometry(6, 4, 6)
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 'red'
  })
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = true;
  cube.name = "cube"
  scene.add(cube)

  
  /* --- Controls --- */

  control = new function(){
    this.rotationSpeed = 0.005
    this.opacity = 0.6
    this.color = cubeMaterial.color.getHex()
  }
  addControlGui(control)

  function addControlGui(controlObject){
    var gui = new dat.GUI()
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01)
    gui.add(controlObject, 'opacity', 0.1, 1)
    gui.addColor(controlObject, 'color')
  }

  /* ------ Doing the render() ---- */

  document.body.appendChild(renderer.domElement)
  render()
}

function render() {
	stats.begin()
  scene.getObjectByName('cube').material.opacity = control.opacity
  scene.getObjectByName('cube').material.color = new THREE.Color(control.color)

	renderer.render(scene, camera)
	stats.end()

  requestAnimationFrame(render) 
}

window.onload = init()

