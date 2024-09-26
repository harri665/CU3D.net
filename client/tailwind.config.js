module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Add paths to your project files
  ],
  theme: {
    extend: {
      colors: {
        gold: '#CFB87C',
        black: '#000000',
        silver: '#A7A9AC',
        'dark-space': '#0b0d17',
        'space-purple': '#2d006b',
        'star-white': '#ffffff',
        'nebula-pink': '#ff4f81',
        'nebula-blue': '#4f81ff',
      },
      fontFamily: {
        sans: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'stars': "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png')",
        'nebula': "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png')",
      },
    },
  },
  plugins: [],
};
