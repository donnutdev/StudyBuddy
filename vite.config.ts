import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	worker: {
		rollupOptions: {
			output: {
				format: "iife",
				inlineDynamicImports: true,
			},
		},
	},
});
