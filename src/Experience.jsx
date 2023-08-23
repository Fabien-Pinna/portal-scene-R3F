import {
    OrbitControls,
    useGLTF,
    useTexture,
    Center,
    Sparkles
} from '@react-three/drei'

export default function Experience() {
    const { nodes } = useGLTF('./model/portal.glb')

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
                <meshBasicMaterial color={'#3C1F6B'} />
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