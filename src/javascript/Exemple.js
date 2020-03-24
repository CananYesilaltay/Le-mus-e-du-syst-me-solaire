import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

console.log(GLTFLoader)

export default class Duck
{
    constructor()
    {
        console.log('Duck constructor')
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/models/duck/glTF/Duck.gltf',
            (_gltf) =>
            {
                this.duck = _gltf.scene.children[0].children[1]
                console.log(this.duck)
                this.duck.scale.set(0.01, 0.01, 0.01)
                this.duck.material = new THREE.MeshNormalMaterial()
                this.group.add(this.duck)
            }
        )
    }
}