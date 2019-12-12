import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './plugins/element.js'
import VueResource from 'vue-resource'
import qiye from './views/qiye.vue'
import list from './views/list.vue'
Vue.use(VueResource)

Vue.component('qiye', qiye)
Vue.component('list', list)
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
