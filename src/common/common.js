export default {
  // import common from "@/common/common.js";
  allTreeUrl: "/api/carmanage-admin/menu/allTree",
  userMenuUrl: "/api/carmanage-admin/menu/userMenu",
  carAdjustlistUrl: "/api/carmanage-admin/carAdjustlist.do",
  carAdjustDetailUrl: "/api/carmanage-admin/carAdjustDetail.do",
  carAdjustConfirmUrl: "/api/carmanage-admin/carAdjustConfirm.do",
  findCarPageUrl: "/api/carmanage-admin/findCarPage.do",
  findCityInfoUrl: "/api/carmanage-admin/findCityInfo.do",
  findProviInfoUrl: "/api/carmanage-admin/findProviInfo.do",
  deleteCarPreAdjustUrl: "/api/carmanage-admin/deleteCarPreAdjust.do",
  carPreAdjustUrl: "/api/carmanage-admin/carPreAdjust.do",
  findOperationLogUrl: "/api/carmanage-admin/findOperationLog.do",
  carBrandOperationUrl: "/api/carmanage-admin/carBrandOperation.do",
  logoutUrl: "/api/carmanage-auth/logout.do",
  loginUrl: "/api/carmanage-auth/login.do",


  
  contractUploadUrl: "/api/carmanage-admin/contractUpload",
  contraceApprovalUrl: "/api/carmanage-admin/contraceApproval.do",
  findCarContractInfoUrl: "/api/carmanage-admin/findCarContractInfo.do",
  findCarContractApprUrl: "/api/carmanage-admin/findCarContractAppr.do",
  findContractRecordUrl: "/api/carmanage-admin/findContractRecord.do",
  findRepaymentPlanInfoUrl: "/api/carmanage-admin/findRepaymentPlanInfo.do",
  agentListUrl: "/api/carmanage-admin/agentList.do",
  licenceListUrl: "/api/carmanage-admin/licenceList.do",
  roleUrl: "/api/carmanage-admin/role",

  userUrl: "/api/carmanage-admin/user",
  roleMenuUpdUrl: "/api/carmanage-admin/role/roleMenuUpd",
  roleMenuTreeUrl: "/api/carmanage-admin/menu/roleMenuTree",
  rolePageUrl: "/api/carmanage-admin/role/rolePage",
  userPageUrl: "/api/carmanage-admin/user/userPage",
  findAreaInfoUrl: "/api/carmanage-admin/findAreaInfo.do",
  findCityAgentUrl: "/api/carmanage-admin/findCityAgent.do",
  carAdjustHistoryListUrl: "/api/carmanage-admin/carAdjustHistoryList.do",
  findCityLicenceUrl: "/api/carmanage-admin/findCityLicence.do",
  carSeriesOperationUrl: "/api/carmanage-admin/carSeriesOperation.do",
  carModelOperationUrl: "/api/carmanage-admin/carModelOperation.do",
  addOrUpdateCarUrl: "/api/carmanage-admin/addOrUpdateCar.do",
  treeUrl: "/api/carmanage-admin/dept/tree",
  allRoleUrl: "/api/carmanage-admin/role/allRole",
  editPasswordUrl:"api/carmanage-admin/user/updatePassword",
  addOrUpdateAgentUrl2:"api/carmanage-admin/addOrUpdateAgent2.do",
  guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      })
  },
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
  checkRolePermission(id,roleObject,PermissonVariable,vueVariable){ //检测角色是否有权限显示某个按钮的方法，id为权限id roleObject为后台传入的数据树，permissonVariable为对应变量名，vueVariable为绑定的数据变量名
    let that = this;
    roleObject.forEach(function(val,index){
         if(roleObject[index] ==  id ){
          vueVariable[PermissonVariable] = true;
          console.log('有该权限,权限id'+roleObject[index])
         }
    })
  },
  checkRolePermission2(id,roleObject){
     //检测角色是否有权限显示某个按钮的方法，id为权限id roleObject为后台传入的数据树，permissonVariable为对应变量名，vueVariable为绑定的数据变量名
    let that = this;
    let flag = false
    roleObject.forEach(function(val,index){
         if(roleObject[index] ==  id ){
           flag = true
         }
    })
    return flag
  },
  checkConstractFlow(flowId,array,id,FlowArray){ 
      let that = this;
      array.forEach(function(val,index){

        if(array[index] == flowId){
          if(FlowArray.indexOf(id)<0){
            FlowArray.push(id);
            console.log(FlowArray)
          }      
        }
      })
  }
}