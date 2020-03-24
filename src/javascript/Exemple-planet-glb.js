import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

console.log(GLTFLoader)

export default class Planet
{
    constructor()
    {
        console.log('Planet constructor')
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/models/earth/gITF-Binary/Earth.glb',
            (_gltf) =>
            {
                while(_gltf.scene.children.length)
                {
                    this.planet = _gltf.scene.children[0]
                    console.log(this.planet)
                    this.group.add(this.planet)
                }
                this.planet.scale.set(0.01, 0.01, 0.01)
            }
        )
    }
}