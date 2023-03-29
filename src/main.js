
import Vue from 'vue';

import axios from 'axios';
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI
import App from './App.vue'
import router from './router'




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
