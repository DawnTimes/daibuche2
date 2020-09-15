/*
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:48
 * @LastEditTime: 2020-09-14 15:24:42
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
// import { resolve } from '../../build/webpack.base.conf'
const LogIn                 = r => require.ensure([], () => r(require('@/views/login/LogIn')), 'logIn')
const Common                = r => require.ensure([], () => r(require('@/views/layouts/Common')), 'Common')
const UserManage            = r => require.ensure([], () => r(require('@/views/system/UserManage')), 'UserManage')
const dealersManagement     = r => require.ensure([], () => r(require('@/views/customer/DealersManagement')), 'dealersManagement')
const VehicleMsgManagement  = r => require.ensure([], () => r(require('@/views/Vehicle/VehicleMsgManagement')), 'VehicleMsgManagement')
const carTypeManagement     = r => require.ensure([], () => r(require('@/views/Vehicle/carTypeManagement')), 'carTypeManagement')
const AddUserManage         = r => require.ensure([], () => r(require('@/views/system/AddUserManage')), 'addusermanage')
const rentManagement        = r => require.ensure([], () => r(require('@/views/customer/rentManagement')), 'rentManagement')
const VehicleAdjust         = r => require.ensure([], () => r(require('@/views/adjustment/VehicleAdjust')), 'VehicleAdjust')
const AdjustmentInfo        = r => require.ensure([], () => r(require('@/views/adjustment/AdjustmentInfo')), 'AdjustmentInfo')
const AdjustmentSure        = r => require.ensure([], () => r(require('@/views/adjustment/AdjustmentSure')), 'AdjustmentSure')
const TaskDetail            = r => require.ensure([], () => r(require('@/views/adjustment/TaskDetail')), 'TaskDetail')
const VehicleDetail         = r => require.ensure([], () => r(require('@/views/adjustment/VehicleDetail')), 'VehicleDetail')
const PreAdjust             = r => require.ensure([], () => r(require('@/views/adjustment/PreAdjust')), 'PreAdjust')
const adjustmentInfoHistory = r => require.ensure([], () => r(require('@/views/adjustment/adjustmentInfoHistory')), 'adjustmentInfoHistory')
const auth                  = r => require.ensure([], () => r(require('@/views/system/Auth')), 'auth')
const AuthList              = r => require.ensure([], () => r(require('@/views/system/AuthList')), 'authList')
const AddRole               = r => require.ensure([], () => r(require('@/views/system/AddRole')), 'addrole')
const EditRole              = r => require.ensure([], () => r(require('@/views/system/EditRole')), 'editrole')
const RoleDetail            = r => require.ensure([], () => r(require('@/views/system/RoleDetail')), 'roledetail')
const OperationFlow         = r => require.ensure([], () => r(require('@/views/system/OperationFlow')), 'operationflow')
const Waiting               = r => require.ensure([], () => r(require('@/views/waiting/Waiting')), 'waiting')
const EditUserManage        = r => require.ensure([], () => r(require('@/views/system/EditUserManage')), 'editusermanage')
const contractApproveMain   = r => require.ensure([], () => r(require('@/views/contract/contractApproveMain')), 'contractApproveMain')
const contractSearchMain    = r => require.ensure([], () => r(require('@/views/contract/contractSearchMain')), 'contractSearchMain')
const editPassword          = r => require.ensure([], () => r(require('@/views/system/editPassword')), 'editPassword')

// 财务核销
// 银行流水单
const bankWaterList = resolve => require(['@/views/verification/bankWaterList'], resolve);
// 核销详情
const writeOffDetail = resolve => require(['@/views/verification/writeOffDetail'], resolve);
// 新增流水单
const addBankWater = resolve => require(['@/views/verification/addBankWater'], resolve);
// 核销合同列表
const writeOffContractList = resolve => require(['@/views/verification/writeOffContractList'], resolve);
// 合同下期数列表
const contractListNper = resolve => require(['@/views/verification/contractListNper'], resolve);
// 车辆清单
// const nperCarList = resolve => require(['@/views/verification/nperCarList'], resolve);

// 租金修改
// 限牌车型列表
const limitCarTypeList = resolve => require(['@/views/rent/limitCarTypeList'], resolve);
// 非限牌车型列表
const unlimitCarTypeList = resolve => require(['@/views/rent/unlimitCarTypeList'], resolve);
// 限牌地租金修改
const limitCarTypeRentUpdate = resolve => require(['@/views/rent/limitCarTypeRentUpdate'], resolve);
// 非限牌地租金修改
const unlimitCarTypeRentUpdate = resolve => require(['@/views/rent/unlimitCarTypeRentUpdate'], resolve);
// 租金申请列表
const rentApplyList = resolve => require(['@/views/rent/rentApplyList'], resolve);
// 租金申请编辑
const editRent = resolve => require(['@/views/rent/editRent'], resolve);
// 租金修改详情
const baseInformationDetail = resolve => require(['@/views/rent/baseInformationDetail'], resolve);
// 租金审批
const rentApprovalList = resolve => require(['@/views/rent/rentApprovalList'], resolve);
// 租金审批提交
const rentApprovalOperation = resolve => require(['@/views/rent/rentApprovalOperation'], resolve);
// 租金修改历史记录
const rentAppytHistory = resolve => require(['@/views/rent/rentAppytHistory'], resolve);

// 核销查询
// 经销店核销查询下
const dealershipWriteOffQuery = resolve => require(['@/views/writeOffQuery/dealershipWriteOffQuery'], resolve);
// 车辆核销查询下
const carWriteOffQuery = resolve => require(['@/views/writeOffQuery/carWriteOffQuery'], resolve);

// 台账
// 经销店台账
const dealershipBook = resolve => require(['@/views/standingBook/dealershipBook'], resolve);
// 车辆台账
const carBook = resolve => require(['@/views/standingBook/carBook'], resolve);

// 支援金
// 支援金申请列表
const supportGoldApply = resolve => require(['@/views/supportGold/supportGoldApply'], resolve);
// 支援金申请
const createSupportGoldApply = resolve => require(['@/views/supportGold/createSupportGoldApply'], resolve);
// 支援金总清单
const supportGoldTotalList = resolve => require(['@/views/supportGold/supportGoldTotalList'], resolve);
// 支援金审批
const supportGoldApprovalList = resolve => require(['@/views/supportGold/supportGoldApprovalList'], resolve);
// 支援金审批操作
const supportGoldApprovaled = resolve => require(['@/views/supportGold/supportGoldApprovaled'], resolve);
// 支援金详情
const supportGoldDetail = resolve => require(['@/views/supportGold/supportGoldDetail'], resolve);
// 历史记录
const supportGoldHistory = resolve => require(['@/views/supportGold/supportGoldHistory'], resolve);

// 开票
// 开票明细
const invoiceNoticeList = resolve => require(['@/views/invoiceNotice/invoiceNoticeList'], resolve);
// 开票通知单
const invoiceNoticeLetter = resolve => require(['@/views/invoiceNotice/invoiceNoticeLetter'], resolve);
// 不开票通明细
const unInvoiceNoticeList = resolve => require(['@/views/invoiceNotice/unInvoiceNoticeList'], resolve);

// 逾期催收
// 逾期记录
const overduceCollectionList = resolve => require(['@/views/overdueCollection/overduceCollectionList'], resolve);
// 记录录入
const collectionRecord = resolve => require(['@/views/overdueCollection/collectionRecord'], resolve);

// 新增牌照商
const addOrganization = resolve => require(['@/views/customer/addOrganization'], resolve);
// 牌照商编辑
const editOrganization = resolve => require(['@/views/customer/editOrganization'], resolve);

// 账户管理
const bankAccountList = resolve => require(['@/views/bankAccount/bankAccountList'], resolve);

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'LogIn',
      component: LogIn,
      meta: {}
    },
    {
      path: '/common',
      name: 'Common',
      component: Common,
      redirect: '/waiting',
      meta: {
        
      },
      children: [{
          path: '/uermanage',
          name: 'UserManage',
          component: UserManage,
          meta: {
            title: '用户管理',
          }
        },
        {
          path: '/dealersManagement',
          name: 'dealersManagement',
          component: dealersManagement,
          meta: {
            title: '经销商信息管理',
          }
        },
        {
          path: '/rentManagement',
          name: 'rentManagement',
          component: rentManagement,
          meta: {
            title: '牌照商信息管理',
          }
        },
        {
          path: '/VehicleMsgManagement',
          name: 'VehicleMsgManagement',
          component: VehicleMsgManagement,
          meta: {
            title: '车辆信息管理',
          }
        },
        {
          path: '/carTypeManagement',
          name: 'carTypeManagement',
          component: carTypeManagement,
          meta: {
            title: '车辆类型管理',
          }
        },
        {
          path: '/addusermanage',
          name: 'AddUserManage',
          component: AddUserManage,
          meta: {
            title: '新增用户',
          }
        },
        {
          path: '/VehicleAdjust',
          name: 'VehicleAdjust',
          component: VehicleAdjust,
          meta: {
            title: '车辆调剂',
          }
        },
        {
          path: '/PreAdjust',
          name: 'PreAdjust',
          component: PreAdjust,
          meta: {
            title: '预调剂'
          }
        },
        {
          path: '/AdjustmentInfo',
          name: 'AdjustmentInfo',
          component: AdjustmentInfo,
          meta: {
            title: '调剂确认'
          }
        },
        {
          path: '/AdjustmentSure',
          name: 'AdjustmentSure',
          component: AdjustmentSure,
          meta: {
            title: '调剂确认提交'
          }
        },
        {
          path: '/TaskDetail',
          name: 'TaskDetail',
          component: TaskDetail,
          meta: {
            title: '调剂任务明细'
          }
        },
        {
          path: '/VehicleDetail',
          name: 'VehicleDetail',
          component: VehicleDetail,
          meta: {
            title: '调剂任务明细'
          }
        },
        {
          path: '/authlist',
          name: 'AuthList',
          component: AuthList,
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/addrole',
          name: 'AddRole',
          component: AddRole,
          meta: {
            title: '新增角色'
          }
        },
        {
          path: '/editrole',
          name: 'EditRole',
          component: EditRole,
          meta: {
            title: '角色编辑'
          }
        },
        {
          path: '/auth',
          name: 'auth',
          component: auth,
          meta: {
            title: '权限设定'
          }
        },
        {
          path: '/roledetail',
          name: 'RoleDetail',
          component: RoleDetail,
          meta: {
            title: '角色详情'
          }
        },
        {
          path: '/operationflow',
          name: 'OperationFlow',
          component: OperationFlow,
          meta: {
            title: '操作流水查询'
          }
        },
        {
          path: '/waiting',
          name: 'Waiting',
          component: Waiting,
          meta: {
            title: '待办事项',
          }
        },
        {
          path: '/editusermanage',
          name: 'EditUserManage',
          component: EditUserManage,
          meta: {
            title: '用户编辑'
          }
        },
        {
          path: '/editPassword',
          name: 'editPassword',
          component: editPassword,
          meta: {
            title: '修改密码'
          }
        },
        {
          path: '/contractApproveMain',
          name: 'contractApproveMain',
          component: contractApproveMain,
          meta: {
            title: '合同审批'
          }
        },
        {
          path: '/contractSearchMain',
          name: 'contractSearchMain',
          component: contractSearchMain,
          meta: {
            title: '合同查询'
          }
        },
        {
          path: '/adjustmentInfoHistory',
          name: 'adjustmentInfoHistory',
          component: adjustmentInfoHistory,
          meta: {
            title: '调剂历史'
          }
        },
        
        // 财务核销
        {
          path: '/bankWaterList',
          name: 'bankWaterList',
          component: bankWaterList,
          meta: {
            title: '银行流水单',
          }
        },
        {
          path: '/writeOffDetail',
          name: 'writeOffDetail',
          component: writeOffDetail,
          meta: {
            title: '核销详情',
          }
        },
        {
          path: '/addBankWater',
          name: 'addBankWater',
          component: addBankWater,
          meta: {
            title: '新增银行流水单',
          }
        },
        {
          path: '/writeOffContractList',
          name: 'writeOffContractList',
          component: writeOffContractList,
          meta: {
            title: '核销合同列表',
          }
        },
        {
          path: '/contractListNper',
          name: 'contractListNper',
          component: contractListNper,
          meta: {
            title: '合同期数还款计划',
          }
        },
        // {
        //   path: '/nperCarList',
        //   name: 'nperCarList',
        //   component: nperCarList,
        //   meta: {
        //     title: '车辆清单',
        //   }
        // },

        // 租金修改
        {
          path: '/limitCarTypeList',
          name: 'limitCarTypeList',
          component: limitCarTypeList,
          meta: {
            title: '限牌车型'
          }
        },
        {
          path: '/limitCarTypeRentUpdate',
          name: 'limitCarTypeRentUpdate',
          component: limitCarTypeRentUpdate,
          meta: {
            title: '限牌地租金修改'
          }
        },
        {
          path: '/unlimitCarTypeRentUpdate',
          name: 'unlimitCarTypeRentUpdate',
          component: unlimitCarTypeRentUpdate,
          meta: {
            title: '非限牌地租金修改'
          }
        },
        {
          path: '/unlimitCarTypeList',
          name: 'unlimitCarTypeList',
          component: unlimitCarTypeList,
          meta: {
            title: '非限牌车型'
          }
        },
        {
          path: '/rentApplyList',
          name: 'rentApplyList',
          component: rentApplyList,
          meta: {
            title: '租金修改申请'
          }
        },
        {
          path: '/editRent',
          name: 'editRent',
          component: editRent,
          meta: {
            title: '租金编辑'
          }
        },
        {
          path: '/baseInformationDetail',
          name: 'baseInformationDetail',
          component: baseInformationDetail,
          meta: {
            title: '租金修改详情'
          }
        },
        {
          path: '/rentApprovalList',
          name: 'rentApprovalList',
          component: rentApprovalList,
          meta: {
            title: '租金修改审批'
          }
        },
        {
          path: '/rentApprovalOperation',
          name: 'rentApprovalOperation',
          component: rentApprovalOperation,
          meta: {
            title: '租金审批提交'
          }
        },
        {
          path: '/rentAppytHistory',
          name: 'rentAppytHistory',
          component: rentAppytHistory,
          meta: {
            title: '租金修改历史'
          }
        },

        // 核销查询
        {
          path: '/dealershipWriteOffQuery',
          name: 'dealershipWriteOffQuery',
          component: dealershipWriteOffQuery,
          meta: {
            title: '经销店核销查询'
          }
        },
        {
          path: '/carWriteOffQuery',
          name: 'carWriteOffQuery',
          component: carWriteOffQuery,
          meta: {
            title: '车辆核销查询'
          }
        },

        // 台账
        {
          path: '/dealershipBook',
          name: 'dealershipBook',
          component: dealershipBook,
          meta: {
            title: '经销店台账'
          }
        },
        {
          path: '/carBook',
          name: 'carBook',
          component: carBook,
          meta: {
            title: '车辆台账'
          }
        },

        // 支援金
        {
          path: '/supportGoldApply',
          name: 'supportGoldApply',
          component: supportGoldApply,
          meta: {
            title: '支援金申请列表'
          }
        },
        {
          path: '/createSupportGoldApply',
          name: 'createSupportGoldApply',
          component: createSupportGoldApply,
          meta: {
            title: '申请支援金'
          }
        },
        {
          path: '/supportGoldTotalList',
          name: 'supportGoldTotalList',
          component: supportGoldTotalList,
          meta: {
            title: '支援金清单'
          }
        },
        {
          path: '/supportGoldApprovalList',
          name: 'supportGoldApprovalList',
          component: supportGoldApprovalList,
          meta: {
            title: '支援金审批'
          }
        },
        {
          path: '/supportGoldApprovaled',
          name: 'supportGoldApprovaled',
          component: supportGoldApprovaled,
          meta: {
            title: '支援金审批提交'
          }
        },
        {
          path: '/supportGoldDetail',
          name: 'supportGoldDetail',
          component: supportGoldDetail,
          meta: {
            title: '支援金详情'
          }
        },
        {
          path: '/supportGoldHistory',
          name: 'supportGoldHistory',
          component: supportGoldHistory,
          meta: {
            title: '支援金历史记录'
          }
        },

        //开票
        {
          path: '/invoiceNoticeList',
          name: 'invoiceNoticeList',
          component: invoiceNoticeList,
          meta: {
            title: '开票明细'
          }
        },
        {
          path: '/invoiceNoticeLetter',
          name: 'invoiceNoticeLetter',
          component: invoiceNoticeLetter,
          meta: {
            title: '开票通知单'
          }
        },
        {
          path: '/unInvoiceNoticeList',
          name: 'unInvoiceNoticeList',
          component: unInvoiceNoticeList,
          meta: {
            title: '无需开票明细'
          }
        },

        // 逾期催收
        {
          path: '/overduceCollectionList',
          name: 'overduceCollectionList',
          component: overduceCollectionList,
          meta: {
            title: '逾期记录'
          }
        },
        {
          path: '/collectionRecord',
          name: 'collectionRecord',
          component: collectionRecord,
          meta: {
            title: '电催记录录入'
          }
        },

        // 新增牌照商
        {
          path: '/addOrganization',
          name: 'addOrganization',
          component: addOrganization,
          meta: {
            title: '新增牌照商'
          }
        },
        // 牌照商编辑
        {
          path: '/editOrganization',
          name: 'editOrganization',
          component: editOrganization,
          meta: {
            title: '牌照商编辑'
          }
        },

        // 账户管理
        {
          path: '/bankAccountList',
          name: 'bankAccountList',
          component: bankAccountList,
          meta: {
            title: '账户管理'
          }
        },
      ]
    }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/');
    } else {
      next();
    }
  }
});

export default router;
