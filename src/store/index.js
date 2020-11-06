/*
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:48
 * @LastEditTime: 2020-11-06 14:17:47
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
    dropCol: JSON.parse(localStorage.getItem('dropCol')) || [
      { label: '承租人/牌照商', prop: 'name' },
      { label: '合同编号', prop: 'contractNumber'},
      { label: '合同名称', prop: 'contractName' },
      { label: '合同状态', prop: 'contractNormalStatus' },
      { label: '合同类型', prop: 'contractType' },
      { label: '上牌地', prop: 'cityName' },
      { label: '是否限牌', prop: 'isLimitLicence' },
      { label: '是否租赁公司', prop: 'isGalcCompany' },
      { label: '期数', prop: 'nper' },
      { label: '租赁方式', prop: 'leaseWay' },
      { label: '车辆数量', prop: 'num' },
      { label: '起租日', prop: 'batchStartingDate' },
      { label: '支付日', prop: 'payDate' },
      { label: '核销状态', prop: 'repaymentStatus' },
      { label: '应收金额', prop: 'dueAmount' },
      { label: '应收本金', prop: 'duePrincipal' },
      { label: '应收利息', prop: 'dueinterest' },
      { label: '应收管理费', prop: 'dueManagementFee' },
      { label: '应收手续费', prop: 'dueCommission' },
      { label: '已收金额', prop: 'receivedAmount' },
      { label: '已收本金', prop: 'receivedPrincipal' },
      { label: '已收利息', prop: 'receivedInterest' },
      { label: '已收管理费', prop: 'receivedManagementFee' },
      { label: '已收手续费', prop: 'receivedCommission' },
      { label: '未收金额', prop: 'outstandingAmount' },
      { label: '未收本金', prop: 'outstandingPrincipal' },
      { label: '未收利息', prop: 'outstandingInterest' },
      { label: '未收管理费', prop: 'outstandingManagementFee' },
      { label: '未收手续费', prop: 'outstandingCommission' },
    ],


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

    setDropCol(state, dropCol) {
      state.dropCol = dropCol;
      localStorage.setItem('dropCol', JSON.stringify(dropCol))
    }

  },

  getters: {
    // getUserName: (state, getters) => {
    //   return state.personName
    // }
  }
});

export default store;
