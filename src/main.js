import Vue from 'vue'
import App from './App.vue'
import store from './store'

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

import './plugins/antd.js'

Vue.config.productionTip = false

// Vue.use(Antd)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
