import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import router from './router/index.js'
import axios from 'axios'

const app = createApp(App);
app.use(router).use(ElementPlus).mount('#app')
app.config.globalProperties.$axios = axios.create({
  baseURL: 'http://127.0.0.1:3001/api'
})
