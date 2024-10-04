import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const ContactPage = () => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Handle form submission (e.g., send data to server or email service)
    reset(); // Reset form fields after submission
  };

  // Variants for Framer Motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
          Get in <span className='text-indigo-500'>Touch</span>
        </motion.h1>
        {/* Subtitle */}
        <motion.p
          className='text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}>
          We'd love to hear from you! Whether you have questions, suggestions, or just want to say hello, feel free to reach out.
        </motion.p>

        {/* Contact Form */}
        <motion.div
          className='container mx-auto px-4 max-w-lg'
          variants={containerVariants}
          initial='hidden'
          animate='visible'>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-8 space-y-6'
            variants={itemVariants}>
            {/* Name Field */}
            <div>
              <label className='block text-left text-gray-200 mb-2'>Name</label>
              <input
                type='text'
                {...register('name', { required: 'Name is required' })}
                className='w-full px-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
              {errors.name && (
                <p className='text-left text-red-500 text-sm mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className='block text-left text-gray-200 mb-2'>Email</label>
              <input
                type='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className='w-full px-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
              {errors.email && (
                <p className='text-left text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Subject Field */}
            <div>
              <label className='block text-left text-gray-200 mb-2'>Subject</label>
              <input
                type='text'
                {...register('subject', { required: 'Subject is required' })}
                className='w-full px-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
              {errors.subject && (
                <p className='text-left text-red-500 text-sm mt-1'>
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className='block text-left text-gray-200 mb-2'>Message</label>
              <textarea
                rows='5'
                {...register('message', { required: 'Message is required' })}
                className='w-full px-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              ></textarea>
              {errors.message && (
                <p className='text-left text-red-500 text-sm mt-1'>
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type='submit'
              className='w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              Send Message
            </motion.button>

            {/* Success Message */}
            {isSubmitSuccessful && (
              <motion.p
                className='text-green-500 mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}>
                Thank you for your message! We'll get back to you soon.
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </section>

      {/* Join Our Discord Section */}
      <section className='relative z-10 text-center py-20 px-4 bg-gradient-to-br from-indigo-700 to-purple-700'>
        <motion.h2
          className='text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight text-white'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}>
          Join Our <span className='text-indigo-300'>Discord</span>
        </motion.h2>
        <motion.p
          className='text-lg md:text-xl font-light mb-10 text-gray-200 max-w-xl mx-auto'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}>
          Connect with other 3D enthusiasts, stay up to date with club events, and collaborate with fellow members on exciting projects. Our Discord community is the perfect place to share ideas and grow together!
        </motion.p>
        <motion.a
          href='https://discord.com/invite/YOUR_DISCORD_INVITE_LINK'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block px-10 py-4 text-lg font-medium bg-white text-gray-900 rounded-full shadow-md hover:bg-gray-200 transition'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}>
          Join Discord
        </motion.a>
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

export default ContactPage;
