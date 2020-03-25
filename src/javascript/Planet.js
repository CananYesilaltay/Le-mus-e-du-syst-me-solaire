import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

console.log(GLTFLoader)

export default class Planet
{
    constructor(modelSource, planetScale, planetPosition)
    {
        this.modelSource = modelSource
        this.planetScale = planetScale
        this.planetPosition = planetPosition

        this.group = new THREE.Group()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            modelSource,
            (_gltf) =>
            {
                this.scene = _gltf.scene
                this.planet = this.scene.children[0]
                this.planet.scale.set(planetScale, planetScale, planetScale)
                this.planet.position.set(this.planetPosition, 0, 0)
                this.group.add(this.planet)
                console.log(this.scene)
            }
        )
    }
}