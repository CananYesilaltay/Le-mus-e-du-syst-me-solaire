import './style/main.styl'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import Planet from './javascript/Planet.js'
// import Fiche from './javascript/Fiche.js'
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
const astronaute = new Planet(astronauteSource, 0.03, -4.9, 0.75)
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

    // Infos
// const mercuryInfo = new Fiche(
//         'Mercure',
//         'Le messager des dieux',
//         'De Mercure, le dieu romain des valeurs, des marchands et des messager',
//         'Planète tellurique',
//         '43,199,460 km',
//         '58 jours',
//         '2 439,7 km',
//         '88 jours',
//         '5 427 kg/m3',
//         '-173°C la nuit 427°C le jour',
//         'Gémaux/Vierge'
//         )
// mercuryInfo.group.visible = false
// scene.add(mercuryInfo.group)
// console.log(mercuryInfo.group)


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

const xAxis = new THREE.Vector3(1,0,0)
camera.translateOnAxis(xAxis, -0.5)
scene.add(camera)

// const cameraCSS2 = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.5 , 1000)
// cameraCSS2.position.z = 1
// scene.add(cameraCSS2)


// ------------------------
// Renderer
// ------------------------

    // Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

    // Label renderer
// const labelRenderer = new CSS2DRenderer()
// labelRenderer.setSize(sizes.width,sizes.height)
// labelRenderer.domElement.style.position = 'fixed';
// labelRenderer.domElement.style.top = 0
// document.body.appendChild( labelRenderer.domElement )

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
    // cameraCSS2.aspect = sizes.width / sizes.height
    // cameraCSS2.updateProjectionMatrix()
    console.log ('resize')
    // Update effectComposer
    effectComposer.setSize(sizes.width, sizes.height)
})

// ------------------------
// Info Cards and exit button
// ------------------------

const exitButton = document.querySelector('.exit-button')
const mercuryInfo = document.querySelector('.mercury-info')
const venusInfo = document.querySelector('.venus-info')
const earthInfo = document.querySelector('.earth-info')
const marsInfo = document.querySelector('.mars-info')
const jupiterInfo = document.querySelector('.jupiter-info')
const saturnInfo = document.querySelector('.saturn-info')
const uranusInfo = document.querySelector('.uranus-info')
const neptuneInfo = document.querySelector('.neptune-info')
const sunInfo = document.querySelector('.sun-info')

let clickable = true

let mercuryZoom = false
let venusZoom = false
let earthZoom = false
let marsZoom = false
let jupiterZoom = false
let saturnZoom = false
let uranusZoom = false
let neptuneZoom = false
let sunZoom = false



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

const defaultCamera = (xMove, zMove) => {
    TweenLite.to(
        camera.position,
        1,
        {
            x: camera.position.x - xMove,
            z: camera.position.z + zMove,
            ease: 'Power3.easeInOut'
        }
    )
}

exitButton.addEventListener('click', () => 
{ 
    if(mercuryZoom){defaultCamera(6.5, 14)
        clickable = true}
    else if(jupiterZoom){defaultCamera(-2.4, 11.5)
        clickable = true}
    else if(venusZoom){defaultCamera(4.9, 13.5)}
    else if(earthZoom){defaultCamera(2.9, 13.4)}
    else if(marsZoom){defaultCamera(1.1, 13.5)}
    else if(saturnZoom){defaultCamera(-4.3, 13)}
    else if(uranusZoom){defaultCamera(-6.8, 13)}
    else if(neptuneZoom){defaultCamera(-9.1, 13.5)}
    else if(sunZoom){defaultCamera(20, -2)}
})



document.addEventListener('click', () =>
{
    if(hoverNeptune && clickable)
    {
        moveCamera(9.1, -13.5)
        neptuneInfo.classList.remove('is-hidden')
        exitButton.classList.remove('is-hidden')
        neptuneZoom = true
        clickable = false
    }if(hoverUranus && clickable)
    {
        moveCamera(6.8, -13)
        neptune.group.visible = false
        uranusInfo.classList.remove('is-hidden')
        exitButton.classList.remove('is-hidden')
        uranusZoom = true
        clickable = false
    }if(hoverSaturn && clickable)
    {
        moveCamera(4.3, -13)
        uranus.group.visible = false
        saturnInfo.classList.remove('is-hidden')
        exitButton.classList.remove('is-hidden')
        SaturnZoom = true
        clickable = false
    }if(hoverJupiter && clickable)
    {
        moveCamera(2.4, -11.5)
        saturn.group.visible = false
        jupiterInfo.classList.remove('is-hidden')
        exitButton.classList.remove('is-hidden')
        jupiterZoom = true
        clickable = false
    }if(hoverMars && clickable)
    {
        moveCamera(-1.1, -13.5)
        jupiter.group.visible = false
        marsInfo.classList.remove('is-hidden')
        exitButton.classList.remove('is-hidden')
        marsZoom = true
        clickable = false
    }if(hoverEarth && clickable)
    {
        moveCamera(-2.9, -13.4)
        mars.group.visible = false
        earthInfo.classList.remove('is-hidden')
        exitButton.classList.remove('is-hidden')
        earthZoom = true
        clickable = false
    }if(hoverVenus && clickable)
    {
        moveCamera(-4.9, -13.5)
        earth.group.visible = false
        venusInfo.classList.remove('is-hidden')
        exitButton.classList.remove('is-hidden')
        venusZoom = true
        clickable = false
    }if(hoverMercury && clickable)
    {
        moveCamera(-6.5, -14)
        venus.group.visible = false
        mercuryInfo.classList.remove('is-hidden')
        exitButton.classList.remove('is-hidden')
        mercuryZoom = true
        clickable = false
    }if(hoverSun && clickable)
    {
        moveCamera(-20, 2)
        sunInfo.classList.remove('is-hidden')
        exitButton.classList.remove('is-hidden')
        sunZoom = true
        clickable = false
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
    if(intersectNeptune.length){ hoverNeptune = true, astronaute.group.position.x = neptune.planetPositionX - 7.95 }
    else if(intersectUranus.length){ hoverUranus = true, astronaute.group.position.x = uranus.planetPositionX - 7.05 }
    else if(intersectSaturn.length){ hoverSaturn = true, astronaute.group.position.x = saturn.planetPositionX - 6.05 }
    else if(intersectJupiter.length){ hoverJupiter = true, astronaute.group.position.x = jupiter.planetPositionX - 5 }
    else if(intersectMars.length){ hoverMars = true, astronaute.group.position.x = mars.planetPositionX - 4.1 }
    else if(intersectEarth.length){ hoverEarth = true, astronaute.group.position.x = earth.planetPositionX - 3.45 }
    else if(intersectVenus.length){ hoverVenus = true, astronaute.group.position.x = venus.planetPositionX - 2.7 }
    else if(intersectMercury.length){ hoverMercury = true, astronaute.group.position.x = mercury.planetPositionX - 2.15 }
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

    //rotation
    jupiter.group.rotation.y += 0.001 
    //jupiter.group.rotation.x = -0.5
    neptune.group.rotation.y += 0.001
    uranus.group.rotation.y += 0.001
    saturn.group.rotation.y += 0.001
    mars.group.rotation.y += 0.001
    earth.group.rotation.y += 0.001
    venus.group.rotation.y += 0.001
    mercury.group.rotation.y += 0.001
    sun.group.rotation.y += 0.0002

    // RENDER
    effectComposer.render(scene, camera)
    // labelRenderer.render( scene, cameraCSS2 );
}

loop()

