/*
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:48
 * @LastEditTime: 2020-08-14 17:56:56
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
// 租金修改详情
const baseInformationDetail = resolve => require(['@/views/rent/baseInformationDetail'], resolve);
// 租金审批
const rentApprovalList = resolve => require(['@/views/rent/rentApprovalList'], resolve);

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
      meta: {},
      children: [{
          path: '/uermanage',
          name: 'UserManage',
          component: UserManage,
          meta: {}
        },
        {
          path: '/dealersManagement',
          name: 'dealersManagement',
          component: dealersManagement,
          meta: {}
        },
        {
          path: '/rentManagement',
          name: 'rentManagement',
          component: rentManagement,
          meta: {}
        },
        {
          path: '/VehicleMsgManagement',
          name: 'VehicleMsgManagement',
          component: VehicleMsgManagement,
          meta: {}
        },
        {
          path: '/carTypeManagement',
          name: 'carTypeManagement',
          component: carTypeManagement,
          meta: {}
        },
        {
          path: '/addusermanage',
          name: 'AddUserManage',
          component: AddUserManage,
          meta: {}
        },
        {
          path: '/VehicleAdjust',
          name: 'VehicleAdjust',
          component: VehicleAdjust,
          meta: {}
        },
        {
          path: '/PreAdjust',
          name: 'PreAdjust',
          component: PreAdjust,
          meta: {}
        },
        {
          path: '/AdjustmentInfo',
          name: 'AdjustmentInfo',
          component: AdjustmentInfo,
          meta: {}
        },
        {
          path: '/AdjustmentSure',
          name: 'AdjustmentSure',
          component: AdjustmentSure,
          meta: {}
        },
        {
          path: '/TaskDetail',
          name: 'TaskDetail',
          component: TaskDetail,
          meta: {}
        },
        {
          path: '/VehicleDetail',
          name: 'VehicleDetail',
          component: VehicleDetail,
          meta: {}
        },
        {
          path: '/authlist',
          name: 'AuthList',
          component: AuthList,
          meta: {}
        },
        {
          path: '/addrole',
          name: 'AddRole',
          component: AddRole,
          meta: {}
        },
        {
          path: '/editrole',
          name: 'EditRole',
          component: EditRole,
          meta: {}
        },
        {
          path: '/auth',
          name: 'auth',
          component: auth,
          meta: {}
        },
        {
          path: '/roledetail',
          name: 'RoleDetail',
          component: RoleDetail,
          meta: {}
        },
        {
          path: '/operationflow',
          name: 'OperationFlow',
          component: OperationFlow,
          meta: {}
        },
        {
          path: '/waiting',
          name: 'Waiting',
          component: Waiting,
          meta: {}
        },
        {
          path: '/editusermanage',
          name: 'EditUserManage',
          component: EditUserManage,
          meta: {}
        },
        {
          path: '/editPassword',
          name: 'editPassword',
          component: editPassword,
          meta: {}
        },
        {
          path: '/contractApproveMain',
          name: 'contractApproveMain',
          component: contractApproveMain,
          meta: {}
        },
        {
          path: '/contractSearchMain',
          name: 'contractSearchMain',
          component: contractSearchMain,
          meta: {}
        },
        {
          path: '/adjustmentInfoHistory',
          name: 'adjustmentInfoHistory',
          component: adjustmentInfoHistory,
          meta: {}
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
            title: '期数列表',
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
            title: '限牌车型列表'
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
            title: '非限牌车型列表'
          }
        },
        {
          path: '/rentApplyList',
          name: 'rentApplyList',
          component: rentApplyList,
          meta: {
            title: '租金申请'
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
            title: '租金审批'
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
