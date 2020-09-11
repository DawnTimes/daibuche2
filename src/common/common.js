export default {
  // import common from "@/common/common.js";
  // allTreeUrl           : "/carmanage-admin/menu/allTree",
  // userMenuUrl          : "/carmanage-admin/menu/userMenu",
  // carAdjustlistUrl     : "/carmanage-admin/carAdjustlist.do",
  // carAdjustDetailUrl   : "/carmanage-admin/carAdjustDetail.do",
  // carAdjustConfirmUrl  : "/carmanage-admin/carAdjustConfirm.do",
  // findCarPageUrl       : "/carmanage-admin/findCarPage.do",
  // findCityInfoUrl      : "/carmanage-admin/findCityInfo.do",
  // findProviInfoUrl     : "/carmanage-admin/findProviInfo.do",
  // deleteCarPreAdjustUrl: "/carmanage-admin/deleteCarPreAdjust.do",
  // carPreAdjustUrl      : "/carmanage-admin/carPreAdjust.do",
  // findOperationLogUrl  : "/carmanage-admin/findOperationLog.do",
  // carBrandOperationUrl : "/carmanage-admin/carBrandOperation.do",
  // logoutUrl            : "/carmanage-auth/logout.do",
  // loginUrl             : "/carmanage-auth/login.do",

  // contractUploadUrl       : "/carmanage-admin/contractUpload",
  // contraceApprovalUrl     : "/carmanage-admin/contraceApproval.do",
  // findCarContractInfoUrl  : "/carmanage-admin/findCarContractInfo.do",
  // findCarContractApprUrl  : "/carmanage-admin/findCarContractAppr.do",
  // findContractRecordUrl   : "/carmanage-admin/findContractRecord.do",
  // findRepaymentPlanInfoUrl: "/carmanage-admin/findRepaymentPlanInfo.do",
  // agentListUrl            : "/carmanage-admin/agentList.do",
  // licenceListUrl          : "/carmanage-admin/licenceList.do",
  // roleUrl                 : "/carmanage-admin/role",

  // userUrl                : "/carmanage-admin/user",
  // roleMenuUpdUrl         : "/carmanage-admin/role/roleMenuUpd",
  // roleMenuTreeUrl        : "/carmanage-admin/menu/roleMenuTree",
  // rolePageUrl            : "/carmanage-admin/role/rolePage",
  // userPageUrl            : "/carmanage-admin/user/userPage",
  // findAreaInfoUrl        : "/carmanage-admin/findAreaInfo.do",
  // findCityAgentUrl       : "/carmanage-admin/findCityAgent.do",
  // carAdjustHistoryListUrl: "/carmanage-admin/carAdjustHistoryList.do",
  // findCityLicenceUrl     : "/carmanage-admin/findCityLicence.do",
  // carSeriesOperationUrl  : "/carmanage-admin/carSeriesOperation.do",
  // carModelOperationUrl   : "/carmanage-admin/carModelOperation.do",
  // addOrUpdateCarUrl      : "/carmanage-admin/addOrUpdateCar.do",
  // treeUrl                : "/carmanage-admin/dept/tree",
  // allRoleUrl             : "/carmanage-admin/role/allRole",
  // editPasswordUrl        : "/carmanage-admin/user/updatePassword",
  // addOrUpdateAgentUrl2   : "/carmanage-admin/addOrUpdateAgent2.do",


  allTreeUrl           : "/menu/allTree",
  userMenuUrl          : "/menu/userMenu",
  carAdjustlistUrl     : "/carAdjustlist.do",
  carAdjustDetailUrl   : "/carAdjustDetail.do",
  carAdjustConfirmUrl  : "/carAdjustConfirm.do",
  findCarPageUrl       : "/findCarPage.do",
  findCityInfoUrl      : "/findCityInfo.do",
  findProviInfoUrl     : "/findProviInfo.do",
  deleteCarPreAdjustUrl: "/deleteCarPreAdjust.do",
  carPreAdjustUrl      : "/carPreAdjust.do",
  findOperationLogUrl  : "/findOperationLog.do",
  carBrandOperationUrl : "/carBrandOperation.do",
  logoutUrl            : "/logout.do",
  loginUrl             : "/login.do",

  contractUploadUrl       : "/contractUpload",
  contraceApprovalUrl     : "/contraceApproval.do",
  findCarContractInfoUrl  : "/findCarContractInfo.do",
  findCarContractApprUrl  : "/findCarContractAppr.do",
  findContractRecordUrl   : "/findContractRecord.do",
  findRepaymentPlanInfoUrl: "/findRepaymentPlanInfo.do",
  agentListUrl            : "/agentList.do",
  licenceListUrl          : "/licenceList.do",
  roleUrl                 : "/role",

  userUrl                : "/user",
  roleMenuUpdUrl         : "/role/roleMenuUpd",
  roleMenuTreeUrl        : "/menu/roleMenuTree",
  rolePageUrl            : "/role/rolePage",
  userPageUrl            : "/user/userPage",
  findAreaInfoUrl        : "/findAreaInfo.do",
  findCityAgentUrl       : "/findCityAgent.do",
  carAdjustHistoryListUrl: "/carAdjustHistoryList.do",
  findCityLicenceUrl     : "/findCityLicence.do",
  carSeriesOperationUrl  : "/carSeriesOperation.do",
  carModelOperationUrl   : "/carModelOperation.do",
  addOrUpdateCarUrl      : "/addOrUpdateCar.do",
  treeUrl                : "/dept/tree",
  allRoleUrl             : "/role/allRole",
  editPasswordUrl        : "/user/updatePassword",
  addOrUpdateAgentUrl2   : "/addOrUpdateAgent2.do",


  // 数据字典
  queryDictUrl: '/dataDict/queryDict.do',

  bankWaterDownUrl: '/bankStatemntExcel/exportBankStatement',

  // 限牌车型分页
  queryLimitCarListUrl: '/queryLimitCarList.do',
  // 非限牌车型分页
  queryNotLimitCarListUrl: '/queryNotLimitCarList.do',
  // 租金修改保存、提交
  rentSubmitUrl: '/rentSubmit.do',
  // 查询租金修改历史和申请（分页）
  queryRentHisUrl: '/queryRentHis.do',
  // 租金编辑
  updateRentUrl: '/updateRent.do',
  // 根据id查询租金修改
  queryRentDetailByIdUrl: '/queryRentDetailById.do',
  // 租金待审批分页
  rentApprovalUrl: '/rentApproval.do',
  // 租金审批操作
  rentApprovalOperationUrl: '/rentApprovalOperation.do',
  

  // 验证码
  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  },

  // 获取当前时间
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  // 检测权限
  checkRolePermission(id, roleObject, PermissonVariable, vueVariable) { //检测角色是否有权限显示某个按钮的方法，id为权限id roleObject为后台传入的数据树，permissonVariable为对应变量名，vueVariable为绑定的数据变量名
    let that = this;
    roleObject.forEach(function (val, index) {
      if (roleObject[index] == id) {
        vueVariable[PermissonVariable] = true;
        console.log('有该权限,权限id' + roleObject[index])
      }
    })
  },
  checkRolePermission2(id, roleObject) {
    //检测角色是否有权限显示某个按钮的方法，id为权限id roleObject为后台传入的数据树，permissonVariable为对应变量名，vueVariable为绑定的数据变量名
    let that = this;
    let flag = false
    roleObject.forEach(function (val, index) {
      if (roleObject[index] == id) {
        flag = true
      }
    })
    return flag
  },
  checkConstractFlow(flowId, array, id, FlowArray) {
    let that = this;
    array.forEach(function (val, index) {

      if (array[index] == flowId) {
        if (FlowArray.indexOf(id) < 0) {
          FlowArray.push(id);
          console.log(FlowArray)
        }
      }
    })
  }
}
