
import Vue from 'vue';

import axios from 'axios';
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI
import App from './App.vue'
import router from './router'

// import Vue from 'vue';
// import hljs from 'highlight.js';
// import 'highlight.js/styles/vs2015.css';

// Vue.directive('highlight', function (el) {
//   let blocks = el.querySelectorAll('pre code');
//   for (let i = 0; i < blocks.length; i++) {
//     hljs.highlightBlock(blocks[i]);
//   }
// })



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
