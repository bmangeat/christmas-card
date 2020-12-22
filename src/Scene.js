import * as THREE from 'three'
import Figure from "./Figure"

const perspective = 800


export default class Scene {
    constructor() {
        this.container = document.getElementById( 'stage' )

        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer( {
            canvas: this.container,
            alpha: true
        } )

        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.renderer.setPixelRatio( window.devicePixelRatio )

        this.initCamera()
        this.initLights()

        this.figure = new Figure(this.scene, () => {
            this.update()
        })

    }

    initCamera() {
        const fov = (180 * (2 * Math.atan( window.innerHeight / 2 / perspective ))) / Math.PI

        this.camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, 1000 )
        this.camera.position.set(0, 0, perspective)
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight( 0xffffff, 2 )
        this.scene.add( ambientLight )
    }

    update(){
        if(this.renderer === undefined || this.scene === undefined || this.camera === undefined) return
        requestAnimationFrame(this.update.bind(this))
        this.figure.update()

        this.renderer.render(this.scene, this.camera)

    }


}
