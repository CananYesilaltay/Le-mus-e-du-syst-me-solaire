import './style/main.styl'
import * as THREE from 'three'
import Planet from './javascript/Exemple-planet-glb.js'
// import Planet from './javascript/Exemple-planet-gltf.js'

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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 5
scene.add(directionalLight)


// ------------------------
// Objects
// ------------------------

// Planet
const planet = new Planet()
scene.add(planet.group)


// ------------------------
// Camera
// ------------------------

const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,0.1,100)
camera.position.z = 10
scene.add(camera)


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