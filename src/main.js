import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

 import 'bootstrap/dist/js/bootstrap.bundle.min.js';
 import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.js';

import App from './App.vue'
import router from './router'
import { i18n } from './i18n/index.js'


const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;


const pinia = createPinia()
pinia.use(({store}) =>{
store.router = markRaw(router)
});
pinia.use(createPersistedState)

app.use(pinia)
app.use(router)
app.use(VueAxios, axios)
app.use(i18n)

app.mount('#app')



import "bootstrap/dist/js/bootstrap.js";