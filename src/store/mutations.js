import {
  SAVE_GEOHASH,
  RECORD_ADDRESS,
} from './mutation-types'

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
  }
}
