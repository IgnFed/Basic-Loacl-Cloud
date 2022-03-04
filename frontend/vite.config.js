import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({

//   plugins: [react()]
// })

export default (ctx)=>{
  return defineConfig({
    define:{
      process:{
        env: {
          API_URL: "http://localhost:3001"
        }
      }
    },
    server:{
      host: true
    },
    plugins:[react()]
  })
}