<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 10:58:18
 * @LastEditTime: 2020-12-03 10:25:43
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
        label-width="90px"
        size="mini"
        ref="ruleForm"
      >
        <el-form-item label="购方名称" prop="buyName">
          <el-input
            maxlength="50"
            v-model="formData.buyName"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="购方税号" prop="buyCreditCode">
          <el-input
            maxlength="50"
            v-model="formData.buyCreditCode"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="销方名称" prop="sellName">
          <el-input
            maxlength="50"
            v-model="formData.sellName"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="是否开票" prop="isOpen">
          <el-select v-model="formData.isOpen" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in this.$options.filters.isOpenStatus([])"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            maxlength="200"
            v-model="formData.remark"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="申请时间" prop="applyDate">
          <!-- <el-date-picker
            v-model="formData.dateTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeTime"
          ></el-date-picker> -->
          <el-date-picker
            v-model="formData.applyDate"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择日期">
          </el-date-picker>
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
          type="primary"
          icon="el-icon-plus"
          @click="createInvoice"
          v-show="rightControl.add"
          >生成开票明细</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-upload2"
          @click="importButton"
          v-show="rightControl.import"
          >导入开票明细</el-button
        >
        <el-button
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
        <!-- <el-table-column
          width="40"
          align="center"
          type="selection"
          fixed
        ></el-table-column> -->
        <el-table-column
          width="70"
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
          prop="applyDate"
          label="申请时间"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.applyDate | timeFormat }}</span>
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
        <!-- <el-table-column
          prop=""
          label="销方地址电话"
          show-overflow-tooltip
          width="200"
        ></el-table-column> -->
        <el-table-column
          prop="sellBankNameNo"
          label="销方银行帐号"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="380"
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
        >
          <template slot-scope="scope">
            <span>{{ scope.row.tax }}</span>
          </template>
        </el-table-column>
        
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
          width="120"
        ></el-table-column>
        <el-table-column
          prop=""
          label="扣除额"
          show-overflow-tooltip
          width="120"
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
          width="140"
        ></el-table-column>
        <el-table-column
          prop="isOpen"
          label="是否开票"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span :class="{ greenStatus: scope.row.isOpen == 'Y' , redStatus: scope.row.isOpen == 'N' }">{{ scope.row.isOpen | isOpenStatus }}</span>
          </template>
        </el-table-column>
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
          width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
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
        ></el-table-column> -->
        <el-table-column label="操作" width="180" align="center" fixed="right">
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
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              v-show="rightControl.register"
              >删除</el-button
            > -->
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

    <!-- 导出提示 -->
    <downConfirmBox
      v-if="showDownBox"
      :msgConfirBox="downInfoText"
      v-on:submitForm="downSubmit"
      :loading="exportLoading"
      v-on:cancelbox="downCancelBack"
    ></downConfirmBox>

    <!-- 删除提示 -->
    <deleteConfirmBox
      v-if="showDeleteBox"
      :msgConfirBox="deleteInfoText"
      v-on:submitForm="deleteSubmit"
      v-on:cancelbox="cancelBack"
    ></deleteConfirmBox>
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
import downConfirmBox from '@/components/confirmBox';  // 导出弹框
import deleteConfirmBox from '@/components/confirmBox';  // 删除弹框

export default {
  name: 'invoiceNoticeList',
  props: {},
  components: {
    invoiceRegisterDialog,
    createInvoiceDialog,
    uploadDialog,
    downConfirmBox,
    deleteConfirmBox,
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
        isOpen: '',
        pageSize: 10,
        pageNum: 1,
        sellName: '',
        applyDate: '',
      },

      tableData: [],
      tableHeight: 100,
      tableLoading: false,

      registerForm: {
        contractId: '',
        invoiceDate: '',
        invoiceNumber: '',
        // payDate: '',
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

      // 导出提示文本
      downInfoText: {
        icon: 'icon-jinggao',
        confirst: '确认要导出开票明细？',
        // consecond: '警告：导出后不可恢复！'
      },
      // 导出框显示
      showDownBox: false,
      exportLoading: false,

      // 删除提示文本
      deleteInfoText: {
        icon: 'icon-jinggao',
        confirst: '确认删除该银行流水？',
        consecond: '警告：删除后不可恢复！'
      },
      // 删除框显示
      showDeleteBox: false,
      // 删除的系统ID
      deleteId: null,
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
      // console.log(val);
      // console.log(this.formData.startCreateTime = val[0]);
      // console.log(this.formData.endCreateTime = val[1]);
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
      this.tableData = [];
      const url = common.queryInvoiceNoticeDetailUrl;
      const params = {
        buyCreditCode: this.formData.buyCreditCode.trim(),
        buyName: this.formData.buyName.trim(),
        remark: this.formData.remark.trim(),
        isOpen: this.formData.isOpen,
        applyDate: this.formData.applyDate,
        sellName: this.formData.sellName.trim(),
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
            // 经租直租默认税率13%
            if (!_.isEmpty(this.tableData)) {
              this.tableData.forEach((item) => {
                item.tax = 0.13
              })
            }
            
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
      this.invoiceUploadURL = common.importSubcarInvoiceNoticeUrl;
      this.$refs.uploadDialog.isShow(true);
    },


    download() {
      let _that = this;
      let url = `/api${
        common.exportSubcarInvoiceListUrl
      }?buyName=${
        this.formData.buyName ? this.formData.buyName.trim() : ''
      }&buyCreditCode=${
        this.formData.buyCreditCode ? this.formData.buyCreditCode.trim() : ''
      }&remark=${
        this.formData.remark ? this.formData.remark.trim() : ''
      }&sellName=${
        this.formData.sellName ? this.formData.sellName.trim() : ''
      }&isOpen=${
        this.formData.isOpen ? this.formData.isOpen : ''
      }&applyDate=${
        this.formData.applyDate ? this.formData.applyDate : ''}`;

      // 原生ajax下载
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);    // 也可以使用POST方式，根据接口
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 设置请求头类型
      xhr.responseType = "blob";  // 返回类型blob
      // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
      xhr.onload = function () {
        // console.log(xhr);
        // console.log(xhr.getAllResponseHeaders()); //返回全部头信息,string
          // 请求完成
          if (xhr.readyState == 4) {
            if (xhr.status === 200) {
              _that.exportLoading = false;
              _that.showDownBox = false;
                // 返回200
                let blob = xhr.response;
                let reader = new FileReader(); // 调用FileReader对象的方法
                reader.readAsDataURL(blob);  // 该方法将文件读取为一段以 data: 开头的字符串，这段字符串的实质就是 Data URL，Data URL是一种将小文件直接嵌入文档的方案。这里的小文件通常是指图像与 html 等格式的文件。 转换为base64，可以直接放入a表情href
                reader.onload = function (e) {
                  // console.log(e);
                    // 转换完成，创建一个a标签用于下载
                    let Ee = document.createElement('a');
                    let currentTime = moment().format('YYYYMMDD'); // 当前时间
                    Ee.download = '开票明细' + currentTime +  '.xlsx';
                    Ee.href = e.target.result;
                    // $("body").append(a);  // 修复firefox中无法触发click
                    Ee.click();
                    Ee.remove();
                    // $(a).remove();
                }
            } else {
              _that.exportLoading = false;
              _that.$notify.error({
                title: '温馨提示！',
                message: xhr.statusText || '导出失败，请联系管理员！'
              })
            }
          }
          
      };
      
      // 进程结束
      xhr.onloadend = function () {
        // _that.exportLoading = false;
        // _that.showDownBox = false;
      }
      // 发送ajax请求
      xhr.send()
    },

    // 导出明细
    exportButton() {
      this.showDownBox = true;
      
      // window.location.href = `/api${
      //   common.exportSubcarInvoiceListUrl
      // }?buyName=${
      //   this.formData.buyName ? this.formData.buyName : ''
      // }&buyCreditCode=${
      //   this.formData.buyCreditCode ? this.formData.buyCreditCode : ''
      // }&remark=${
      //   this.formData.remark ? this.formData.remark : ''
      // }&startCreateTime=${
      //   this.formData.startCreateTime ? this.formData.startCreateTime : ''
      // }&endCreateTime=${
      //   this.formData.endCreateTime ? this.formData.endCreateTime : ''}`;



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

    // 确定下载
    downSubmit() {
      this.exportLoading = true;
      this.download();

      // window.location.href = `/api${
      //   common.exportSubcarInvoiceListUrl
      // }?buyName=${
      //   this.formData.buyName ? this.formData.buyName.trim() : ''
      // }&buyCreditCode=${
      //   this.formData.buyCreditCode ? this.formData.buyCreditCode.trim() : ''
      // }&remark=${
      //   this.formData.remark ? this.formData.remark.trim() : ''
      // }&sellName=${
      //   this.formData.sellName ? this.formData.sellName.trim() : ''
      // }&isOpen=${
      //   this.formData.isOpen ? this.formData.isOpen : ''
      // }&applyDate=${
      //   this.formData.applyDate ? this.formData.applyDate : ''}`;
    },
    // 取消下载
    downCancelBack() {
      this.showDownBox = false;
      this.exportLoading = false;
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
      console.log(row);
      // this.registerForm.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      // this.registerForm.userId = this.userId;
      this.registerForm.contractId = row.contractId;
      this.registerForm.invoiceNumber = row.invoiceNumber;
      this.registerForm.invoiceDate = row.invoiceDate ? moment(row.invoiceDate).format('YYYY-MM-DD HH:mm:ss') : '';
      this.registerForm.payDay = moment(row.payDate).format('YYYY-MM-DD');
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

    // 删除弹框
    handleDelete(row) {
      this.showDeleteBox = true;
      this.deleteId = row.contractId;
    },

    // 确定删除
    deleteSubmit() {
      const url = common.deleteBankStatementUrl;
      const data = {
        serialNumber: this.deleteId
      };
      axios.post(url, data).then(res => {
        if (res.ec === '0') {
          this.$notify.success({
            title: '温馨提示！',
            message: '删除成功！'
          });
          this.showDeleteBox = false;
          this.getInvoiceNoticeListData();
        } else {
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '删除失败！'
          });
        }
      });
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
.invoiceNoticeList {
  .batchBtn {
    padding-bottom: 10px;
    padding-top: 10px;
  }
}
</style>

