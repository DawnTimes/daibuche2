import Vue from 'vue'
import Router from 'vue-router'
const  LogIn = r => require.ensure([], () => r(require('@/components/page/login/LogIn')), 'logIn')
const  Common = r => require.ensure([], () => r(require('@/components/page/layouts/Common')), 'Common')
const  UserManage = r => require.ensure([], () => r(require('@/components/page/system/UserManage')), 'UserManage')
const dealersManagement = r => require.ensure([], () => r(require('@/components/page/customer/DealersManagement')), 'dealersManagement')
const VehicleMsgManagement = r => require.ensure([], () => r(require('@/components/page/Vehicle/VehicleMsgManagement')), 'VehicleMsgManagement')
const carTypeManagement = r => require.ensure([], () => r(require('@/components/page/Vehicle/carTypeManagement')), 'carTypeManagement')
const AddUserManage = r => require.ensure([], () => r(require('@/components/page/system/AddUserManage')), 'addusermanage')
const rentManagement = r => require.ensure([], () => r(require('@/components/page/customer/rentManagement')), 'rentManagement')
const VehicleAdjust = r => require.ensure([], () => r(require('@/components/page/adjustment/VehicleAdjust')), 'VehicleAdjust')
const AdjustmentInfo = r => require.ensure([], () => r(require('@/components/page/adjustment/AdjustmentInfo')), 'AdjustmentInfo')
const AdjustmentSure = r => require.ensure([], () => r(require('@/components/page/adjustment/AdjustmentSure')), 'AdjustmentSure')
const TaskDetail = r => require.ensure([], () => r(require('@/components/page/adjustment/TaskDetail')), 'TaskDetail')
const VehicleDetail = r => require.ensure([], () => r(require('@/components/page/adjustment/VehicleDetail')), 'VehicleDetail')
const PreAdjust = r => require.ensure([], () => r(require('@/components/page/adjustment/PreAdjust')), 'PreAdjust')
const adjustmentInfoHistory = r => require.ensure([], () => r(require('@/components/page/adjustment/adjustmentInfoHistory')), 'adjustmentInfoHistory')

const auth = r => require.ensure([], () => r(require('@/components/page/system/Auth')), 'auth')
const AuthList = r => require.ensure([], () => r(require('@/components/page/system/AuthList')), 'authList')
const AddRole = r => require.ensure([], () => r(require('@/components/page/system/AddRole')), 'addrole')
const EditRole = r => require.ensure([], () => r(require('@/components/page/system/EditRole')), 'editrole')
const RoleDetail = r => require.ensure([], () => r(require('@/components/page/system/RoleDetail')), 'roledetail')
const OperationFlow = r => require.ensure([], () => r(require('@/components/page/system/OperationFlow')), 'operationflow')
const Waiting = r => require.ensure([], () => r(require('@/components/page/waiting/Waiting')), 'waiting')
const EditUserManage = r => require.ensure([], () => r(require('@/components/page/system/EditUserManage')), 'editusermanage')
const contractApproveMain = r => require.ensure([], () => r(require('@/components/page/contract/contractApproveMain')), 'contractApproveMain')
const contractSearchMain = r => require.ensure([], () => r(require('@/components/page/contract/contractSearchMain')), 'contractSearchMain')
const editPassword = r => require.ensure([], () => r(require('@/components/page/system/editPassword')), 'editPassword')

Vue.use(Router)
const router=new Router({
  routes:[
    {
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
      children:[
          {
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
