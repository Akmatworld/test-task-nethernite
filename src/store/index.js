import Vue from 'vue'
import Vuex from 'vuex'
import npmPackages from './npmPackages';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      npmPackages,
  }
})
