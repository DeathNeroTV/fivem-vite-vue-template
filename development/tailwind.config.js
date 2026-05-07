/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	theme: {
		extend: {
			animation: {
				fadein: 'fadeIn .5s ease-in-out',
				fadeout: 'fadeOut .5s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				fadeOut: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
			},
		},
	},
	plugins: [],
}

