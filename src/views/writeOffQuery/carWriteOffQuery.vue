<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-10 15:57:36
 * @LastEditTime: 2020-12-03 10:05:14
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\writeOffQuery\carWriteOffQuery.vue
-->
<template>
  <div class="carWriteOffQuery">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="120px"
        size="mini"
        ref="ruleForm"
      >
        <el-form-item label="承租人/牌照商" prop="name">
          <el-input
            maxlength="30"
            v-model="formData.name"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="牌照商" prop="licenceName">
          <el-input
            maxlength="50"
            v-model="formData.licenceName"
            clearable
            placeholder
          ></el-input>
        </el-form-item> -->
        <el-form-item label="合同编号" prop="contractNumber">
          <el-input
            maxlength="30"
            v-model="formData.contractNumber"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="期数" prop="nper">
          <el-input
            maxlength="30"
            v-model="formData.nper"
            clearable
            placeholder
          ></el-input>
        </el-form-item>

        <el-form-item label="是否限牌" prop="isLimitLicence">
          <el-select
            v-model="formData.isLimitLicence"
            clearable
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in this.$options.filters.flagValue([])"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="车型名称" prop="carModel">
          <el-input
            maxlength="30"
            v-model="formData.carModel"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="车架号" prop="frameNumber">
          <el-input
            maxlength="30"
            v-model="formData.frameNumber"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="银行单据号" prop="serialNumber">
          <el-input
            maxlength="30"
            v-model="formData.serialNumber"
            clearable
            placeholder
          ></el-input>
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
            icon="el-icon-download"
            @click="exportButton"
            v-show="rightControl.export"
            >导出核销车辆</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="batchBtn">
      <el-button
        type="primary"
        size="mini"
        @click="batchRecoil"
        v-show="rightControl.recoil"
        >批量反冲</el-button
      >
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
        @selection-change="handleSelectionChange"
        @select="handleSelect"
        @select-all="selectAll"
        style="width: 100%"
        :header-cell-style="{
          'text-align': 'center',
          'font-weight': 'bold',
          background: '#627CAF',
          color: '#fff',
        }"
      >
        <el-table-column
          width="40"
          align="center"
          type="selection"
          fixed
        ></el-table-column>
        <el-table-column
          width="70"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column
          prop="frameNumber"
          label="车架号"
          show-overflow-tooltip
          width="180"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="承租人/牌照商"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <!-- <el-table-column
          prop="licenceName"
          label="牌照商"
          show-overflow-tooltip
          width="100"
        ></el-table-column> -->
        <el-table-column
          prop="contractNumber"
          label="合同编号"
          show-overflow-tooltip
          width="180"
        ></el-table-column>
        <el-table-column
          prop="nper"
          label="期数"
          show-overflow-tooltip
          width="80"
        ></el-table-column>
        <el-table-column
          prop="carModel"
          label="车型名称"
          show-overflow-tooltip
          width="150"
        ></el-table-column>
        
        <el-table-column
          prop="plateNumber"
          label="车牌号"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop="engineNumber"
          label="发动机号"
          show-overflow-tooltip
          width="100"
        ></el-table-column>

        <el-table-column
          prop="serialNumber"
          label="银行单据号"
          show-overflow-tooltip
          width="120"
        ></el-table-column>

        <el-table-column
          prop="isLimitLicence"
          label="是否限牌"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span
              :class="{
                greenStatus: scope.row.isLimitLicence == 'Y',
                redStatus: scope.row.isLimitLicence == 'N',
              }"
              >{{ scope.row.isLimitLicence | flagValue }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="上牌地"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <!-- <el-table-column prop="" label="车辆数量" show-overflow-tooltip width="100"></el-table-column> -->
        <el-table-column
          prop="leaseWay"
          label="租赁方式"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.leaseWay | leaseWay }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="backlash"
          label="反冲状态"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span
              :class="{
                greenStatus: scope.row.backlash == 'Y',
                blueColor: scope.row.backlash == 'N',
              }"
              >{{ scope.row.backlash | recoilStatus }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="payDay"
          label="支付日"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.payDay | timeFormat }}</span>
          </template>
        </el-table-column>
        
        
        <el-table-column
          prop="verState"
          label="核销状态"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span
              :class="{greenStatus: scope.row.verState == 'FULL', blueColor: scope.row.verState == 'PART', redStatus: scope.row.verState == 'NOT'}"
              >{{ scope.row.verState | verState }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="verPersion"
          label="核销人"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop="verDate"
          label="核销时间"
          show-overflow-tooltip
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.verDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="payStatus"
          label="支援金状态"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span :class="{greenStatus: scope.row.payStatus == 'HAVEGRANT', redStatus: scope.row.payStatus == 'NOTAPPLY', blueColor: scope.row.payStatus == 'HAVEAPPLY' }">{{ scope.row.payStatus | payStatus }}</span>
          </template>
        </el-table-column>
        

        <el-table-column
          prop="dueAmount"
          label="应收金额"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.dueAmount | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="duePrincipal"
          label="应收本金"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.duePrincipal | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="dueInterest"
          label="应收利息"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.dueInterest | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="dueManagementFee"
          label="应收管理费"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.dueManagementFee | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="dueCommission"
          label="应收手续费"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.dueCommission | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="verAmount"
          label="已核金额"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.verAmount | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="verPrincipal"
          label="已核本金"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.verPrincipal | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="verInterest"
          label="已核利息"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.verInterest | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="verManagementFee"
          label="已核管理费"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.verManagementFee | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="verCommission"
          label="已核手续费"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.verCommission | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="notVerAmount"
          label="未核金额"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.notVerAmount | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="notVerPrincipal"
          label="未核本金"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.notVerPrincipal | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="notVerInterest"
          label="未核利息"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.notVerInterest | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="notVerManagementFee"
          label="未核管理费"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.notVerManagementFee | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="notCommission"
          label="未核手续费"
          show-overflow-tooltip
          width="120"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.notCommission | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="160"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleRecoil(scope.row)"
              v-show="rightControl.recoil"
              :disabled="scope.row.backlash == 'Y'"
              >反冲</el-button
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

    <recoilModule
      ref="recoilModule"
      :recoilForm="recoilForm"
      :loading="status.loading"
      v-on:formDataSubmit="formDataSubmit"
    ></recoilModule>

    <!-- 导出提示 -->
    <downConfirmBox
      v-if="showDownBox"
      :msgConfirBox="downInfoText"
      v-on:submitForm="downSubmit"
      :loading="exportLoading"
      v-on:cancelbox="downCancelBack"
    ></downConfirmBox>
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import recoilModule from '@/components/recoilModule';
// import LogInVue from '../login/LogIn.vue';
import downConfirmBox from '@/components/confirmBox';  // 导出弹框

export default {
  name: 'carWriteOffQuery',
  props: {},
  components: {
    recoilModule,
    downConfirmBox,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        name: '',
        contractNumber: '',
        isLimitLicence: '',
        nper: '',
        carModel: '',
        frameNumber: '',
        serialNumber: '',
        pageSize: 10,
        pageNum: 1,
      },

      tableData: [],
      tableLoading: false,
      tableHeight: 100,
      // 数据字典
      paidTemp: [],

      // 反冲
      recoilForm: {},
      status: {
        loading: false,
      },
      recoilFormVisible: false,

      multipleSelection: [], // 批量选择

      // 按钮权限
      rightArray: [9731, 9732],
      rightControl: {
        export: false,
        recoil: false,
      },

      // 导出提示文本
      downInfoText: {
        icon: 'icon-jinggao',
        confirst: '确认要导出核销的车辆信息？',
        // consecond: '警告：导出后不可恢复！'
      },
      // 导出框显示
      showDownBox: false,
      exportLoading: false,
    };
  },
  computed: {},
  watch: {
    // multipleSelection(val) {
    //   console.log(val);
    //   val.forEach((item, index) => {
    //     if (item.backlash == 'Y') {
    //       this.$refs.table.toggleRowSelection(item, false);
    //     } 
    //   });
    // }
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
    this.getCarWriteOffListData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getCarWriteOffListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getCarWriteOffListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getCarWriteOffListData() {
      this.tableData = [];
      this.tableLoading = true;
      const url = common.selectVerCarStatementUrl;
      const params = {
        nper: this.formData.nper.trim(),
        contractNumber: this.formData.contractNumber.trim(),
        isLimitLicence: this.formData.isLimitLicence,
        name: this.formData.name.trim(),
        frameNumber: this.formData.frameNumber.trim(),
        serialNumber: this.formData.serialNumber.trim(),
        carModel: this.formData.carModel.trim(),
        turnPageShowNum: this.formData.pageSize,
        turnPageBeginPos: this.formData.pageNum,
      };
      axios
        .post(url, params)
        .then((res) => {
          if (res.ec === '0') {
            const data = res.data;
            this.tableData = data.verCarList;
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

    download() {
      let _that = this;
      let url = `/api${common.exportVerCarExcelUrl}?nper=${
        this.formData.nper ? this.formData.nper.trim() : ''
      }&contractNumber=${
        this.formData.contractNumber ? this.formData.contractNumber.trim() : ''
      }&isLimitLicence=${
        this.formData.isLimitLicence ? this.formData.isLimitLicence : ''
      }&name=${
        this.formData.name ? this.formData.name.trim() : ''
      }&frameNumber=${
        this.formData.frameNumber ? this.formData.frameNumber.trim() : ''
      }&carModel=${
        this.formData.carModel ? this.formData.carModel.trim() : ''
      }&serialNumber=${
        this.formData.serialNumber ? this.formData.serialNumber.trim() : ''}`;

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
                    Ee.download = '车辆核销信息' + currentTime +  '.xlsx';
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

    // 导出车辆核销清单
    exportButton() {
      this.showDownBox = true;
      
    },

    // 确定下载
    downSubmit() {
      this.exportLoading = true;
      this.download();

      // window.location.href = `/api${common.exportVerCarExcelUrl}?nper=${
      //   this.formData.nper ? this.formData.nper.trim() : ''
      // }&contractNumber=${
      //   this.formData.contractNumber ? this.formData.contractNumber.trim() : ''
      // }&isLimitLicence=${
      //   this.formData.isLimitLicence ? this.formData.isLimitLicence : ''
      // }&name=${
      //   this.formData.name ? this.formData.name.trim() : ''
      // }&frameNumber=${
      //   this.formData.frameNumber ? this.formData.frameNumber.trim() : ''
      // }&carModel=${
      //   this.formData.carModel ? this.formData.carModel.trim() : ''
      // }&serialNumber=${
      //   this.formData.serialNumber ? this.formData.serialNumber.trim() : ''}`;
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
      this.getCarWriteOffListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getCarWriteOffListData();
    },

    // 获取状态数据字典
    getDictStatus(columnName, tabName) {
      const data = {
        columnName: columnName,
        tabName: tabName,
      };
      queryDict(data).then((res) => {
        if (res.code === '0') {
          const arrData = res.data.dictList;
        }
      });
    },

    // 格式化状态
    formatStatus(type, dictTemp = []) {
      let columnValueDesc = '';
      dictTemp.forEach((v) => {
        if (type === v.columnValueCode) {
          return (columnValueDesc = v.columnValueDesc);
        }
      });
      return columnValueDesc;
    },

    // 反冲
    handleRecoil(row) {
      // this.recoilForm.serialNumber   = row.serialNumber || '';
      // this.recoilForm.name  = row.name || '';
      // this.recoilForm.licenceName    = row.licenceName || '';
      // this.recoilForm.contractNumber = row.contractNumber || '';
      // this.recoilForm.nper           = row.nper || '';
      // this.recoilForm.frameNumber    = row.frameNumber || '';
      // this.recoilForm.remark         = row.remark || '';
      // this.$refs.recoilModule.isShow(true);

      this.$confirm('是否确定反冲选中的车辆? 反冲后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const idArr = [{ id: row.id }];
          this.formDataSubmit(idArr);
        })
        .catch(() => {});
    },
    
    // 反冲提交
    formDataSubmit(idArr) {
      // console.log(obj);
      // this.status.loading = true;
      const url = common.backlashDealUrl;
      const params = {
        backList: idArr,
      };
      axios
        .post(url, params)
        .then((res) => {
          if (res.ec === '0') {
            // this.status.loading = false;
            this.$notify.success({
              title: '温馨提示！',
              message: '反冲成功！',
            });
            // this.$refs.recoilModule.isShow(false);
            this.getCarWriteOffListData();
          } else {
            // this.status.loading = false;
            this.$notify.error({
              title: '温馨提示！',
              message: res.em || res.error || res.message || '反冲失败！',
            });
          }
        })
        .catch((err) => {
          // this.status.loading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: err.em || err.error || err.message || '反冲失败！',
          });
        });
    },

    // 选择单条数据， 反冲状态为已反冲的不能勾选
    handleSelect(val, row) {
      if (row.backlash == 'Y') {
        this.$notify.warning({
          title: '温馨提示！',
          message: '该车辆已经反冲，不能再次反冲！',
          duration: 2000,
        });
        this.$refs.table.toggleRowSelection(row, false);
      }
    },

    // 批量选择 全选， 反冲状态为已反冲的不能勾选
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
      if (val) {
        val.forEach((item, index) => {
          if (item.backlash == 'Y') {
            this.$refs.table.toggleRowSelection(item, false);
          } 
        });
      }
      
      // this.toggleSelection();
      // console.log(this.multipleSelection);
    },

    selectAll(val) {
      // console.log(val);

    },

    // 取消批量选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },

    // 去重
    unique(arr) {
      return Array.from(new Set(arr));
    },

    // 批量反冲
    batchRecoil() {
      

      // 批量反冲时，每次操作只能选择同一合同编号的车辆进行
      let arrTem = [];
      let bacthCarIdArr = [];
      this.multipleSelection.forEach((v, i) => {
        // 获取未反冲状态的车辆id
        if (v.backlash === 'N') {
          bacthCarIdArr.push({
            id: v.id,
          });
          arrTem.push(v.contractNumber);
        } else {
          // 删除已反冲的项
          this.multipleSelection.splice(i, 1);
        }
      });

      if (_.isEmpty(this.multipleSelection)) {
        this.$notify.warning({
          title: '温馨提示',
          message: '请选择需要反冲的车辆',
        });
        return false;
      }
      
      // console.log(arrTem);
      // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
      // some() 方法会依次执行数组的每个元素：
      // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
      // 如果没有满足条件的元素，则返回false。
      // 注意： some() 不会对空数组进行检测。
      // 注意： some() 不会改变原始数组。
      const status = arrTem.some((val) => {
        return val !== arrTem[0];
      });
      // console.log(status);
      if (status) {
        this.$notify.warning({
          title: '温馨提示',
          message: '只能同时反冲合同编号相同的车辆！',
        });
        return false;
      }

      this.$confirm('是否确定反冲选中的车辆? 反冲后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // const url = common.backlashDealUrl;
          // let idArr = [];
          // // 合并数组
          // // idArr = _.concat(bacthCarIdArr, idArr);
          // // // 去重
          // idArr = this.unique(bacthCarIdArr);
          // console.log(idArr);

          // 对json数组去重， 使用js hash去重；js中使用hash去重，需要建立在对象的基础之上，因为对象的存储采用的是hash表
          /*
          * hash去重：不是自己去写hash算法  利用对象属性的添加内部应用了hash算法
          * 思路：将元素 作为对象的属性进行添加 当对象内没有此属性时   将此元素作为属性添加  否则不添加
          * hash表：线性表+链表
          * 功能：无论查找还是添加都非常快
          */
          let hash = {};
          bacthCarIdArr = bacthCarIdArr.reduce((temp, item) => {
            hash[item.id] ? '' : hash[item.id] = true && temp.push(item)
            return temp
          }, []);

          // console.log(bacthCarIdArr);

          this.formDataSubmit(bacthCarIdArr);
          
          // const params = {
          //   backList: idArr,
          // };
          // axios
          //   .post(url, params)
          //   .then((res) => {
          //     if (res.ec === '0') {
          //       this.$notify.success({
          //         title: '温馨提示！',
          //         message: '反冲成功！',
          //       });
          //       this.getCarWriteOffListData();
          //     } else {
          //       this.$notify.error({
          //         title: '温馨提示！',
          //         message: res.em || '反冲失败！',
          //       });
          //     }
          //   })
          //   .catch((err) => {
          //     this.$notify.error({
          //       title: '温馨提示！',
          //       message: err ? err.em : '反冲失败！',
          //     });
          //   });
        })
        .catch(() => {});
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.carWriteOffQuery {
  .batchBtn {
    padding: 0 0 5px 10px;
  }
}
</style>

