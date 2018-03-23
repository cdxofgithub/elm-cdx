import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'


const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')

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
    },
    //所有商铺列表页
    {
        path: '/msite',
        component: msite,
        meta: { keepAlive: true },
    },
    //搜索页
    {
      path: '/search/:geohash',
      component: search
    },
    //商铺详情页
    {
      path: '/shop',
      component: shop
    }
  ]
}]

