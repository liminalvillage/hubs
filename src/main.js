import Vue from 'vue'
import App from './App.vue'
import zircle from 'zircle'
import 'zircle/dist/zircle.css'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    language: 'en'
  },
  mutations: {
    setLanguage (state, language) {
      state.language = language
    }
  }
})
Vue.use(zircle)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
