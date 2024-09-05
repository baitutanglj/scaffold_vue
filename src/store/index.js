import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    sdfPath:'',
    modelPath:''
  },
  mutations:{
    setSDFPath(state,arg){
      state.sdfPath = arg
    },
    setModelPath(state,arg){
      state.modelPath = arg
    }
  },
  modules: {
    tab
  }
})
