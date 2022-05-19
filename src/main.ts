import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@r/index'
import naive from 'naive-ui'
import 'vfonts/Lato.css'
import { setupStore } from '@/store'
import '@/assets/style/main.scss'
// import { setupI18n } from '@/locales/setupI18n'

const init = async () => {
  const app = createApp(App)
  app.use(naive)
  setupRouter(app)
  // setupI18n(app)
  setupStore(app)
  app.mount('#app')
}

init()
