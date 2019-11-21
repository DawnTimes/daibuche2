import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
  state: {
    // 存储token
    // Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    roles: sessionStorage.getItem('roles') || '',
    userId: sessionStorage.getItem('userId') || '',
    personName: sessionStorage.getItem('personName') || '',
    asideInfo: JSON.parse(sessionStorage.getItem('asideInfo'))||[],
    asideInfoIds:JSON.parse(sessionStorage.getItem('asideInfoIds'))||[]


  },
  mutations: {
    // 修改token，并将token存入localStorage
/*     changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }, */
    setRoles (state, roles) {
      state.roles = roles
      sessionStorage.setItem('roles', roles)
    },
    setUserId (state, userId) {
      state.userId = userId
      sessionStorage.setItem('userId', userId)
    },
    setPersonName (state, personName) {
      state.personName = personName
      sessionStorage.setItem('personName', personName)
    },
    setAsideInfo (state, asideInfo) {
      state.asideInfo = asideInfo
      sessionStorage.setItem('asideInfo', JSON.stringify(asideInfo))
    },
    setAsideInfoIds(state, asideInfoIds){
      state.asideInfoIds = asideInfoIds
      sessionStorage.setItem('asideInfoIds', JSON.stringify(asideInfoIds))
    }
  }
});
 
export default store;