import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useGLTF } from '@react-three/drei';

const CustomObject = ({ isHeader }) => {
  const meshRef = useRef();
  const { camera } = useThree();
  const { scene } = useGLTF('/models/CU3D.gltf');

  useEffect(() => {
    if (!isHeader) {
      gsap.fromTo(
        meshRef.current.position,
        { y: 10 },
        { y: 0, ease: 'bounce.out', duration: 1.5 }
      );

      gsap.fromTo(
        meshRef.current.rotation,
        { x: Math.PI / 2, y: 0, z: Math.PI * 3 },
        { x: 0, y: Math.PI * 2, z: Math.PI / 6, ease: 'power3.out', duration: 1.5 }
      );

      gsap.fromTo(
        camera.position,
        { z: 10 },
        { z: 5, ease: 'power3.out', duration: 1.5 }
      );

      gsap.fromTo(
        meshRef.current.rotation,
        { y: Math.PI / 3 },
        {
          y: (Math.PI * 2) + Math.PI / 3,
          repeat: -1,
          duration: 10,
          ease: 'power3.inOut',
        }
      );
    } else {
      gsap.to(meshRef.current.rotation, { y: 0, x: 0, z: 0, duration: 0.5 });
      gsap.to(camera.position, { z: 2, ease: 'power3.out', duration: 1 });
    }
  }, [camera, isHeader]);

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={[0.1, 0.1, 0.1]}
      position={[0, 0, 0]}
    />
  );
};

const AnimatedCube = () => {
  const [isHeader, setIsHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeader(true);
      } else {
        setIsHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isHeader) {
      gsap.to('.header-container', {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        ease: 'power3.out',
        duration: 0.5,
      });

      gsap.to('.canvas-container', {
        height: '1px',
        ease: 'power3.out',
        duration: 0,
      });
    } else {
      gsap.to('.header-container', {
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100vh',
        paddingTop: '0vh',
        ease: 'power3.out',
        duration: 0.5,
      });

      gsap.to('.canvas-container', {
        height: '100vh',
        ease: 'power3.out',
        duration: 0.5,
      });
    }
  }, [isHeader]);

  return (
    <>
      <div className={` pointer-events-none fixed w-full transition-all duration-500 top-0 h-[100vh] left-0 ease-in-out ${isHeader ? 'header-container fixed top-0 left-0 z-50' : 'screen-container abolsute'}`}>
        {/* Background Canvas */}
        <div className="fixed top-0 left-0 w-full h-full z-0 canvas-container">
          <Canvas>
            {/* Space-Themed Lighting */}
            <ambientLight intensity={10} color="#0d1b2a" /> {/* Very dark blue for the vastness of space */}
            <pointLight
              position={[10, 10, 10]}
              intensity={1500}
              color="#87CEEB" // Cool light blue, like distant stars
            />
            <pointLight
              position={[-10, -10, -10]}
              intensity={500}
              color="#b0d2fb" // Deep purple, to add a sense of mystery
            />
            <spotLight
              position={[0, 10, 5]}
              angle={0.8}
              intensity={1000}
              penumbra={0.9}
              color="#CFB87C" // Bright white to mimic strong light source like a star
              castShadow
              shadowMapWidth={1024}
              shadowMapHeight={1024}
              shadowCameraFar={20}
              shadowCameraLeft={-10}
              shadowCameraRight={10}
              shadowCameraTop={10}
              shadowCameraBottom={-10}
            />
            <CustomObject isHeader={isHeader} />
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default AnimatedCube;
