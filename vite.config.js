
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
		proxy: {
			'/api': {
				target: 'https://backend.72.60.83.68.nip.io',
				changeOrigin: true,
			},
			'/storage': {
				target: 'https://backend.72.60.83.68.nip.io',
				changeOrigin: true,
			},
		},
	},
});
