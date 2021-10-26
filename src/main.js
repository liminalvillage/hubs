import Vue from 'vue'
import App from './App.vue'
import modal from 'vue-js-modal'
import zircle from 'zircle'
import 'zircle/dist/zircle.css'
import Vuex from 'vuex'
import { VueFinalModal, ModalsContainer } from 'vue-final-modal'
import { Ad4mClient } from '@perspect3vism/ad4m'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import Router from 'vue-router'

const uri = 'ws://localhost:4000/graphql'
const apolloClient = new ApolloClient({
  link: new WebSocketLink({
    uri,
    options: { reconnect: true }
  }),
  cache: new InMemoryCache({ resultCaching: false, addTypename: false }),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'no-cache' },
    query: { fetchPolicy: 'no-cache' }
  }
})
var ad4mClient = new Ad4mClient(apolloClient)

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
Vue.use(ad4mClient)
Vue.config.productionTip = false

const router = new Router({ routes, mode: 'history' })

new Vue({
  store,
  modal,
  router,
  VueFinalModal,
  ModalsContainer,
  ad4mClient,
  render: h => h(App)
}).$mount('#app')
