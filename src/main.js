// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './router'
import VueRouter from 'vue-router'
import './config/rem'
import FastClick from 'fastclick'

Vue.config.productionTip = false

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
