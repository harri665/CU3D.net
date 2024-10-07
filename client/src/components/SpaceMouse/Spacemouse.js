import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stars } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { a, useSpring } from '@react-spring/three';

// Extend the animated group component for 3D objects
const AnimatedGroup = a.group;

// Space Mouse 3D Model Component
const SpaceMouseModel = ({ color, rotate = true }) => {
  const { scene } = useGLTF('/models/SpaceMouse.glb');
  const modelRef = useRef();

  // State for hover effect
  const [hovered, setHovered] = useState(false);

  // Apply color to the model
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: color || '#ffffff',
            metalness: 0.5,
            roughness: 0.5,
          });
          child.material.needsUpdate = true;
        }
      });
    }
  }, [scene, color]);

  // Rotate the model and make it responsive to hover
  useFrame(() => {
    if (rotate && modelRef.current) {
      modelRef.current.rotation.y += hovered ? 0.02 : 0.005;
    }
  });

  // Animation for scale on hover
  const { scale } = useSpring({
    scale: hovered ? 0.7 : 0.6,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <AnimatedGroup
      ref={modelRef}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}>
      <primitive object={scene.clone()} />
    </AnimatedGroup>
  );
};

const SpaceMouseAdPage = () => {
  const [spaceMouses, setSpaceMouses] = useState([]);
  const nextSectionRef = useRef(null);

  // Function to fetch space mouses from the API
  useEffect(() => {
    const fetchSpaceMouses = async () => {
      try {
        const response = await fetch('/api/space-mouses');
        const data = await response.json();
        setSpaceMouses(data);
      } catch (error) {
        console.error('Error fetching space mouses:', error);
      }
    };

    fetchSpaceMouses();
  }, []);

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter the space mouses to only display those that are checked in
  const checkedInMouses = spaceMouses.filter(
    (mouse) => mouse.status === 'checked_in',
  );

  // Variants for Framer Motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden font-sans'>
      {/* Stars in the background */}
      <div className='absolute top-0 left-0 w-full h-full z-0'>
        <Canvas className='absolute top-0 left-0 w-full h-full'>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
          />
        </Canvas>
      </div>

      {/* Hero Section */}
      <section className='relative z-10 text-center py-20 px-4'>
        <motion.h1
          className='text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          Experience the Future with the{' '}
          <span className='text-indigo-500'>Space Mouse</span>
        </motion.h1>
        <motion.p
          className='text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}>
          Unlock unparalleled precision and control in 3D design with the Space
          Mouse, crafted for professionals and enthusiasts alike.
        </motion.p>

        {/* Canvas for 3D Model with Text Overlay and Rounded Corner Border */}
        <div className='relative w-full md:w-3/4 h-[50vh] mx-auto'>
          <div className='relative rounded-3xl p-2 w-full h-full bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg'>
            <Canvas
              className='rounded-3xl'
              gl={{ preserveDrawingBuffer: true }}>
              <ambientLight intensity={0.5} color={'#ffffff'} />
              <directionalLight
                position={[0, 10, 10]}
                intensity={1}
                color={'#ffffff'}
              />
              <OrbitControls enableZoom={false} />
              <SpaceMouseModel color='#929292' rotate={true} />
            </Canvas>
          </div>

          {/* "Click Here to Get Yours" Button */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <motion.button
              onClick={scrollToNextSection}
              className='text-white bg-indigo-600 bg-opacity-90 hover:bg-indigo-700 text-lg font-medium px-8 py-3 rounded-full shadow-lg transition transform'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Click Here to Get Yours
            </motion.button>
          </div>

          {/* Rounded Corner Border */}
          <div className='absolute inset-0 rounded-3xl border border-white border-opacity-20 pointer-events-none'></div>
        </div>
      </section>

      {/* Available Space Mice */}
      <section className='py-20 relative z-10'>
        <div className='container mx-auto px-4'>
          <motion.h2
            className='text-4xl md:text-5xl font-bold text-center mb-16'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            Available Space Mice
          </motion.h2>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-3 gap-12'
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}>
            {checkedInMouses.map((mouse, index) => (
              <Link
                to={`/space-mouse/${mouse.id}`}
                key={mouse.id}
                className='p-8 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transform transition duration-300 hover:scale-105'>
                <motion.div
                  className='relative h-48 mb-6'
                  variants={itemVariants}>
                  <img
                    src={"/img/SpaceMouse.png"}
                    alt={mouse.name}
                    className='w-full h-full object-contain rounded-lg'
                  />
                </motion.div>
                <h3 className='text-2xl font-semibold mb-2'>{mouse.name}</h3>
                <p className='font-light text-gray-300 mb-1'>
                  Status: {mouse.status.replace('_', ' ')}
                </p>
                <p className='font-light text-gray-300'>
                  Last Checked Out:{' '}
                  {mouse.lastCheckedOutDate
                    ? new Date(mouse.lastCheckedOutDate).toLocaleDateString()
                    : 'Never'}
                </p>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Preload GLTF model
useGLTF.preload('/models/SpaceMouse.glb');

export default SpaceMouseAdPage;
