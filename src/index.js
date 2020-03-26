import './style/main.styl'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import Planet from './javascript/Planet.js'
import skyBoxSource from './images/skybox.jpg'
import { TweenLite } from 'gsap/all'


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
const ambientLight = new THREE.AmbientLight(0xffFFCB,0.7)
scene.add(ambientLight)


// ------------------------
// Objects
// ------------------------

const axesHelper = new THREE.AxesHelper( 5 )
scene.add( axesHelper )

    // Object Sources
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

    // Astronaute
const astronaute = new Planet(astronauteSource, 0.03, 1.35, 2)
scene.add(astronaute.group)
console.log(astronaute)

    // Planets
const neptune = new Planet(neptuneSource, 0.9, 8, 0)
scene.add(neptune.group)

const uranus = new Planet(uranusSource, 1, 5.6, 0)
scene.add(uranus.group)

const saturn = new Planet(saturnSource, 1, 3, 0)
scene.add(saturn.group)

const jupiter = new Planet(jupiterSource, 1.2, 0.1, 0)
scene.add(jupiter.group)

const mars = new Planet(marsSource, 1, -2.3, 0)
scene.add(mars.group)

const earth = new Planet(earthSource, 1, -4, 0)
scene.add(earth.group)

const venus = new Planet(venusSource, 1, -6, 0)
scene.add(venus.group)

const mercury = new Planet(mercurySource, 1, -7.5, 0)
scene.add(mercury.group)

const sun = new Planet(sunSource, 1, -14, 0)
scene.add(sun.group)


// ------------------------
// Skybox
// ------------------------

const textureLoader = new THREE.TextureLoader()
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
camera.position.z = 15
camera.lookAt(new THREE.Vector3(0,0,0))
const xAxis = new THREE.Vector3(
    camera.matrixWorld.elements[0], 
    camera.matrixWorld.elements[1], 
    camera.matrixWorld.elements[2])

camera.translateOnAxis(xAxis, -0.5)
scene.add(camera)


// ------------------------
// Renderer
// ------------------------

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement)

    //effectComposer
const effectComposer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)
        
        //post processing
const unrealPass = new UnrealBloomPass
unrealPass.strength = 0.6
unrealPass.radius = 0.75
unrealPass.threshold = 0.05
effectComposer.addPass(unrealPass)


// ------------------------
// Resize
// ------------------------

window.addEventListener('resize',()=>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    renderer.setSize(sizes.width,sizes.height)
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    console.log ('resize')
    // Update effectComposer
    effectComposer.setSize(sizes.width, sizes.height)
})

// ------------------------
// Move Camera
// ------------------------

const moveCamera = (cameraMoveX,cameraMoveZ) => {
    TweenLite.to(
        camera.position,
        1,
        {
            x: camera.position.x + cameraMoveX,
            z: camera.position.z + cameraMoveZ,
            ease: 'Power3.easeInOut'
        }
    )
}

document.addEventListener('click', () =>
{
    if(hoverNeptune)
    {
        moveCamera(9.1, -13.5)
    }if(hoverUranus)
    {
        moveCamera(6.8, -13)
        neptune.group.visible = false
    }if(hoverSaturn)
    {
        moveCamera(4.3, -13)
        uranus.group.visible = false
    }if(hoverJupiter)
    {
        moveCamera(1.9, -11.5)
        saturn.group.visible = false
    }if(hoverMars)
    {
        moveCamera(-1.1, -13.5)
        jupiter.group.visible = false
    }if(hoverEarth)
    {
        moveCamera(-2.9, -13.4)
        mars.group.visible = false
    }if(hoverVenus)
    {
        moveCamera(-4.9, -13.5)
        earth.group.visible = false
    }if(hoverMercury)
    {
        moveCamera(-6.5, -14)
        venus.group.visible = false
    }if(hoverSun)
    {
        moveCamera(-20, 2)
    }
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

    // Initializing hover boolean
let hoverNeptune = false
let hoverUranus = false
let hoverSaturn = false
let hoverJupiter = false
let hoverMars = false
let hoverEarth = false
let hoverVenus = false
let hoverMercury = false
let hoverSun = false

    // Loop
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

    // Detect Hover on planets
    if(intersectNeptune.length){ hoverNeptune = true }
    else if(intersectUranus.length){ hoverUranus = true }
    else if(intersectSaturn.length){ hoverSaturn = true }
    else if(intersectJupiter.length){ hoverJupiter = true }
    else if(intersectMars.length){ hoverMars = true }
    else if(intersectEarth.length){ hoverEarth = true }
    else if(intersectVenus.length){ hoverVenus = true }
    else if(intersectMercury.length){ hoverMercury = true }
    else if(intersectSun.length){ hoverSun = true }
    else{
        hoverNeptune = false
        hoverUranus = false
        hoverSaturn = false
        hoverJupiter = false
        hoverMars = false
        hoverEarth = false
        hoverVenus = false
        hoverMercury = false
        hoverSun = false
    }

    // RENDER
    effectComposer.render(scene, camera)

}

loop()

