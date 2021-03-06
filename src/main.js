import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import closable from './directives/closable'
import AppGlobal from "@/mixins/AppGlobal";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import vuetify from './plugins/vuetify';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.directive('closable', closable)
export let eventEmitter = new Vue();
Vue.config.productionTip = false
// I can use here axios
Vue.prototype.$GET_API_URL = 'https://data.jsdelivr.com/v1';
Vue.prototype.$SEARCH_API_URL = 'https://registry.npmjs.org/-/v1';

Vue.mixin(AppGlobal);
new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
