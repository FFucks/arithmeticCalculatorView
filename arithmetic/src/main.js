import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import dayjs from 'dayjs'

Vue.config.productionTip = false
Vue.prototype.dayjs = dayjs;
Vue.filter('toDateTime', (value) => {
  if (value) {
    let data = dayjs(value);
    return data.format('MM/DD/YYYY');
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
