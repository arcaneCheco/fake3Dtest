import * as THREE from 'three';
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import mapSrc from './mount.jpg';
import depthSrc from './mount-map.jpg';

class World {
    constructor() {
        console.log('hello')
        this.setup();
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("resize", this.resize.bind(this));
        this.resize()

        this.textureLoader = new THREE.TextureLoader();
        this.map = this.textureLoader.load(mapSrc);
        this.depthMap = this.textureLoader.load(depthSrc);

        this.addObject()

        this.render()
    }

    setup() {
        this.container = document.getElementById('container');
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.container.appendChild(this.renderer.domElement)
        this.camera = new THREE.PerspectiveCamera(
            65,
            2,
            0.1,
            1000)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 1;
    }

    addObject() {
        this.geometry = new THREE.PlaneGeometry(1.5, 1);

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uAspect: { value: this.width / this.height },
                uMap: { value: this.map },
                uDepth: { value: this.depthMap },
                uMouse: { value: new THREE.Vector2() }
            },
            transparent: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    onMouseMove({ clientX, clientY }) {
        const x = clientX / this.width - 0.5;
        const y = -clientY / this.height + 0.5
        console.log({ x, y })
        if (this.material) {
            this.material.uniforms.uMouse.value.x = x
            this.material.uniforms.uMouse.value.y = y
        }

    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;

        /** fullscreen */
        // this.camera.fov =
        //   (360 / Math.PI) * Math.atan(this.height / (2 * this.camera.position.z));
        // this.mesh.scale.set(this.width, this.height, 1);

        this.camera.updateProjectionMatrix();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }
}

new World()