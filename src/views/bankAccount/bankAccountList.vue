<!--
 * @Author: 廖亿晓
 * @Date: 2020-09-02 14:38:14
 * @LastEditTime: 2020-09-16 13:44:32
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\bankAccount\bankAccountList.vue
-->

<template>
  <div class="bankAccountList">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="80px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="账户名称:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" placeholder></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" placeholder></el-input>
        </el-form-item>
        <el-form-item label="开户行:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="addBankAccount">新增账户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        :max-height="tableHeight"
        ref="table"
        style="width: 100%"
        :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
      }"
      >
        <el-table-column
          width="50"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column prop label="账户名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="账号" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="开户行" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="创建人" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="修改人" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="修改时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-layer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

  <!-- 新增、编辑 -->
    <bankAccount-dialog
      ref="bankAccountDialog"
      :bankAccountForm="bankAccountForm"
      :formReadonly="formReadonly"
      :loading="status.loading"
      :title="dialog.title"
      @formDataSubmit="formDataSubmit"
    ></bankAccount-dialog>

    <!-- 删除 -->
    <confirmBox
      v-if="showDeleteBox"
      :msgConfirBox="deleteInfoText"
      v-on:submitForm="deleteSubmit"
      v-on:cancelbox="cancelBack"
    ></confirmBox>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import bankAccountDialog from './components/bankAccountDialog'; // 新增编辑弹框
import confirmBox from '@/components/confirmBox';  // 删除弹框

export default {
  name: 'bankAccountList',
  props: {},
  components: {
    bankAccountDialog,
    confirmBox,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {},

      tableData: [{ id: 123456 }],
      tableHeight: 100,

      bankAccountForm: {
        bankAccountName: '',
        bankAccountNo: '',
        bankAccountAddr: '',
        remark: '',
      },
      formReadonly: {
        hide: [],
        readonly: [],
      },
      status: {
        loading: false,
      },
      dialog: {
        title: '',
      },

      // 删除提示文本
      deleteInfoText: {
        icon: 'icon-jinggao',
        confirst: '确认删除该银行账户？',
        consecond: '警告：删除后不可恢复！'
      },
      showDeleteBox: false,
      
      // 按钮权限
      rightArray: [9551],
      rightControl: {
        detail: false,
      },
    };
  },
  computed: {
    
  },
  watch: {},
  created() {
    // 判断权限
    this.rightArray.forEach((item, index, array) => {
      common.checkRolePermission(
        item,
        this.$store.state.asideInfoIds,
        Object.keys(this.rightControl)[index],
        this.rightControl
      );
    });

    this.$nextTick(function () {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 110;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 110;
      };
    });
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },
  // 添加组件内的导航钩子，在跳转路由前，将监听窗口大小变化的函数清空
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.tableHeight = 500
    window.onresize = function () {
      // console.log('离开了')
    };
    next();
  },
  mounted() {},
  methods: {
    // 查询
    queryForm() {},

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
    },

    // 新增账户
    addBankAccount() {
      this.dialog.title = '新增账户';
      this.$refs.bankAccountDialog.isShow(true);
    },

    // 修改
    handleUpdate(row) {
      this.dialog.title = '账户编辑';
      this.$refs.bankAccountDialog.isShow(true);
    },

    // 弹框提交
    formDataSubmit() {
      this.$refs.bankAccountDialog.isShow(false);
    },

    // 删除
    handleDelete(row) {
      this.showDeleteBox = true;
    },

    // 删除确认
    deleteSubmit() {
      this.showDeleteBox = false;
    },

    // 取消删除
    cancelBack() {
      this.showDeleteBox = false;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.bankAccountList {
}
</style>
