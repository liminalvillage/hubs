import Vue from 'vue'
import App from './App.vue'
import modal from 'vue-js-modal'
import zircle from 'zircle'
import 'zircle/dist/zircle.css'
import Vuex from 'vuex'
import { VueFinalModal, ModalsContainer } from 'vue-final-modal'
import Router from 'vue-router'

const routes = [
  { path: '/:org/:repo', component: App },
  { path: '/:org/:repo/:file*', component: App },
  { path: '/:address', component: App }
]
Vue.use(Router)
Vue.use(Vuex)
Vue.use(modal)

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

const router = new Router({ routes, mode: 'history' })

new Vue({
  store,
  modal,
  router,
  VueFinalModal,
  ModalsContainer,
  render: h => h(App)
}).$mount('#app')
