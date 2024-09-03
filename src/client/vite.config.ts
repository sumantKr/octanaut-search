import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vitejs.dev/config/
export default ({ mode }:any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.debug("🚀 ~ process.env :", process.env.VITE_API_URL )
  
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api/v1": process.env.VITE_API_URL as string,
        changeOrigin:"true"
      }
    }
  })
}
