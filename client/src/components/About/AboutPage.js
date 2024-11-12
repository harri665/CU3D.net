import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// About Page Component
const AboutPage = () => {
  // Variants for Framer Motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
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

      {/* Main Content */}
      <section className='relative z-10 text-center py-20 px-4'>
        {/* Page Title */}
        <motion.h1
          className='text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          About <span className='text-indigo-500'>CU3D</span>
        </motion.h1>
        {/* Subtitle */}
        <motion.p
          className='text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}>
          At CU3D, we are passionate about bringing together students interested in 3D modeling, printing, and design. Our mission is to foster a collaborative community where members can learn, create, and innovate in the field of 3D technology.
        </motion.p>

        {/* Club Values */}
        <motion.div
          className='container mx-auto px-4'
          variants={containerVariants}
          initial='hidden'
          animate='visible'>
          <motion.h2
            className='text-4xl md:text-5xl font-bold text-center mb-16'
            variants={itemVariants}>
            Our Core Values
          </motion.h2>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-3 gap-12'
            variants={containerVariants}>
            {/* Value 1 */}
            <motion.div
              className='p-8 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transform transition duration-300'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <div className='mb-6'>
                {/* SVG Icon for Collaboration */}
                <svg
                  className='w-16 h-16 mx-auto text-indigo-500'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17 16l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </div>
              <h3 className='text-2xl font-semibold mb-4'>Collaboration</h3>
              <p className='font-light text-gray-300'>
                We believe in the power of teamwork and shared knowledge to help students develop portfolios, strengthen their skills, and grow together.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              className='p-8 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transform transition duration-300'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <div className='mb-6'>
                {/* SVG Icon for Innovation */}
                <svg
                  className='w-16 h-16 mx-auto text-indigo-500'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-2xl font-semibold mb-4'>Innovation</h3>
              <p className='font-light text-gray-300'>
                We encourage creativity and experimentation to push the boundaries of what's possible in 3D design and printing.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              className='p-8 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transform transition duration-300'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <div className='mb-6'>
                {/* SVG Icon for Education */}
                <svg
                  className='w-16 h-16 mx-auto text-indigo-500'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 14l9-5-9-5-9 5 9 5z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 14l6.16-3.422a12.083 12.083 0 010 6.844L12 14z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 14l-6.16 3.422a12.083 12.083 0 010-6.844L12 14z'
                  />
                </svg>
              </div>
              <h3 className='text-2xl font-semibold mb-4'>Education</h3>
              <p className='font-light text-gray-300'>
                We are dedicated to learning and teaching, providing resources and workshops for skill development.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          className='container mx-auto px-4 mt-20'
          variants={containerVariants}
          initial='hidden'
          animate='visible'>
          <motion.h2
            className='text-4xl md:text-5xl font-bold text-center mb-16'
            variants={itemVariants}>
            Our Story
          </motion.h2>
          <motion.p
            className='text-lg md:text-xl font-light max-w-4xl mx-auto leading-relaxed text-left'
            variants={itemVariants}>
            Founded in 2024, CU3D began as a small group of students passionate about 3D printing and modeling who met in an Atlas Institute motion capture course. Andrew Widner founded the club with the help of Harrison Martin and Aidan Roof, aiming to create a space for beginner and expert 3D desiners alike to learn, share, and grow.
          </motion.p>
          <motion.p
            className='text-lg md:text-xl font-light max-w-4xl mx-auto leading-relaxed text-left mt-6'
            variants={itemVariants}>
            Today, CU3D has grown into a vibrant community, hosting workshops, guest lectures, and collaborative projects. We partner with companies like Prusa Research and 3Dconnexion, as well as university departments to provide members with real-world experience and networking opportunities.
          </motion.p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className='container mx-auto px-4 mt-20'
          variants={containerVariants}
          initial='hidden'
          animate='visible'>
          <motion.h2
            className='text-4xl md:text-5xl font-bold text-center mb-16'
            variants={itemVariants}>
            Meet the Team
          </motion.h2>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-3 gap-12'
            variants={containerVariants}>
            {/* Team Member 1 */}
            <motion.div
              className='text-center'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <div className='w-40 h-40 mx-auto mb-6 rounded-full bg-white bg-opacity-10 flex items-center justify-center'>
                {/* Placeholder for Profile Picture */}
                <svg
                  className='w-20 h-20 text-gray-300'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M10 0a10 10 0 100 20 10 10 0 000-20zM8 6a2 2 0 114 0 2 2 0 01-4 0zm4 4a4 4 0 00-8 0v1h8v-1a4 4 0 000-1z'
                    clipRule='evenodd'></path>
                </svg>
              </div>
              <h3 className='text-2xl font-semibold mb-2'>Jordan Lee</h3>
              <p className='font-light text-gray-300 mb-1'>President</p>
              <p className='font-light text-gray-400 text-sm'>
                Senior in Mechanical Engineering, passionate about 3D printing.
              </p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              className='text-center'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <div className='w-40 h-40 mx-auto mb-6 rounded-full bg-white bg-opacity-10 flex items-center justify-center'>
                {/* Placeholder for Profile Picture */}
                <svg
                  className='w-20 h-20 text-gray-300'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M10 0a10 10 0 100 20 10 10 0 000-20zM8 6a2 2 0 114 0 2 2 0 01-4 0zm4 4a4 4 0 00-8 0v1h8v-1a4 4 0 000-1z'
                    clipRule='evenodd'></path>
                </svg>
              </div>
              <h3 className='text-2xl font-semibold mb-2'>Alex Martinez</h3>
              <p className='font-light text-gray-300 mb-1'>Vice President</p>
              <p className='font-light text-gray-400 text-sm'>
                Junior in Computer Science, specializing in 3D modeling software.
              </p>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              className='text-center'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <div className='w-40 h-40 mx-auto mb-6 rounded-full bg-white bg-opacity-10 flex items-center justify-center'>
                {/* Placeholder for Profile Picture */}
                <svg
                  className='w-20 h-20 text-gray-300'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M10 0a10 10 0 100 20 10 10 0 000-20zM8 6a2 2 0 114 0 2 2 0 01-4 0zm4 4a4 4 0 00-8 0v1h8v-1a4 4 0 000-1z'
                    clipRule='evenodd'></path>
                </svg>
              </div>
              <h3 className='text-2xl font-semibold mb-2'>Taylor Nguyen</h3>
              <p className='font-light text-gray-300 mb-1'>Treasurer</p>
              <p className='font-light text-gray-400 text-sm'>
                Sophomore in Electrical Engineering, manages club resources.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className='mt-20'
          variants={itemVariants}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>
            Join CU3D Today
          </h2>
          <p className='text-lg md:text-xl font-light mb-10 max-w-xl mx-auto'>
            Interested in 3D technology? Whether you're a beginner or an expert, CU3D welcomes all students eager to learn and collaborate.
          </p>
          <Link
            to='/membership'
            className='inline-block px-10 py-4 text-lg font-medium bg-white text-gray-900 rounded-full shadow-md hover:bg-gray-200 transition'>
            Become a Member
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className='py-8 text-center text-gray-400 text-sm'>
        © {new Date().getFullYear()} CU3D at University of Colorado Boulder. All rights reserved.
      </footer>

      {/* Nebula glow effect */}
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-800 via-transparent to-indigo-900 opacity-20 pointer-events-none' />
    </div>
  );
};

export default AboutPage;
