module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        superGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        glowFast: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        shine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'metal-shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      perspective: {
        1000: '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'super-glow': 'superGlow 3s ease-in-out infinite',
        'glow-fast': 'glowFast 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite',
        'shine' : 'shine 2.5s linear infinite',
        'metal-shine': 'metal-shine 2s infinite linear',
        'spin': 'spin 15s linear infinite',
        'background': 'gradient 15s ease infinite',
      },

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    [require('tailwind-scrollbar-hide')],
  ],
};
