<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 10:58:18
 * @LastEditTime: 2020-09-03 18:00:03
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\invoiceNotice\invoiceNoticeList.vue
-->

<template>
  <div class="invoiceNoticeList">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="80px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="生成时间:" prop="systemName">
          <el-date-picker
            v-model="formData.value1"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="购方名称:" prop="interfaceName">
          <el-input maxlength="50" v-model="formData.interfaceName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="购方税号:" prop="systemCode">
          <el-input maxlength="30" v-model="formData.systemCode" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="systemName">
          <el-input maxlength="100" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

        <!-- <el-form-item label>
          <el-button type="primary" @click="exportButton">导出</el-button>
        </el-form-item>-->
      </el-form>

      <div class="batchBtn">
        <el-button size="medium" type="primary" @click="createInvoice" v-show="rightControl.add">生成开票明细</el-button>
        <el-button size="medium" type="primary" @click="importButton" v-show="rightControl.import">导入开票明细</el-button>
        <el-button size="medium" type="primary" @click="exportButton" v-show="rightControl.export">导出开票明细</el-button>
        <el-button size="medium" type="primary" @click="exportButton" v-show="rightControl.exportBtn">批量导出通知单</el-button>
      </div>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        :max-height="tableHeight"
        ref="table"
        style="width: 100%"
        :cell-style="{'text-align': 'center', 'height': '40px'}"
        :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
      }"
      >
        <el-table-column width="50" align="center" type="selection" fixed></el-table-column>
        <el-table-column
          width="50"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column align="center" prop label="单据号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="生成时间" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="购方名称" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="id" label="购方税号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="购方地址电话" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="购方银行帐号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="销方地址电话" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="销方银行帐号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="300"></el-table-column>
        <el-table-column align="center" prop label="商品名称" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="规格" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="商品编码" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="计量单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="金额" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="税率" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="复核人" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="收款人" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="折扣金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="扣除额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="特殊票种" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="接收人邮件" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="发票号码" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="开票时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleNotice(scope.row)" v-show="rightControl.notice">通知单</el-button>
            <el-button size="mini" plain @click="handleRegister(scope.row)" v-show="rightControl.register">登记</el-button>
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
        :page-sizes="[10, 20, 50, 100, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 登记弹框 -->
    <invoiceRegister-dialog
      ref="invoiceRegisterDialog"
      :registerForm="registerForm"
      :loading="status.loading"
      @formDataSubmit="formDataSubmit"
    ></invoiceRegister-dialog>

    <!-- 生成明细弹框 -->
    <createInvoice-dialog
      ref="createInvoiceDialog"
      :invoiceForm="invoiceForm"
      :loading="status.createLoading"
      @createInvoiceSubmit="createInvoiceSubmit"
    ></createInvoice-dialog>

    <!-- // 导入开票明细 -->
    <upload-dialog ref="uploadDialog"></upload-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import moment from 'moment';
import { mapState } from 'vuex';

import invoiceRegisterDialog from './components/invoiceRegisterDialog'; // 登记弹框
import createInvoiceDialog from './components/createInvoiceDialog'; // 生成开票明细弹框
import uploadDialog from '@/components/uploadDialog';  // 上传弹框

export default {
  name: '',
  props: {},
  components: {
    invoiceRegisterDialog,
    createInvoiceDialog,
    uploadDialog,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {},

      tableData: [
        {
          id: 123456,
          remark:
            'GALC-ZL-1811010024，第20期，本金，2548.17，第20期，利息，2011.83',
        },
        { id: 123456, status: '全部核销' },
      ],
      tableHeight: 100,

      registerForm: {},
      status: {
        loading: false,
        createLoading: false,
      },
      invoiceForm: {},

      // 按钮权限
      rightArray: [9911, 9912, 9913, 9914, 9915, 9916],
      rightControl: {
        add: false,
        import: false,
        export: false,
        notice: false,
        register: false,
        exportBtn: false,
      },
    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
    }),
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
        window.innerHeight - this.$refs.table.$el.offsetTop - 120;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 120;
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

    // 导入开票明细
    importButton() {
      this.$refs.uploadDialog.isShow(true);
    },

    // 导出
    exportButton() {},

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

    // 通知单
    handleNotice(row) {
      this.$router.push({
        path: '/invoiceNoticeLetter',
        query: {
          id: row.id,
        },
      })
    },

    // 登记弹窗
    handleRegister(row) {
      this.registerForm.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.registerForm.userId = this.userId;
      this.registerForm.id = row.id;
      this.registerForm.remark = row.remark;
      this.$refs.invoiceRegisterDialog.isShow(true);
    },

    // 登记确定
    formDataSubmit() {
      this.$refs.invoiceRegisterDialog.isShow(false);
    },

    // 生成开票明细弹框
    createInvoice() {
      this.$refs.createInvoiceDialog.isShow(true);
    },

    // 确定生成开票明细
    createInvoiceSubmit() {
      this.$refs.createInvoiceDialog.isShow(true);
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.invoiceNoticeList {
  .batchBtn {
    padding-bottom: 10px;
    padding-top: 10px;
  }
}
</style>

