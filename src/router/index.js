import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'


const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')

Vue.use(Router)

export default [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      redirect: '/home'
    },
    //首页城市列表
    {
      path: '/home',
      component: home
    },
    {
      path: '/city/:cityid',
      component: city
    }
  ]
}]

