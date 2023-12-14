import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false, 
    Permission:"",
    username:"",
    user_id:"",
    participated_clubs:[],
    nickname:"",
    description:"",
    avatar:""
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
      console.log(status)
    },
    setPermission(state, status) {
      state.Permission = status;
      console.log(status)
    },    
    setUsername(state, status) {
      state.username = status.username?status.username:"";
      state.user_id = status.user_id?status.user_id:"";
      state.nickname = status.nickname?status.nickname:"";
      state.description = status.description?status.description:"";
      state.avatar = status.avatar?status.avatar:"";
      console.log(status)
    },
    logout(state){
      state.username = "";
      state.user_id = "";
      state.isAuthenticated = "";
      state.Permission = "";
      state.nickname = "";
      state.description = "";
      state.avatar=""
    }

  },
  actions: {
    setAuthentication({ commit }, status) {
      commit('setAuthentication', status);
    },
    setPermission({ commit }, status) {
      commit('setPermission', status);
    },
    setUsername({ commit }, status) {
      commit('setUsername', status);
    },
    logout({commit}){
      commit('logout');
    }

  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    Permission: state=>state.Permission,
    username:state=>state.username,
    user_id:state=>state.user_id,
    nickname:state=>state.nickname,
    description:state=>state.description,
    avatar:state=>state.avatar
  }
});