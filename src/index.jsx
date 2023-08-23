import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        flat
        camera={{
            fov: 55,
            zoom: 0.95,
            near: 0.1,
            far: 200,
            position: [-3, 1.5, -4]
        }}
    >
        <Experience />
    </Canvas>
)