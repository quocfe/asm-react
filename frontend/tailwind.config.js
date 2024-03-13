/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#242526',
				secondary: '#49B2FD',
				active: '#282E3A',
				hover: '#3A3B3C',
				shadow_2: 'rgba(0, 0, 0, 0.2)',
				shadow_1: 'rgba(1, 1, 0, 1)',
				borderColor: '#2F3031',
			},
		},
	},
	plugins: [require('daisyui')],
};
