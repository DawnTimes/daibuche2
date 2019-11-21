<template>
  <div class="main">
    <div class="userPage">
      <header class="car-management-header">
        用  户  管  理
      </header>      
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="登录名">
          <el-input v-model="params.username" placeholder="登录名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="params.label" placeholder="姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-row type="flex" class="row-bg fr">
        <el-button icon="el-icon-plus" type="primary" plain round @click="adduser" v-show="rolePermission.userAdd">新增</el-button>
      </el-row>      
    </div>

    <el-table :data="tableData" stripe :height="GLOBAL.height" border :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}">
      <el-table-column fixed type="index" label="序号" :index="indexMethod" resizable width="100" align="center"></el-table-column>
      <el-table-column prop="username" label="登录名" resizable></el-table-column>
      <el-table-column prop="label" label="姓名" resizable></el-table-column>
      <!-- <el-table-column prop="phone" label="手机号码" resizable></el-table-column> -->
      <!-- <el-table-column prop="deptName" label="所属部门"></el-table-column> -->
      <el-table-column prop="roleName" label="角色" resizable></el-table-column>
      <!-- 1无效 0有效 -->
      <el-table-column prop="delFlagView" label="状态" resizable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" resizable></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button size="mini">查看</el-button> -->
          <el-button size="mini" @click="edituser(scope.$index, scope.row)" v-show="rolePermission.userEdit">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)" v-show="rolePermission.userDelete">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="paginationClass"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="prev, pager, next, sizes, jumper"
      :total="totalCount"
    ></el-pagination>
    <confirmBox
      v-if="showMsgconfirmBox"
      :msgConfirBox="msgConfirBox"
      @submitForm="confirmSubmitForm()"
      @cancelbox="cancelbox()"
    ></confirmBox>    
  </div>
</template>
<script>
import axios from "@/common/axios.js";
import common from "@/common/common.js";
import confirmBox from "@/components/page/common/confirmBox";
export default {
  components: {
    confirmBox
  },  
  data() {
    return {
      rolePermission:{
        'userInfo':false,
        'userAdd':false,
        'userEdit':false,
        'userDelete':false
      },
      rolePermissionArray:[21,22,23,24],
      rowData: {},
      showMsgconfirmBox: false,      
      totalCount: 0,
      currentPage: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      params: {
        username: "",
        label: "",
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10
      },
      realParams: {
        username: "",
        label: "",
      },
      msgConfirBox: {
        icon: "icontixing",
        confirst: "确认删除该用户",
        consecond: "删除后不可恢复"
      }      
    };
  },
  created() {
    this.initData()
  },
  mounted(){
    let that = this;

    that.rolePermissionArray.forEach((item,index,array)=>{
    common.checkRolePermission(item,this.$store.state.asideInfoIds,Object.keys(that.rolePermission)[index],that.rolePermission);

    })
  },
  methods: {
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1)
      return index + order + 1
    },      
    initData() {
      let url = common.userPageUrl
      axios.get(url, this.params).then(res => {
          let temp = res.records
          // 对数据进行改造
          temp.forEach((obj, index) => {
            let roleTemp = []
            let roleTemp2 = []

            if (obj.roleList) {
              obj.roleList.forEach((obj2, index2) => {
                roleTemp.push(obj2.roleName)
                roleTemp2.push(obj2.roleId)
              })
            }

            obj.roleName = roleTemp
            obj.roleId = roleTemp2
          })

          temp.forEach((obj, index) => {
            if (obj.roleName) obj.roleName = obj.roleName.join('/')
            if (obj.createTime) obj.createTime = obj.createTime.substr(0,10)
            // 0有效
            if (obj.delFlag === '0') {
              obj.delFlagView = '有效'
            }
            if (obj.delFlag === '1') {
              obj.delFlagView = '无效'
            }
          })
          this.tableData = temp
          console.log(this.tableData)

          this.totalCount = parseInt(res.total)
      })
    },
    initData2() {
      this.realParams.turnPageBeginPos = this.params.turnPageBeginPos
      this.realParams.turnPageShowNum = this.params.turnPageShowNum      
      let url = common.userPageUrl
      axios.get(url, this.realParams).then(res => {
          let temp = res.records
          // 对数据进行改造
          temp.forEach((obj, index) => {
            let roleTemp = []
            let roleTemp2 = []

            if (obj.roleList) {
              obj.roleList.forEach((obj2, index2) => {
                roleTemp.push(obj2.roleName)
                roleTemp2.push(obj2.roleId)
              })
            }

            obj.roleName = roleTemp
            obj.roleId = roleTemp2
          })

          temp.forEach((obj, index) => {
            if (obj.roleName) obj.roleName = obj.roleName.join('/')
            if (obj.createTime) obj.createTime = obj.createTime.substr(0,10)
            // 0有效
            if (obj.delFlag === '0') {
              obj.delFlagView = '有效'
            }
            if (obj.delFlag === '1') {
              obj.delFlagView = '无效'
            }
          })
          this.tableData = temp
          console.log(this.tableData)

          this.totalCount = parseInt(res.total)
      })
    },
    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.params.turnPageBeginPos = 1;
      this.pageSize = pageSize;
      this.params.turnPageShowNum = pageSize;
      this.initData2();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.params.turnPageBeginPos = (currentPage - 1) * this.pageSize + 1;
      this.initData2();
    },
    onSubmit() {
      this.params.turnPageBeginPos = 1
      this.currentPage = 1      
      this.initData()
      Object.assign(this.realParams, this.params)
    },
    adduser() {
      this.$router.push({
        path: "/addusermanage"
      });
    },
    deleteUser(index, row) {
      this.rowData = row
      this.showMsgconfirmBox = true;
    },
    confirmSubmitForm() {
      this.showMsgconfirmBox = false;
      // 执行删除
      let url = common.userUrl + '/' + this.rowData.userId
      // axios.delete(url, {id:this.rowData.userId}).then(res => {
      axios.delete(url, {}).then(res => {
        if (res.status === 'SUCCEED') {
            let _this = this
            _this.$message({message: "操作成功!",type: "success",duration: 1500})
            this.initData();
        } else {
            this.$alert('操作失败，请联系管理员!', '提示', {confirmButtonText: '确定'})
        }
      })      

      
    },
    cancelbox() {
      this.showMsgconfirmBox = false;
    },    
    edituser(index,row){
      this.$router.push({
        path: "/editusermanage",
        query:{
          row:row
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
}
 .car-management-header{
  // width: 100%;
  height: 40px;
  font-size: 22px;
  color: #666;
  // position:absolute;
  // left: 0;
  // top: 10px;
  padding: 10px 0 0 20px;
  box-sizing: border-box;
}
.main {
  background: #fff;
  padding: 0;
}
.userPage {
  display: flex;
  align-items: center;
  justify-content:  space-between;;
}
.el-row {
  margin-top: 10px;
  padding-right: 40px;
  .el-button.is-round {
    padding: 12px 40px;
  }
}
.paginationClass {
  margin: 1% 1% 0 0;
  text-align: right;
}
.el-form-item {
    margin: 15px 0 10px 0;
}
</style>
