/*
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:48
 * @LastEditTime: 2020-10-28 17:27:23
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\store\index.js
 */
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
    asideInfo: JSON.parse(sessionStorage.getItem('asideInfo')) || [],
    asideInfoIds: JSON.parse(sessionStorage.getItem('asideInfoIds')) || [],
    successStatus: false,
    rentApprovalNum: 0,
    letterContractId: '',


  },
  mutations: {
    // 修改token，并将token存入localStorage
    /*     changeLogin (state, user) {
          state.Authorization = user.Authorization;
          localStorage.setItem('Authorization', user.Authorization);
        }, */
    setRoles(state, roles) {
      state.roles = roles
      sessionStorage.setItem('roles', roles)
    },
    setUserId(state, userId) {
      state.userId = userId
      sessionStorage.setItem('userId', userId)
    },
    setPersonName(state, personName) {
      state.personName = personName
      sessionStorage.setItem('personName', personName)
    },
    setAsideInfo(state, asideInfo) {
      state.asideInfo = asideInfo
      sessionStorage.setItem('asideInfo', JSON.stringify(asideInfo))
    },
    setAsideInfoIds(state, asideInfoIds) {
      state.asideInfoIds = asideInfoIds
      sessionStorage.setItem('asideInfoIds', JSON.stringify(asideInfoIds))
    },

    setSuccessStatus(state, successStatus) {
      state.successStatus = successStatus
    },
    
    setRentApprovalNum(state, rentApprovalNum) {
      state.rentApprovalNum = rentApprovalNum
    },
    setLetterContractId(state, contractId) {
      state.letterContractId = contractId
    },

  },

  getters: {
    // getUserName: (state, getters) => {
    //   return state.personName
    // }
  }
});

export default store;
