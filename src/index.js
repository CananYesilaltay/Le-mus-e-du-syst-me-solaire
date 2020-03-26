import './style/main.styl'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
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
    const createInfoSlide = (planetName, planetSubtitle, planetOrigins) =>
    {
        // Fiche container
        const infoContainer = document.createElement('div')
        infoContainer.classList.add('container')

        // Title
        const ficheName = document.createElement('div')
        ficheName.classList.add('ficheName')
        infoContainer.appendChild(ficheName)
        const nameTitle = document.createElement ('h1')
        nameTitle.textContent = planetName
        ficheName.appendChild(nameTitle)
        const nameSubtitle = document.createElement ('p')
        nameSubtitle.classList.add('subtitle')
        nameSubtitle.textContent = planetSubtitle
        ficheName.appendChild(nameSubtitle)

        // Origins
        const ficheOrigins = document.createElement('div')
        ficheOrigins.classList.add('origins')
        infoContainer.appendChild(ficheOrigins)
        const originsTitle = document.createElement('h4')
        originsTitle.textContent = "D'où vient son nom ?"
        ficheOrigins.appendChild(originsTitle)
        const originsText = document.createElement('p')
        originsText.textContent = planetOrigins
        ficheOrigins.appendChild(originsText)

        // General container
        const generalInfosContainer = document.createElement('div')
        generalInfosContainer.classList.add('general-info-container')
        infoContainer.appendChild(generalInfosContainer)
            // Infos
        // const icon = document.createElement('img')
        // originsTitle.textContent = "D'où vient son nom ?"
        // ficheOrigins.appendChild(originsTitle)
        // const originsText = document.createElement('p')
        // originsText.textContent = planetOrigins
        // ficheOrigins.appendChild(originsText)
        

        // Fiche title
        const info = new CSS2DObject( infoContainer );
        info.position.set( 0.4, 0 , 0 )
        scene.add(info)
    }
    createInfoSlide(
        'Mercure',
        'Le messager des dieux',
        'De Mercure, le dieu romain des valeurs, des marchands et des messager'
        )



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

const xAxis = new THREE.Vector3(1,0,0)
camera.translateOnAxis(xAxis, -0.5)
scene.add(camera)

const cameraCSS2 = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.5 , 1000)
cameraCSS2.position.z = 1
scene.add(cameraCSS2)

// ------------------------
// Renderer
// ------------------------

    // Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

    // Label renderer
const labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(sizes.width,sizes.height)
labelRenderer.domElement.style.position = 'fixed';
labelRenderer.domElement.style.top = 0;
document.body.appendChild( labelRenderer.domElement )

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
    labelRenderer.render( scene, cameraCSS2 );
}

loop()

