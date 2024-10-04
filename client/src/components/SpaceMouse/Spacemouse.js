import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  useTexture,
  Stars,
} from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { a, useSpring } from '@react-spring/three';

// Extend the animated group component for 3D objects
const AnimatedGroup = a.group;

// Simplified SVG Icons
const PrecisionControlIcon = () => (
  <svg
    className="w-full h-48 mb-6"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" stroke="#ffffff" strokeWidth="4" />
    <path
      d="M32 16V32L44 44"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const ErgonomicDesignIcon = () => (
  <svg
    className="w-full h-48 mb-6"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect
      x="12"
      y="20"
      width="40"
      height="24"
      rx="12"
      stroke="#ffffff"
      strokeWidth="4"
    />
    <circle cx="32" cy="32" r="6" fill="#ffffff" />
  </svg>
);

const CustomizableButtonsIcon = () => (
  <svg
    className="w-full h-48 mb-6"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="16" width="32" height="32" stroke="#ffffff" strokeWidth="4" />
    <path
      d="M32 20V44"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M20 32H44"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

// Space Mouse 3D Model Component
const SpaceMouseModel = ({ texturePath }) => {
  const { scene } = useGLTF('/models/SpaceMouse.glb');
  const texture = useTexture(texturePath);
  const modelRef = useRef();

  // State for hover effect
  const [hovered, setHovered] = useState(false);

  // Apply metallic material to the model's material
  useEffect(() => {
    if (scene && texture) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            map: texture,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1,
            clearcoatRoughness: 0,
            reflectivity: 1,
            color: new THREE.Color('#ffffff'),
          });
          child.material.needsUpdate = true;
        }
      });
    }
  }, [scene, texture]);

  // Rotate the model and make it responsive to hover
  useFrame(() => {
    if (modelRef.current) {
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
            <Canvas className='rounded-3xl'>
              <ambientLight intensity={0.5} color={'#ffffff'} />
              <directionalLight
                position={[0, 10, 10]}
                intensity={1}
                color={'#ffffff'}
              />
              <OrbitControls enableZoom={false} />
              <SpaceMouseModel texturePath='/qrcodes/1f4dce43-f021-4883-b380-0c4c0083373a.png' />
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

      {/* Space Mouse Features */}
      <section className='py-20 relative z-10' ref={nextSectionRef}>
        <div className='container mx-auto px-4'>
          <motion.h2
            className='text-4xl md:text-5xl font-bold text-center mb-16'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            Why Choose the Space Mouse?
          </motion.h2>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-3 gap-12'
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}>
            {/* Feature 1 */}
            <motion.div
              className='p-8 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transform transition duration-300'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <PrecisionControlIcon />
              <h3 className='text-2xl font-semibold mb-4'>Precision Control</h3>
              <p className='font-light text-gray-300'>
                Gain unmatched control with 6 degrees of freedom, allowing you to
                navigate complex 3D environments effortlessly.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className='p-8 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transform transition duration-300'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <ErgonomicDesignIcon />
              <h3 className='text-2xl font-semibold mb-4'>Ergonomic Design</h3>
              <p className='font-light text-gray-300'>
                Designed to fit comfortably in your hand for hours of stress-free
                use, enhancing your productivity in every project.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className='p-8 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transform transition duration-300'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <CustomizableButtonsIcon />
              <h3 className='text-2xl font-semibold mb-4'>
                Customizable Buttons
              </h3>
              <p className='font-light text-gray-300'>
                Program the buttons to execute your most-used commands with a
                single click, enhancing workflow efficiency.
              </p>
            </motion.div>
          </motion.div>
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
                  <Canvas key={`canvas-${index}`} className='rounded-lg'>
                    <ambientLight intensity={0.5} color={'#ffffff'} />
                    <directionalLight
                      position={[0, 10, 10]}
                      intensity={1}
                      color={'#ffffff'}
                    />
                    <OrbitControls enableZoom={false} />
                    <SpaceMouseModel
                      texturePath={
                        mouse.texture ||
                        '/qrcodes/1f4dce43-f021-4883-b380-0c4c0083373a.png'
                      }
                    />
                  </Canvas>
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

      {/* Call to Action */}
      <section className='py-20 text-center bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 relative z-10'>
        <motion.h2
          className='text-4xl md:text-5xl font-bold mb-6'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          Take Your 3D Design to the Next Level
        </motion.h2>
        <motion.p
          className='text-lg md:text-xl font-light mb-10 max-w-xl mx-auto'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}>
          Ready to elevate your 3D modeling experience? Check out the Space Mouse
          now!
        </motion.p>
        <motion.a
          href='/checkout'
          className='inline-block px-10 py-4 text-lg font-medium bg-white text-gray-900 rounded-full shadow-md hover:bg-gray-200 transition'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          Get Yours Today
        </motion.a>
      </section>

      {/* Footer */}
      <footer className='py-8 text-center text-gray-400 text-sm'>
        © {new Date().getFullYear()} Space Mouse Inc. All rights reserved.
      </footer>

      {/* Nebula glow effect */}
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-800 via-transparent to-indigo-900 opacity-20 pointer-events-none' />
    </div>
  );
};

// Preload GLTF model
useGLTF.preload('/models/SpaceMouse.glb');

export default SpaceMouseAdPage;
