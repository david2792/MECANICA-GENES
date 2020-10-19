import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
//axios.defaults.baseURL='http://localhost:3000/api/'
axios.defaults.baseURL='http://192.168.0.106:3000/api/' // red local
//axios.defaults.baseURL='http://192.168.1.181:3000/api/'

new Vue({
  router,
  store,
  render: h => h(App)
  // es una prueba
}).$mount('#app')
