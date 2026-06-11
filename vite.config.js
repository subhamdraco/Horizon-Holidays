import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  /**
   * Local dev: avoid CORS by proxying WordPress REST through Vite.
   * Uncomment and set target to your WP origin, then use:
   *   VITE_WORDPRESS_REST_URL=http://localhost:5173/wp-json
   * (or a dedicated path like /cms/wp-json — match `rewrite` below).
   */
  // server: {
  //   proxy: {
  //     '/wp-json': {
  //       target: 'https://your-wordpress-site.com',
  //       changeOrigin: true,
  //       secure: true,
  //     },
  //   },
  // },
})
