import {
  SAVE_GEOHASH,
  RECORD_ADDRESS,
  INIT_BUYCART,
} from './mutation-types'

import {setStore, getStore} from "../config/mUtils";

export default {
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash
  },
  [RECORD_ADDRESS](state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude,
      state.longitude = longitude
  },
  //网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART](state) {
    let initCart = getStore('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  },
}
