const { palette } = require('./src/theme/colors.js');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-mode="dark"]'],
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				// shadcn semantic tokens (CSS variable based)
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',

				// Custom palette (direct hex classes: primary-400, secondary-300, etc.)
				primary: palette.primary,
				secondary: palette.secondary,
				sepia: palette.sepia,
				accent: palette.accent,
				success: palette.success,
				info: palette.info,
				warning: palette.warning,
				danger: palette.danger,
			},
			screens: {
				'3xl': '1920px',
			},
			fontFamily: {
				exo2: ['var(--font-exo-2)'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('sepia', ['[data-mode="sepia"] &']);
		}),
	],
};
