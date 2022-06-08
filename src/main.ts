import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createPinia, Store } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

function resetStore({ store }:{store:Store}) {
    const initialState = {
      foregrounds: [],
      backgrounds: [],
    }
    store.$reset = () => store.$patch(JSON.parse(JSON.stringify(initialState)))
  }
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(resetStore)

createApp(App).use(pinia).mount('#app')
