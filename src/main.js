import Vue from 'vue'
import App from './App.vue'
import router from './router';

// Importar Bootstrap y BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Importar los archivos CSS de Bootstrap y BootstrapVue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Hacer que BootstrapVue esté disponible globalmente
Vue.use(BootstrapVue)
// Si deseas usar los iconos de BootstrapVue, también puedes incluirlo:
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
