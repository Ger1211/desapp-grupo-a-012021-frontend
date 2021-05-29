import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/v-clipboard'
import './plugins/vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import en from './formats/en.json'
import es from './formats/es.json'
import VueI18n from 'vue-i18n'


Vue.config.productionTip = false
const i18n = new VueI18n({
  locale: store.getters.language,
  messages: {
    en,
    es
  }
})


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
