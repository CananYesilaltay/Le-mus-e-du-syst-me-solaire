import './style/main.styl'
import * as THREE from 'three'
import Planet from './javascript/Planet.js'
import skyBoxSource from './images/skybox.jpg'
const textureLoader = new THREE.TextureLoader()


// ------------------------
// Sizes
// ------------------------

const sizes  = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight


// ------------------------
// Scene
// ------------------------

const scene = new THREE.Scene()

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff,1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xff9000, 1, 10)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 5
scene.add(directionalLight)


// ------------------------
// Objects
// ------------------------

const neptuneSource = '/models/planets/neptune.glb'
// const uranusSource = '/models/planets/uranus.glb'
const saturnSource = '/models/planets/saturn.glb'
const jupiterSource = '/models/planets/jupiter.glb'
const marsSource = '/models/planets/mars.glb'
const earthSource = '/models/planets/earth.glb'
const venusSource = '/models/planets/venus.glb'
const mercurySource = '/models/planets/mercury.glb'
const sunSource = '/models/planets/sun.glb'

// Planets
const neptune = new Planet(neptuneSource, 1, 8)
scene.add(neptune.group)

// const uranus = new Planet(uranusSource, 1, 8)
// scene.add(uranus.group)

const saturne = new Planet(saturnSource, 1, 5.3)
scene.add(saturne.group)

const jupiter = new Planet(jupiterSource, 1.2, 2)
scene.add(jupiter.group)

const mars = new Planet(marsSource, 1, -0.7)
scene.add(mars.group)

const earth = new Planet(earthSource, 1, -3)
scene.add(earth.group)

const venus = new Planet(venusSource, 1, -5.5)
scene.add(venus.group)

const mercury = new Planet(mercurySource, 1, -7.5)
scene.add(mercury.group)

const sun = new Planet(sunSource, 1, -13)
scene.add(sun.group)

// Skybox

const cubeSize = new THREE.BoxGeometry(8192, 8192, 4096)
const skyBoxTexture = textureLoader.load(skyBoxSource)
const cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: skyBoxTexture, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: skyBoxTexture, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: skyBoxTexture, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: skyBoxTexture, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: skyBoxTexture, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({ map: skyBoxTexture, side: THREE.DoubleSide})
    ]
let cube = new THREE.Mesh(cubeSize, cubeMaterials)


scene.add(cube)

// ------------------------
// Camera
// ------------------------


let camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 1,4096 );


camera.position.z = 10;

/*
const camera = new THREE.OrthographicCamera( sizes.width / -110, sizes.width / 110, sizes.height/110,sizes.height/-110, 1, 1000)
camera.position.z = 10
scene.add(camera)
*/

// ------------------------
// Renderer
// ------------------------

const render = new THREE.WebGLRenderer()
render.setSize(sizes.width,sizes.height)
render.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(render.domElement)


// ------------------------
// Resize
// ------------------------

window.addEventListener('resize',()=>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    render.setSize(sizes.width,sizes.height)
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    console.log ('resize')
})

// ------------------------
// Cursor
// ------------------------

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove',(_event) =>
    {
        cursor.x = (_event.clientX / sizes.width) - 0.5
        cursor.y = (_event.clientY / sizes.height) - 0.5
    })


// ------------------------
// Loop
// ------------------------

const loop = () =>
{
    requestAnimationFrame(loop)

    camera.lookAt(scene.position)

    render.render(scene, camera)

}

loop()