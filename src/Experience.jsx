import {
    OrbitControls,
    useGLTF,
    useTexture,
    Center,
    Sparkles,
    shaderMaterial
} from '@react-three/drei'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

const PortalMaterial = shaderMaterial({
    uTime: 0,
    uColor: new THREE.Color('#3C1F6B'),
    uColorEnd: new THREE.Color('#9b09c4')
},
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience() {
    const { nodes } = useGLTF('./model/portal.glb')

    const portalMaterial = useRef()

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    return <>
        <ambientLight intensity={0.3} />
        <color args={['#030202']} attach={'background'} />
        <OrbitControls makeDefault />

        <Center>
            {/* Portal scene mesh */}
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            {/* Pole lights */}
            <mesh
                geometry={nodes.poleLightA.geometry}
                position={nodes.poleLightA.position}
            >
                <meshBasicMaterial color={'#FF5648'} />
            </mesh>
            <mesh
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}
            >
                <meshBasicMaterial color={'#FF5648'} />
            </mesh>

            {/* Portal light */}
            <mesh
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
            >
                <portalMaterial ref={portalMaterial} />
            </mesh>

            <Sparkles
                size={6}
                scale={[3.5, 1.5, 3.5]}
                position={[0, 1, 0]}
                speed={0.2}
                count={40}
                color={'#7f00ff'}

            />
        </Center>
    </>
}