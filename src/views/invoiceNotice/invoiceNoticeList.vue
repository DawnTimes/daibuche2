<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 10:58:18
 * @LastEditTime: 2020-10-29 16:09:11
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
        label-width="100px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="购方名称:" prop="buyName">
          <el-input
            maxlength="50"
            v-model="formData.buyName"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="购方税号:" prop="buyCreditCode">
          <el-input
            maxlength="50"
            v-model="formData.buyCreditCode"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="销方名称:" prop="sellName">
          <el-input
            maxlength="50"
            v-model="formData.sellName"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input
            maxlength="200"
            v-model="formData.remark"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="生成时间:" prop="dateTime">
          <el-date-picker
            v-model="formData.dateTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeTime"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')"
            >重置</el-button
          >
        </el-form-item>

        <el-form-item label>
          <el-button
          size="medium"
          type="primary"
          icon="el-icon-plus"
          @click="createInvoice"
          v-show="rightControl.add"
          >生成开票明细</el-button
        >
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-upload2"
          @click="importButton"
          v-show="rightControl.import"
          >导入开票明细</el-button
        >
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-download"
          @click="exportButton"
          :loading="exportLoading"
          v-show="rightControl.export"
          >导出开票明细</el-button
        >
        </el-form-item>
      </el-form>

      <!-- <div class="batchBtn">
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-plus"
          @click="createInvoice"
          v-show="rightControl.add"
          >生成开票明细</el-button
        >
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-upload2"
          @click="importButton"
          v-show="rightControl.import"
          >导入开票明细</el-button
        >
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-download"
          @click="exportButton"
          :loading="exportLoading"
          v-show="rightControl.export"
          >导出开票明细</el-button
        >
        <el-button
          size="medium"
          type="primary"
          @click="exportButton"
          v-show="rightControl.exportBtn"
          >批量导出通知单</el-button
        >
      </div> -->
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        border
        stripe
        :max-height="tableHeight"
        ref="table"
        style="width: 100%"
        :header-cell-style="{
          'text-align': 'center',
          'font-weight': 'bold',
          background: '#627CAF',
          color: '#fff',
        }"
      >
        <el-table-column
          width="50"
          align="center"
          type="selection"
          fixed
        ></el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column
          prop="billingNo"
          label="单据号"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="生成时间"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyName"
          label="购方名称"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <!-- 自适应列宽 -->
        <!-- <af-table-column label="购方名称" prop="buyName"></af-table-column> -->
        <el-table-column
          prop="buyCreditCode"
          label="购方税号"
          show-overflow-tooltip
          width="150"
        ></el-table-column>
        <el-table-column
          prop="buyAddTel"
          label="购方地址电话"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <el-table-column
          prop="buyBankNameNo"
          label="购方银行帐号"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <el-table-column
          prop="sellName"
          label="销方名称"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <el-table-column
          prop=""
          label="销方地址电话"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <el-table-column
          prop="sellBankNameNo"
          label="销方银行帐号"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="400"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="tradeName"
          label="商品名称"
          show-overflow-tooltip
          width="150"
        ></el-table-column>
        <el-table-column
          prop=""
          label="规格"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop=""
          label="商品编码"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop=""
          label="计量单位"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="amount"
          label="金额"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.amount | moneyFormat }}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="tax"
          label="税率"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop=""
          label="复核人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop=""
          label="收款人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop=""
          label="折扣金额"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop=""
          label="扣除额"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop=""
          label="特殊票种"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop="receiverAddr"
          label="接收人邮件"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop="invoiceNumber"
          label="发票号码"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          prop="invoiceDate"
          label="发票开具时间"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          prop=""
          label="收据号码"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          prop=""
          label="收据开具时间"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleNotice(scope.row)"
              v-show="rightControl.notice"
              >通知单</el-button
            >
            <el-button
              size="mini"
              plain
              @click="handleRegister(scope.row)"
              v-show="rightControl.register"
              >登记</el-button
            >
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
    <upload-dialog
      ref="uploadDialog"
      :uploadURLStr="invoiceUploadURL"
    ></upload-dialog>
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
import uploadDialog from '@/components/uploadDialog'; // 上传弹框

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
      formData: {
        buyCreditCode: '',
        buyName: '',
        remark: '',
        dateTime: [],
        startCreateTime: '',
        endCreateTime: '',
        pageSize: 10,
        pageNum: 1,
        sellName: '',
      },

      tableData: [],
      tableHeight: 100,
      tableLoading: false,

      registerForm: {
        contractId: '',
        invoiceDate: '',
        invoiceNumber: '',
        payDay: '',
      },
      status: {
        loading: false,
        createLoading: false,
      },
      invoiceForm: {
        applyDate: '',
      },

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

      // 导入URL
      invoiceUploadURL: '',
      exportLoading: false,
    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
      successStatus: (store) => store.successStatus,
    }),
  },
  watch: {
    // 监听是否导入成功，成功则刷新催收记录
    successStatus(val) {
      if (val) {
        this.getInvoiceNoticeListData();
      }
    }
  },
  
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

  mounted() {
    this.getInvoiceNoticeListData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getInvoiceNoticeListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getInvoiceNoticeListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 选择生成日期
    changeTime(val) {
      console.log(val);
      console.log(this.formData.startCreateTime = val[0]);
      console.log(this.formData.endCreateTime = val[1]);
      if (val) {
        this.formData.startCreateTime = val[0];
        this.formData.endCreateTime = val[1];
      } else {
        this.formData.startCreateTime = '';
        this.formData.endCreateTime = '';
      }
    },

    // 获取分页数据
    getInvoiceNoticeListData() {
      const url = common.queryInvoiceNoticeDetailUrl;
      const params = {
        buyCreditCode: this.formData.buyCreditCode,
        buyName: this.formData.buyName,
        remark: this.formData.remark,
        startCreateTime: this.formData.startCreateTime,
        endCreateTime: this.formData.endCreateTime,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };
      this.tableLoading = true;
      axios
        .post(url, params)
        .then((res) => {
          if (res.ec === '0') {
            const data = res.data;
            this.tableData = data.invoiceList;
            this.total = data.turnPageTotalNum * 1;
            this.tableLoading = false;
          } else {
            this.tableLoading = false;
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },

    // 导入开票明细
    importButton() {
      (this.invoiceUploadURL = common.importSubcarInvoiceNoticeUrl),
        this.$refs.uploadDialog.isShow(true);
    },

    // 导出明细
    exportButton() {
      // this.exportLoading = true;
      window.location.href = `/api/${
        common.exportSubcarInvoiceListUrl
      }?buyName=${
        this.formData.buyName ? this.formData.buyName : ''
      }&buyCreditCode=${
        this.formData.buyCreditCode ? this.formData.buyCreditCode : ''
      }&remark=${
        this.formData.remark ? this.formData.remark : ''
      }&startCreateTime=${
        this.formData.startCreateTime ? this.formData.startCreateTime : ''
      }&endCreateTime=${
        this.formData.endCreateTime ? this.formData.endCreateTime : ''}`;

      // setTimeout(() => {
      //   this.exportLoading = false;
      // }, 1000);

      // window.open(`/api/${
      //   common.exportSubcarInvoiceListUrl
      // }?buyName=${
      //   this.formData.buyName ? this.formData.buyName : ''
      // }&buyCreditCode=${
      //   this.formData.buyCreditCode ? this.formData.buyCreditCode : ''
      // }&remark=${
      //   this.formData.remark ? this.formData.remark : ''}`, '_parent');
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
      this.getInvoiceNoticeListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getInvoiceNoticeListData();
    },

    // 通知单
    handleNotice(row) {
      this.$router.push({
        path: '/invoiceNoticeLetter',
        query: {
          contractId: row.contractId,
        },
      });

      this.$store.commit('setLetterContractId', row.contractId);
    },

    // 登记弹窗
    handleRegister(row) {
      // this.registerForm.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      // this.registerForm.userId = this.userId;
      this.registerForm.contractId = row.contractId;
      this.registerForm.payDay = row.payDay;
      // this.registerForm.buyName       = row.buyName;
      // this.registerForm.buyCreditCode = row.buyCreditCode;
      // this.registerForm.remark        = row.remark;
      this.$refs.invoiceRegisterDialog.isShow(true);
    },

    // 登记确定
    formDataSubmit(obj) {
      const data = obj.data;
      const url = common.invoiceRegisterUrl;
      this.status.loading = true;
      axios
        .post(url, data)
        .then((res) => {
          if (res.ec === '0') {
            this.status.loading = false;
            this.$refs.invoiceRegisterDialog.isShow(false);
            this.$notify.success({
              title: '温馨提示',
              message: '登记成功',
            });
            this.getInvoiceNoticeListData();
          } else {
            this.status.loading = false;
            this.$notify.error({
              title: '温馨提示',
              message: res.em || '登记失败',
            });
          }
        })
        .catch((err) => {
          this.status.loading = false;
          this.$notify.error({
            title: '温馨提示',
            message: err ? err.em : '登记失败',
          });
        });
    },

    // 生成开票明细弹框
    createInvoice() {
      this.$refs.createInvoiceDialog.isShow(true);
    },

    // 确定生成开票明细
    createInvoiceSubmit(obj) {
      const data = obj.data;
      data.creater = this.userId;
      const url = common.createInvoiceDetailUrl;
      this.status.createLoading = true;
      axios
        .post(url, data)
        .then((res) => {
          if (res.ec === '0') {
            this.status.createLoading = false;
            this.$refs.createInvoiceDialog.isShow(false);
            this.invoiceForm.applyDate = '';
            this.$notify.success({
              title: '温馨提示',
              message: '生成开票明细成功',
            });
            this.getInvoiceNoticeListData();
          } else {
            this.status.createLoading = false;
            this.$notify.error({
              title: '温馨提示',
              message: res.em || err.error || res.message || '生成开票明细失败',
            });
          }
        })
        .catch((err) => {
          this.status.createLoading = false;
          this.$notify.error({
            title: '温馨提示',
            message: err.em || err.error || err.message || '生成开票明细失败',
          });
        });
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

