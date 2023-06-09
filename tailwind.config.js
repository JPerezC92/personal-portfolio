const { withTV } = require('tailwind-variants/transformer');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
	darkMode: ['class', '[data-mode="dark"]'],
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					base: '#20e4c2',
					50: '#dafffa',
					100: '#b3f8ec',
					200: '#88f2e0',
					300: '#5decd3',
					400: '#32e6c7',
					500: '#19cdae',
					600: '#089f87',
					700: '#007260',
					800: '#00453a',
					900: '#001913',
					950: '#000813',
				},

				secondary: {
					base: '#FF8A5B',
					50: '#ffebde',
					100: '#ffc7b0',
					200: '#ffa47f',
					300: '#ff804d',
					400: '#fe5c1b',
					500: '#e54302',
					600: '#b33300',
					700: '#812400',
					800: '#4f1400',
					900: '#200400',
				},

				sepia: {
					base: '#E9D8A5',
					50: '#fdf6e3',
					100: '#f1e4bf',
					200: '#e6d399',
					300: '#dcc171',
					400: '#d2af4a',
					500: '#b89631',
					600: '#8f7425',
					700: '#665319',
					800: '#3d320c',
					900: '#161100',
				},

				accent: {
					base: '#8B26C0',
					50: '#f9e8ff',
					100: '#e3bef6',
					200: '#ce94ec',
					300: '#b86ae3',
					400: '#a43fd9',
					500: '#8b26c0',
					600: '#6c1c96',
					700: '#4e136c',
					800: '#2f0b43',
					900: '#12011b',
				},

				success: {
					base: '#2ef09f',
					50: '#dcfff2',
					100: '#b2fbdd',
					200: '#84f7c7',
					300: '#55f3b3',
					400: '#29f09d',
					500: '#0fd683',
					600: '#02a765',
					700: '#007748',
					800: '#00482a',
					900: '#001a0b',
				},

				info: {
					base: '#20A4F3',
					50: '#dcf7ff',
					100: '#afe2ff',
					200: '#82cefa',
					300: '#53baf7',
					400: '#25a6f3',
					500: '#0c8dda',
					600: '#006daa',
					700: '#004e7b',
					800: '#002f4d',
					900: '#00121f',
				},

				warning: {
					base: '#FF9F1C',
					50: '#fff3da',
					100: '#ffdfae',
					200: '#ffc97d',
					300: '#ffb44b',
					400: '#ff9e1a',
					500: '#e68400',
					600: '#b36700',
					700: '#814a00',
					800: '#4f2b00',
					900: '#1f0d00',
				},

				danger: {
					base: '#E71D36',
					50: '#ffe4e8',
					100: '#fdb8c0',
					200: '#f58b97',
					300: '#ef5d6f',
					400: '#e93046',
					500: '#cf162d',
					600: '#a20e22',
					700: '#740818',
					800: '#48020d',
					900: '#1f0003',
				},
			},
			screens: {
				'3xl': '1920px',
			},
			fontFamily: {
				exo2: ['var(--font-exo-2)'],
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('sepia', ['[data-mode="sepia"] &']);
		}),
	],
});
