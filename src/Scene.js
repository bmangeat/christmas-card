import * as THREE from 'three'
import Figure from './Figure'
import Snow from "./Snow"

const perspective = 800

export default class Scene {
    constructor() {
        this.container = document.getElementById( 'stage' )

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color( 0x212121 )
        this.renderer = new THREE.WebGLRenderer( {
            canvas: this.container,
            alpha: true
        } )

        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.renderer.setPixelRatio( window.devicePixelRatio )

        this.initLights()
        this.initCamera()

        this.figure = new Figure( this.scene, () => {
            this.figure.update()
            this.addEvents()

        } )
        this.snow = new Snow( this.scene )

    }

    initLights() {
        const ambientlight = new THREE.AmbientLight( 0xffffff, 2 )
        this.scene.add( ambientlight )
    }


    initCamera() {
        const fov =
            (180 * (2 * Math.atan( window.innerHeight / 2 / perspective ))) /
            Math.PI

        this.camera = new THREE.PerspectiveCamera(
            fov,
            window.innerWidth / window.innerHeight,
            1,
            1000
        )
        this.camera.position.set( 0, 0, perspective )
    }

    onWindowResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;

        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( w, h );
    }


    addEvents() {
        window.requestAnimationFrame( this.update.bind( this ) );
        window.addEventListener( "resize", this.onWindowResize.bind( this ), false );
    }

    update() {
        if ( this.renderer === undefined ) return
        requestAnimationFrame( this.update.bind( this ) )

        this.figure.update()
        this.snow.render()

        this.renderer.render( this.scene, this.camera )
    }
}
