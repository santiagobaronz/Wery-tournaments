import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],

	theme: {
		screens: {
			sm: '400px',
			md: '650px',
			lg: '1000px',
			xl: '1400px',
		},
		container: {
			center: true,
		},
		colors: {
			'main-bg': '#212528',
			'bg-highlighted': '#2A2D30',
			'text-color': '#d2d3e0bf',
			'white': "#FFF",
			'pink': 'hsl(270, 55%, 43%)',
			'blue': 'hsl(220, 80%, 55%)',
			'cyan': 'hsl(180, 50%, 44%)',
			'green': 'hsl(152, 38%, 42%)',
			'yellow': 'hsl(44, 74%, 52%)',
			'red': 'hsl(1, 62%, 44%)',
			'red-error': '#F8D7DB'
		}
	},
	plugins: [],
}
export default config
