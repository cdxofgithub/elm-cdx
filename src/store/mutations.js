import {SAVE_GEOHASH} from './mutation-types'

export default {
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash 
  }
}