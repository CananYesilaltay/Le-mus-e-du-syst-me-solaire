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
console.log(sizes.width)
console.log(sizes.height)


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


// ------------------------
// Objects
// ------------------------

const axesHelper = new THREE.AxesHelper( 5 )
scene.add( axesHelper )

const neptuneSource = '/models/planets/neptune.glb'
const uranusSource = '/models/planets/uranus.glb'
const saturnSource = '/models/planets/saturn.glb'
const jupiterSource = '/models/planets/jupiter.glb'
const marsSource = '/models/planets/mars.glb'
const earthSource = '/models/planets/earth.glb'
const venusSource = '/models/planets/venus.glb'
const mercurySource = '/models/planets/mercury.glb'
const sunSource = '/models/planets/sun.glb'

const astronauteSource = '/models/astronautes/astronaute.glb'

// Planets

const astronaute = new Planet(astronauteSource, 0.03, 12, 2)
scene.add(astronaute.group)
console.log(astronaute)

const neptune = new Planet(neptuneSource, 0.9, 11, 0)
scene.add(neptune.group)

const uranus = new Planet(uranusSource, 2, 8.3, 0)
scene.add(uranus.group)

const saturn = new Planet(saturnSource, 1, 5.5, 0)
scene.add(saturn.group)

const jupiter = new Planet(jupiterSource, 1.2, 2, 0)
scene.add(jupiter.group)

const mars = new Planet(marsSource, 1, -0.7, 0)
scene.add(mars.group)

const earth = new Planet(earthSource, 1, -3, 0)
scene.add(earth.group)

const venus = new Planet(venusSource, 1, -5.5, 0)
scene.add(venus.group)

const mercury = new Planet(mercurySource, 1, -7.5, 0)
scene.add(mercury.group)

const sun = new Planet(sunSource, 1, -14, 0)
scene.add(sun.group)

// Skybox

const cubeSize = new THREE.BoxGeometry(sizes.width, sizes.height, sizes.height/2)
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
const raycaster = new THREE.Raycaster()
// ------------------------
// Camera
// ------------------------


const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.5 , 1000)
camera.position.z = 14
camera.lookAt(new THREE.Vector3(0,0,0));

const xAxis = new THREE.Vector3(
    camera.matrixWorld.elements[0], 
    camera.matrixWorld.elements[1], 
    camera.matrixWorld.elements[2],)
const yAxis = new THREE.Vector3(
    camera.matrixWorld.elements[4], 
    camera.matrixWorld.elements[5], 
    camera.matrixWorld.elements[6],)
// camera.translateOnAxis(xAxis, 11.5)
// camera.translateOnAxis(yAxis, 0.3)
// camera.translateX(5.5)
// camera.lookAt(new THREE.Vector3(5.5, 0, 0))
scene.add(camera)

// const helper = new THREE.CameraHelper( camera )
// scene.add( helper )

console.log(camera.matrixWorld.elements[0])
console.log(camera.matrixWorld.elements[1])
console.log(camera.matrixWorld.elements[2])
console.log(camera.matrixWorld.elements[4])
console.log(camera.matrixWorld.elements[5])
console.log(camera.matrixWorld.elements[6])


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

        // Cursor raycasting
        const raycasterCursor = new THREE.Vector2(cursor.x * 2, - cursor.y * 2)
        raycaster.setFromCamera(raycasterCursor, camera)
    
        const intersectNeptune = raycaster.intersectObject(neptune.group, true)
        const intersectUranus = raycaster.intersectObject(uranus.group, true)
        const intersectSaturn = raycaster.intersectObject(saturn.group, true)
        const intersectJupiter = raycaster.intersectObject(jupiter.group, true)
        const intersectMars = raycaster.intersectObject(mars.group, true)
        const intersectEarth = raycaster.intersectObject(earth.group, true)
        const intersectVenus = raycaster.intersectObject(venus.group, true)
        const intersectMercury = raycaster.intersectObject(mercury.group, true)
        const intersectSun = raycaster.intersectObject(sun.group, true)

        if(intersectNeptune.length)
        {
            console.log('Neptune')
        }else if(intersectUranus.length)
        {
            console.log('Uranus')
        }else if(intersectSaturn.length)
        {
            console.log('Saturn')
        }else if(intersectJupiter.length)
        {
            console.log('Jupiter')
        }else if(intersectMars.length)
        {
            console.log('Mars')
        }else if(intersectEarth.length)
        {
            console.log('Earth')
        }else if(intersectVenus.length)
        {
            console.log('Venus')
        }else if(intersectMercury.length)
        {
            console.log('Mercury')
        }else if(intersectSun.length)
        {
            console.log('Sun')
        }


    render.render(scene, camera)

}

loop()