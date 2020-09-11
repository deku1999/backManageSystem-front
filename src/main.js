import Vue from 'vue'
import App from './App.vue'
import './assets/css/global.css'
import router from './router/index'
import './plugins/element.js'
import 'nprogress/nprogress.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false
Vue.use(VueQuillEditor)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
