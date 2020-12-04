/*
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:48
 * @LastEditTime: 2020-12-04 09:55:14
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
    // dropCol: [],
    tableHeader: JSON.parse(localStorage.getItem('tableHeader')) || [
      { label: '承租人/牌照商', prop: 'name', minWidth: '200px' },
      { label: '合同编号', prop: 'contractNumber', minWidth: '160px' },
      { label: '主合同编号', prop: 'parentContractNumber', minWidth: '160px' },
      { label: '合同名称', prop: 'contractName', minWidth: '150px' },
      { label: '合同状态', prop: 'contractNormalStatusText', minWidth: '80px' },
      { label: '合同类型', prop: 'contractTypeText', minWidth: '100px' },
      { label: '期数', prop: 'nper', minWidth: '80px' },
      { label: '租赁方式', prop: 'leaseWayText', minWidth: '80px' },
      { label: '上牌地', prop: 'cityName', minWidth: '80px' },
      { label: '是否限牌', prop: 'isLimitLicenceText', minWidth: '80px' },
      { label: '是否租赁公司', prop: 'isGalcCompanyText', minWidth: '120px' },
      { label: '车辆数量', prop: 'num', minWidth: '80px' },
      { label: '核销状态', prop: 'repaymentStatusText', minWidth: '80px' },
      { label: '起租日', prop: 'batchStartingDate', minWidth: '120px' },
      { label: '支付日', prop: 'payDate', minWidth: '120px' },
      { label: '应收金额', prop: 'dueAmount', minWidth: '120px' },
      { label: '应收本金', prop: 'duePrincipal', minWidth: '120px' },
      { label: '应收利息', prop: 'dueinterest', minWidth: '120px' },
      { label: '应收管理费', prop: 'dueManagementFee', minWidth: '120px' },
      { label: '应收手续费', prop: 'dueCommission', minWidth: '120px' },
      { label: '已收金额', prop: 'receivedAmount', minWidth: '120px' },
      { label: '已收本金', prop: 'receivedPrincipal', minWidth: '120px' },
      { label: '已收利息', prop: 'receivedInterest', minWidth: '120px' },
      { label: '已收管理费', prop: 'receivedManagementFee', minWidth: '120px' },
      { label: '已收手续费', prop: 'receivedCommission', minWidth: '120px' },
      { label: '未收金额', prop: 'outstandingAmount', minWidth: '120px' },
      { label: '未收本金', prop: 'outstandingPrincipal', minWidth: '120px' },
      { label: '未收利息', prop: 'outstandingInterest', minWidth: '120px' },
      { label: '未收管理费', prop: 'outstandingManagementFee', minWidth: '120px' },
      { label: '未收手续费', prop: 'outstandingCommission', minWidth: '120px' },
    ],
    bankWaterHeader: JSON.parse(localStorage.getItem('bankWaterHeader')) || [
      { label: '交易时间', prop: 'tradeDate', minWidth: '110px', sortable: true },
      { label: '银行单据号', prop: 'serialNumber', minWidth: '160px', sortable: true },
      { label: '收款金额', prop: 'income', minWidth: '120px' },
      { label: '收款账户名称', prop: 'companyName', minWidth: '200px' },
      { label: '收款账号', prop: 'bankAccountNo', minWidth: '150px' },
      { label: '收款账户开户行', prop: 'bankAccountName', minWidth: '150px' },
      { label: '汇款账户名称', prop: 'sideAccountName', minWidth: '200px' },
      { label: '汇款账号', prop: 'sideAccount', minWidth: '150px' },
      { label: '核销状态', prop: 'verStateText', minWidth: '80px' },
      { label: '摘要', prop: 'digest', minWidth: '150px' },
      { label: '代付标志', prop: 'paidLogo', minWidth: '150px' },
      { label: '项目类别', prop: 'projectCategory', minWidth: '100px' },
      { label: '已核销金额', prop: 'haveVerLines', minWidth: '150px' },
      { label: '未核销金额', prop: 'notVerLines', minWidth: '150px' },
      { label: '退款金额', prop: 'refund', minWidth: '150px' },
      { label: '台账标志', prop: 'newLedgerLogo', minWidth: '120px' },
      { label: '备注', prop: 'remark', minWidth: '100px' },
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

    // setDropCol(state, dropCol) {
    //   state.dropCol = dropCol;
    //   localStorage.setItem('dropCol', JSON.stringify(dropCol))
    // },
    setTableHeader(state, tableHeader) {
      state.tableHeader = tableHeader;
      localStorage.setItem('tableHeader', JSON.stringify(tableHeader))
    },
    setBankWaterHeader(state, bankWaterHeader) {
      state.bankWaterHeader = bankWaterHeader;
      localStorage.setItem('bankWaterHeader', JSON.stringify(bankWaterHeader))
    },

  },

  getters: {
    // getUserName: (state, getters) => {
    //   return state.personName
    // }
  }
});

export default store;
