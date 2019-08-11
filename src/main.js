import Vue from 'vue'
import store from './store/store'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
