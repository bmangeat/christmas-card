import * as THREE from 'three'

export default class Snow{
    constructor(scene) {

        this.scene = scene
        this.loader = new THREE.TextureLoader()

        this.sprites = [
            this.loader.load(document.querySelector('.snowflake1').src),
            this.loader.load(document.querySelector('.snowflake2').src),
            this.loader.load(document.querySelector('.snowflake3').src),
            this.loader.load(document.querySelector('.snowflake4').src),
            this.loader.load(document.querySelector('.snowflake5').src)
        ]

        this.materials = []
        this.geometry = new THREE.BufferGeometry()
        this.vertices = []

        this.parameters = []

        this.setVertices()
        this.setParameters()

        this.createParticle()
    }

    setVertices(){
        for ( let i = 0; i < 2000; i ++ ) {
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;

            this.vertices.push( x, y, z );
        }

        this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.vertices, 3 ) );

    }

    setParameters(){
        this.parameters = [
            [[ 0.6, 0.6, .9 ], this.sprites[1], 20 ],
            [[ 0.4, 0.4, .9 ], this.sprites[2], 15 ],
            [[ 0.3, 0.4, .9 ], this.sprites[0], 10 ],
            [[ 0.4, 0.5, 0.5 ], this.sprites[4], 8 ],
            [[ 0.3, 0.5, 0.5 ], this.sprites[3], 5 ]
        ];
    }

    createParticle() {


        for ( let i = 0; i < this.parameters.length; i ++ ) {

            const color = this.parameters[ i ][ 0 ];
            const sprite = this.parameters[ i ][ 1 ];
            const size = this.parameters[ i ][ 2 ];

            this.materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
            this.materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );

            const particles = new THREE.Points( this.geometry, this.materials[ i ] );

            particles.rotation.x = Math.random() * 6;
            particles.rotation.y = Math.random() * 6;
            particles.rotation.z = Math.random() * 6;

            this.scene.add( particles );

        }


    }


    render(){
        this.time = Date.now() * 0.00005;


        for ( let i = 0; i < this.scene.children.length; i ++ ) {

            this.object = this.scene.children[ i ];

            if ( this.object instanceof THREE.Points ) {

                this.object.rotation.y = this.time * ( i < 4 ? i + 1 : - ( i + 1 ) );

            }

        }

        for ( let i = 0; i < this.materials.length; i ++ ) {

            this.color = this.parameters[ i ][ 0 ];

            const h = ( 360 * ( this.color[ 0 ] + this.time ) % 360 ) / 360;
            this.materials[ i ].color.setHSL( h, this.color[ 1 ], this.color[ 2 ] );

        }
    }
}
