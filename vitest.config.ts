import react from '@vitejs/plugin-react';
import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['vitestSetup.ts'],
		exclude: [...configDefaults.exclude, '**/old/**', '**/e2e/**'],
		alias: [
			{
				find: '@/projects',
				replacement: path.resolve(__dirname, './src/projects'),
			},
			{
				find: '@/theme',
				replacement: path.resolve(__dirname, './src/theme'),
			},
			{
				find: '@/shared',
				replacement: path.resolve(__dirname, './src/shared'),
			},
			{ find: '@', replacement: path.resolve(__dirname) },
		],
	},
});
