import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const BackgroundObject = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Ensure mountRef is not null before appending
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 20); // Soft white light
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 2.5).normalize();
    scene.add(directionalLight);

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/models/SpaceMouse.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Adjust the scale if needed
        scene.add(model);

        // Apply metal material to all meshes in the model
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xffffff, // Gray color for the metal
              metalness: 1,    // Full metallic
              roughness: 0.4,  // Some roughness for realism
            });
          }
        });

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);

          // Rotate the model
          model.rotation.y += 0.01;

          // Render the scene
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the GLB model', error);
      },
    );

    // Position the camera
    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(0, -1, 0);

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);

      // Ensure mountRef exists and has children before removing the renderer DOM element
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
  <div ref={mountRef} className="fixed inset-0 -z-10 bg-gradient-to-t from-[#182130] to-[#000000]">
    {/* Stars effect */}
    <div className="absolute inset-0 bg-stars bg-repeat opacity-40" />
  </div>
);
;
};

export default BackgroundObject;
