import './style/main.styl'
import * as THREE from 'three'

/*
    Sizes
 */

const sizes  = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/*
    SCENE
 */


const scene = new THREE.Scene()

/*
    Object
 */

const dummy = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshNormalMaterial()
)

scene.add(dummy)


/*
    Camera
 */

const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height,0.1,100)
camera.position.z = 10
scene.add(camera)


/*
    RENDERER
 */

const render = new THREE.WebGLRenderer()
render.setSize(sizes.width,sizes.height)
render.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(render.domElement)

/*
    RESIZE
 */

window.addEventListener('resize',()=>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    render.setSize(sizes.width,sizes.height)
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})

/*
    Cursor
 */

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove',(_event) =>
    {
        cursor.x = (_event.clientX / sizes.width) - 0.5
        cursor.y = (_event.clientY / sizes.height) - 0.5
    })

window.addEventListener('scroll',(_event) =>
{
    console.log(_event)
})



const animate = () =>
{
    requestAnimationFrame(animate)

    render.render(scene, camera)

}

animate()