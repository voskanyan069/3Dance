//import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
//import Stats from 'three/examples/jsm/libs/stats.module'

import * as THREE from 'https://cdn.skypack.dev/three@0.135.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/FBXLoader.js'
import Stats from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/libs/stats.module.js'

const scene = new THREE.Scene()
//scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight()
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0.8, 1.4, 1.0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)

const material = new THREE.MeshNormalMaterial()

const fbxLoader = new FBXLoader()
fbxLoader.load(
	'models/xbot.fbx',
	(object) => {
		object.traverse(function (child) {
			if (child.isMesh) {
				child.material = material
				if (child.material) {
					child.material.transparent = false
				}
			}
		})
		object.scale.set(0.01, 0.01, 0.01)
		scene.add(object)
	},
	(xhr) => {
		if (xhr.lengthComputable) {
			var percentComplete = (xhr.loaded / xhr.total) * 100
		}
	},
	(error) => {
		console.log(error)
	}
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
	requestAnimationFrame(animate)

	controls.update()

	render()

	stats.update()
}

function render() {
	renderer.render(scene, camera)
}

animate()
