<template>
  <div class="main">
    <div class="userPage">
      <!-- <header class="car-management-header">角 色 管 理</header> -->
      <el-form :inline="true" label-width="80px" :model="params" class="demo-form-inline fl" size="small">
        <el-form-item label="角色名称">
          <el-input v-model="params.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input v-model="params.roleCode" placeholder="角色代码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" class="row-bg fr" justify="end">
        <el-button
          icon="el-icon-plus"
          type="primary"
          plain
          round
          @click="adduser"
          v-show="rolePermission.roleAdd"
        >新增</el-button>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      :height="GLOBAL.height"
      border
      :cell-style="{'text-align': 'center', 'height': '40px'}"
      :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}"
    >
      <el-table-column
        fixed
        type="index"
        label="序号"
        :index="indexMethod"
        resizable
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="roleName" label="角色名称" resizable></el-table-column>
      <el-table-column prop="roleCode" label="角色代码" resizable></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" resizable></el-table-column>
      <!-- <el-table-column prop="deptName" label="所属部门"></el-table-column> -->
      <el-table-column prop="createTime" label="创建时间" resizable></el-table-column>
      <el-table-column fixed="right" label="操作" width="300" resizable>
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="roledetail()">查看</el-button> -->
          <el-button size="mini" type="primary" @click="editRole(scope.row)" v-show="rolePermission.roleEdit">修改</el-button>
          <el-button
            size="mini"
            @click="setAuth(scope.row)"
            v-show="rolePermission.assignPermission"
          >权限设定</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="del(scope.row)"
            v-show="rolePermission.roleDelete"
          >删除</el-button>
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
import axios from '@/common/axios.js';
import confirmBox from '@/components/confirmBox';
import common from '@/common/common.js';
export default {
  components: {
    confirmBox,
  },
  data() {
    return {
      rolePermission: {
        roleView: false,
        roleAdd: false,
        roleEdit: false,
        roleDelete: false,
        assignPermission: false,
      },
      rolePermissionArray: [41, 42, 43, 44, 45],
      rowData: {},
      showMsgconfirmBox: false,
      totalCount: 0,
      currentPage: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      params: {
        roleName: '',
        roleCode: '',
        page: 1, // 开始是数据的序号，后台需要
        limit: 10,
      },
      realParams: {
        roleName: '',
        roleCode: '',
      },
      msgConfirBox: {
        icon: 'icon-jinggao',
        confirst: '确认删除该角色',
        consecond: '删除后不可恢复',
      },
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    let that = this;
    that.rolePermissionArray.forEach((item, index, array) => {
      common.checkRolePermission(
        item,
        this.$store.state.asideInfoIds,
        Object.keys(that.rolePermission)[index],
        that.rolePermission
      );
    });
  },
  methods: {
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1);
      return index + order + 1;
    },
    initData() {
      let url = common.rolePageUrl;
      axios.get(url, this.params).then((res) => {
        console.log(res);
        res.records.forEach((obj, index) => {
          obj.createTime = obj.createTime.substr(0, 10);
        });
        this.tableData = res.records;
        this.totalCount = parseInt(res.total);
      });
    },
    initData2() {
      this.realParams.page = this.params.page;
      this.realParams.limit = this.params.limit;
      let url = common.rolePageUrl;
      axios.get(url, this.realParams).then((res) => {
        console.log(res);
        res.records.forEach((obj, index) => {
          obj.createTime = obj.createTime.substr(0, 10);
        });
        this.tableData = res.records;
        this.totalCount = parseInt(res.total);
      });
    },
    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.pageSize = pageSize;
      this.params.page = 1;
      this.params.limit = pageSize;
      this.initData2();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.params.page = currentPage;
      this.initData2();
    },
    onSubmit() {
      this.params.page = 1;
      this.currentPage = 1;
      this.initData();
      Object.assign(this.realParams, this.params);
    },
    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
    adduser() {
      this.$router.push({
        path: '/addrole',
      });
    },
    editRole(rowData) {
      // console.log(rowData);
      this.$router.push({ path: '/editrole', query: rowData });
    },
    setAuth(rowData) {
      this.$router.push({ path: '/auth', query: rowData });
    },
    roledetail() {
      this.$router.push({
        path: '/roledetail',
      });
    },
    del(rowData) {
      this.rowData = rowData;
      this.showMsgconfirmBox = true;
    },
    confirmSubmitForm() {
      this.showMsgconfirmBox = false;
      // 执行删除
      let url = common.roleUrl + '/' + this.rowData.roleId;
      // axios.delete(url, {id: this.rowData.roleId}).then(res => {
      axios.delete(url, {}).then((res) => {
        if (res.status === 'SUCCEED') {
          let _this = this;
          _this.$message({
            message: '操作成功!',
            type: 'success',
            duration: 1500,
          });
          this.initData();
        } else {
          this.$alert('操作失败，请联系管理员!', '提示', {
            confirmButtonText: '确定',
          });
        }
      });
    },
    cancelbox() {
      this.showMsgconfirmBox = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
}
.car-management-header {
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
  justify-content: space-between;
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
  margin: 15px 0;
}

// .el-form-item {
//     margin-bottom: 0px;
// }
</style>
