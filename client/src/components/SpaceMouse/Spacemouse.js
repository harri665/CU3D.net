import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Stars } from '@react-three/drei';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import * as THREE from 'three';

// Space Mouse 3D Model Component
const SpaceMouseModel = ({ texturePath }) => {
  const { scene } = useGLTF('/models/SpaceMouse.glb'); // Load the 3D model
  const texture = useTexture(texturePath); // Load texture using the provided path
  const modelRef = useRef();

  // Apply metallic material to the model's material
  useEffect(() => {
    if (scene && texture) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: texture, // Apply texture
            metalness: 0.9, // Set metalness to full (1.0 for metallic effect)
            roughness: 0.2, // Set roughness for a shiny look (lower value is shinier)
            envMapIntensity: 1, // Optionally adjust environment map intensity for reflection
            color: 0xaaaaaa, // Optional: You can set a base color (gray metallic look)
          });
          child.material.needsUpdate = true;
        }
      });
    }
  }, [scene, texture]);

  // Rotate the model on each frame for the specific instance of this component
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
    }
  });

  return <primitive ref={modelRef} object={scene.clone()} scale={0.6} />; // Clone the scene for each canvas
};

const SpaceMouseAdPage = () => {
  const [spaceMouses, setSpaceMouses] = useState([]); // State to store space mouses
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

  return (
    <div className='min-h-screen bg-gradient-to-br w-full from-black via-purple-900 to-blue-900 text-white relative overflow-hidden'>
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
      <section className='relative z-10 text-center py-16'>
        <h1 className='text-5xl font-extrabold mb-4 tracking-wide animate-pulse'>
          Experience the Future with the Space Mouse
        </h1>
        <p className='text-xl font-light mb-10 animate-fadeInSlow'>
          Unlock unparalleled precision and control in 3D design with the Space
          Mouse, crafted for professionals and enthusiasts alike.
        </p>

        {/* Canvas for 3D Model with Text Overlay and Rounded Corner Border */}
        <div className='relative w-full md:w-3/4 h-[40vh] mx-auto'>
          <div className='relative rounded-3xl p-2 w-full h-full border-4 border-transparent border-t border-r border-b border-l border-blue-500'>
            <Canvas className='rounded-3xl'>
              <ambientLight intensity={0.3} color={'#3A3A98'} />
              <pointLight
                position={[10, 10, 10]}
                intensity={1500}
                color={'#6B8EFC'}
              />
              <pointLight
                position={[-10, -10, -10]}
                intensity={2500}
                color={'#3046F0'}
              />
              <OrbitControls enableZoom={false} />
              <SpaceMouseModel texturePath='/qrcodes/1f4dce43-f021-4883-b380-0c4c0083373a.png' />{' '}
              {/* Default texture */}
            </Canvas>
          </div>

          {/* "Click Here to Get Yours" Text */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <button
              onClick={scrollToNextSection}
              className='text-white bg-purple-800 hover:bg-purple-900 text-lg font-semibold px-6 py-2 rounded-full shadow-lg transition transform hover:scale-105'>
              Click Here to Get Yours
            </button>
          </div>

          {/* Rounded Corner Border */}
          <div className='absolute inset-0 rounded-3xl border border-white pointer-events-none border-opacity-30'></div>
        </div>
      </section>
      {/* Space Mouse Features */}
      <section className='py-16 relative z-10' ref={nextSectionRef}>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-10'>
            Why Choose the Space Mouse?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <div className='p-6 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg hover:scale-105 transform transition duration-300'>
              <img
                src='/path/to/precision-control.jpg'
                alt='Precision Control'
                className='w-full h-48 object-cover rounded-lg mb-4'
              />
              <h3 className='text-2xl font-semibold mb-2'>Precision Control</h3>
              <p className='font-light text-gray-300'>
                Gain unmatched control with 6 degrees of freedom, allowing you
                to navigate complex 3D environments effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='p-6 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg hover:scale-105 transform transition duration-300'>
              <img
                src='/path/to/ergonomic-design.jpg'
                alt='Ergonomic Design'
                className='w-full h-48 object-cover rounded-lg mb-4'
              />
              <h3 className='text-2xl font-semibold mb-2'>Ergonomic Design</h3>
              <p className='font-light text-gray-300'>
                Designed to fit comfortably in your hand for hours of
                stress-free use, enhancing your productivity in every project.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='p-6 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg hover:scale-105 transform transition duration-300'>
              <img
                src='/path/to/customizable-buttons.jpg'
                alt='Customizable Buttons'
                className='w-full h-48 object-cover rounded-lg mb-4'
              />
              <h3 className='text-2xl font-semibold mb-2'>
                Customizable Buttons
              </h3>
              <p className='font-light text-gray-300'>
                Program the buttons to execute your most-used commands with a
                single click, enhancing workflow efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Space Mouse Features */}
      <section className='py-16 relative z-10' ref={nextSectionRef}>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-10'>
            Available Space Mouses
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {checkedInMouses.map((mouse, index) => (
              <Link
                to={`/space-mouse/${mouse.id}`} // Navigate to the space mouse detail page
                key={mouse.id}
                className='p-6 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg hover:scale-105 transform transition duration-300'>
                <div className='relative h-48'>
                  <Canvas key={`canvas-${index}`} className='rounded-lg'>
                    <ambientLight intensity={0.3} color={'#3A3A98'} />
                    <pointLight
                      position={[10, 10, 10]}
                      intensity={1500}
                      color={'#6B8EFC'}
                    />
                    <pointLight
                      position={[-10, -10, -10]}
                      intensity={2500}
                      color={'#3046F0'}
                    />
                    <OrbitControls enableZoom={false} />
                    <SpaceMouseModel
                      texturePath={
                        mouse.texture ||
                        '/qrcodes/1f4dce43-f021-4883-b380-0c4c0083373a.png'
                      }
                    />{' '}
                    {/* Pass texture path */}
                  </Canvas>
                </div>
                <h3 className='text-2xl font-semibold mt-4'>{mouse.name}</h3>
                <p className='font-light text-gray-300'>
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
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-16 text-center bg-gradient-to-r from-blue-800 to-purple-800 relative z-10'>
        <h2 className='text-4xl font-bold mb-4 animate-pulse'>
          Take Your 3D Design to the Next Level
        </h2>
        <p className='text-lg font-light mb-6 animate-fadeInSlow'>
          Ready to elevate your 3D modeling experience? Check out the Space
          Mouse now!
        </p>
        <a
          href='/checkout'
          className='px-8 py-3 text-lg font-semibold bg-white text-gray-900 rounded-lg shadow-md hover:bg-gray-200 transition'>
          Get Yours Today
        </a>
      </section>

      {/* Nebula glow effect */}
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-800 via-transparent to-blue-900 opacity-30 pointer-events-none' />
    </div>
  );
};

// Preload GLTF model
useGLTF.preload('/models/SpaceMouse.glb');

export default SpaceMouseAdPage;
