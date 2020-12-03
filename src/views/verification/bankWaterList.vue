<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-10 15:57:36
 * @LastEditTime: 2020-12-03 10:01:29
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\verification\bankWaterList.vue
-->
<template>
  <div class="bankWaterList">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="110px"
        size="mini"
        ref="ruleForm"
      >
        <el-form-item label="银行单据号" prop="serialNumber">
          <el-input maxlength="30" v-model="formData.serialNumber" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="收款账户名称" prop="companyName">
          <el-input maxlength="30" v-model="formData.companyName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="汇款账户名称" prop="sideAccountName">
          <el-input maxlength="50" v-model="formData.sideAccountName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="汇款账号" prop="sideAccount">
          <el-input maxlength="30" v-model="formData.sideAccount" clearable placeholder></el-input>
        </el-form-item>
        
        <!-- <el-form-item label="收款账号" prop="companyName">
          <el-input maxlength="30" v-model="formData.companyName" clearable placeholder></el-input>
        </el-form-item> -->

        <el-form-item label="核销状态" prop="verState">
          <el-select v-model="formData.verState" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in this.$options.filters.verState([])"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易日期" prop="dateTime">
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
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-plus"
            type="primary"
            round
            @click="addBankWater"
            v-show="rightControl.add"
          >新增银行流水单</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button icon="el-icon-upload2" type="primary" @click="importButton" v-show="rightControl.import">导入银行流水单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-download" type="primary" id="exportButton"  @click="exportButton" v-show="rightControl.export">导出银行流水单</el-button>
          <!-- <el-button icon="el-icon-download" type="primary" id="exportButton"  @click="download" v-show="rightControl.export">导出银行流水单</el-button> -->
        </el-form-item>
        
      </el-form>
    </div>

    <div class="table">
      <wTable :data="tableData" :header="bankWaterHeader" :option="tableOption" :tableLoading="tableLoading" ref="table">
        <el-table-column slot="fixed" fixed="left" align="center" label="序号" type="index" :index="indexMethod" width="50">
        </el-table-column>
        <el-table-column slot="fixed" fixed="right" align="center" label="操作" width="350">
          <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleContract(scope.row)"
                v-if="rightControl.writeOff"
                :disabled="scope.row.verState == 'FULL' || scope.row.refund == scope.row.income"
              >核销</el-button>
              <el-button
                size="mini"
                plain
                @click="handleDetail(scope.row)"
                v-if="rightControl.detail"
                :disabled="scope.row.verState == 'NOT'"
              >核销详情</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleRefund(scope.row)"
                v-if="rightControl.refund"
                :disabled="scope.row.verState == 'FULL' || scope.row.refund == scope.row.income"
              >退款</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                v-if="rightControl.delete"
                :disabled="scope.row.verState == 'FULL' || scope.row.verState == 'PART' || scope.row.refund != '0'"
              >删除</el-button>
            </template>
        </el-table-column>
      </wTable>
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

    <!-- // 退款 -->
    <refund-dialog
      ref="refundDialog"
      :refundForm="refundForm"
      :loading="status.loading"
      v-on:formDataSubmit="formDataSubmit"
    ></refund-dialog>

    <!-- 删除 -->
    <confirmBox
      v-if="showDeleteBox"
      :msgConfirBox="deleteInfoText"
      v-on:submitForm="deleteSubmit"
      v-on:cancelbox="cancelBack"
    ></confirmBox>

    <!-- 导出提示 -->
    <downConfirmBox
      v-if="showDownBox"
      :msgConfirBox="downInfoText"
      v-on:submitForm="downSubmit"
      :loading="exportLoading"
      v-on:cancelbox="downCancelBack"
    ></downConfirmBox>

    <!-- // 导入银行流水单 -->
    <upload-dialog ref="uploadDialog" :uploadURLStr="bankWaterUploadURL"></upload-dialog>
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import axios2 from 'axios';

import refundDialog from './components/refundDialog'; // 退款弹框
import confirmBox from '@/components/confirmBox';  // 删除弹框
import downConfirmBox from '@/components/confirmBox';  // 导出弹框
import uploadDialog from '@/components/uploadDialog';  // 上传弹框

import { mapState } from 'vuex';

import { moneyFormat } from '@/common/moneyFormat.js';
import wTable from './bankWaterDrag';

export default {
  name: 'bankWaterList',
  props: {

  },
  components: {
    refundDialog,
    confirmBox,
    uploadDialog,
    downConfirmBox,
    wTable,
  },
  data() {
    return {
      tableOption: {
        border: true,
        maxHeight: 500,
      },
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        companyName: '',
        serialNumber: '',
        sideAccount: '',
        sideAccountName: '',
        startTradeDate: '',
        endTradeDate: '',
        verState: '',
        dateTime: [],
        pageSize: 10,
        pageNum: 1,
      },
      appravolStatus: [
        {
          value: '1',
          label: '全部核销',
        },
        {
          value: '2',
          label: '未核销',
        },
        {
          value: '3',
          label: '部分核销',
        },
      ],

      tableData: [],
      tableLoading: false,
      tableHeight: 100,
      // 数据字典
      paidTemp: [],
      
      refundForm: {
        serialNumber: '',
        sideAccountName: '',
        sideAccount: '',
        refund: '',
        notVerLines: '',
        remark: '',
      },
      // 未核销额
      notVerLines: 0,
      status: {
        loading: false,
      },

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

      // 按钮权限
      rightArray: [9711, 9712, 9713, 9714, 9715, 9716, 9717],
      rightControl: {
        add: false,
        import: false,
        export: false,
        writeOff: false,
        refund: false,
        delete: false,
        detail: false,
      },

      // 导入URL
      bankWaterUploadURL: '',
      

      // 导出提示文本
      downInfoText: {
        icon: 'icon-jinggao',
        confirst: '确认要导出银行流水？',
        // consecond: '警告：导出后不可恢复！'
      },
      // 导出框显示
      showDownBox: false,
      exportLoading: false,
    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
      successStatus: (store) => store.successStatus,
      bankWaterHeader: store => store.bankWaterHeader,
    }),
  },
  watch: {
    // 监听是否导入成功，成功则刷新催收记录
    successStatus(val) {
      if (val) {
        this.getBankWaterListData();
      }
    }
  },
  created() {
    // console.log(moneyFormat('-192845565383.00000'));
    this.getBankWaterListData();

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
      this.tableOption.maxHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 110;
      
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableOption.maxHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 110;
      }
    })
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },

  // 添加组件内的导航钩子，在跳转路由前，将监听窗口大小变化的函数清空
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.tableHeight = 500
    window.onresize = function() {
      // console.log('离开了')
    }
    next()
  },

  mounted() {
    
  },
  methods: {
    // 查询
    queryForm() {
      // 重置当前页
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getBankWaterListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.startTradeDate = '';
      this.formData.endTradeDate = '';
      this.getBankWaterListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 选择交易日期
    changeTime(val) {
      // console.log(val);
      if (val) {
        this.formData.startTradeDate = val[0];
        this.formData.endTradeDate = val[1];
      } else {
        this.formData.startTradeDate = '';
        this.formData.endTradeDate = '';
      }
    },

    // 查询分页列表
    getBankWaterListData() {
      this.tableData = [];
      const url = common.queryBankStatementUrl;
      const params = {
        companyName: this.formData.companyName.trim(),
        serialNumber: this.formData.serialNumber.trim(),
        sideAccount: this.formData.sideAccount.trim(),
        sideAccountName: this.formData.sideAccountName.trim(),
        startTradeDate: this.formData.startTradeDate,
        endTradeDate: this.formData.endTradeDate,
        verState: this.formData.verState,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };

      this.tableLoading = true;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.bankStatementList;
          this.total = data.turnPageTotalNum * 1;
          this.tableLoading = false;
          if (!_.isEmpty(this.tableData)) {
            this.tableData.forEach((item, index) => {
              // 文本转义
              item.verStateText = ''; // 核销状态

              if (item.verState == 'FULL') {
                item.verStateText = '已核销';
              } else if (item.verState == 'PART') {
                item.verStateText = '部分核销';
              } else if (item.verState == 'NOT') {
                item.verStateText = '未核销';
              } else {
                item.verStateText = '';
              }

              // item.batchStartingDate
              item.tradeDate           = moment(item.tradeDate).format('YYYY-MM-DD');

            })
          }
        } else {
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
      })

    },

    // 新增银行流水
    addBankWater() {
      this.$router.push({
        path: '/addBankWater',
      })
    },

    // 导入银行流水单
    importButton() {
      this.bankWaterUploadURL = common.importBankStatementUrl,
      this.$refs.uploadDialog.isShow(true);
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
      this.getBankWaterListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getBankWaterListData();
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
        
      })
    },

    // 格式化状态
    formatStatus(type, dictTemp = []) {      
      let columnValueDesc = '';
      dictTemp.forEach((v) => {
        if ( type === v.columnValueCode) {
          return columnValueDesc = v.columnValueDesc
        }
      })
      return columnValueDesc;
          
    },

    download() {
      let _that = this;
      let url = `/api/${common.bankWaterDownUrl}?companyName=${
      this.formData.companyName ? this.formData.companyName.trim() : ''
      }&serialNumber=${
        this.formData.serialNumber ? this.formData.serialNumber.trim() : ''
      }&sideAccount=${
        this.formData.sideAccount ? this.formData.sideAccount.trim() : ''
      }&sideAccountName=${
        this.formData.sideAccountName ? this.formData.sideAccountName.trim() : ''
      }&verState=${
        this.formData.verState ? this.formData.verState : ''
      }&startTradeDate=${
        this.formData.startTradeDate ? this.formData.startTradeDate : ''
      }&endTradeDate=${
        this.formData.endTradeDate ? this.formData.endTradeDate : ''}`;

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
                    Ee.download = '银行流水单' + currentTime +  '.xlsx';
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

    // 数据导出下载文件
    exportButton() {
      this.showDownBox = true;
            
      // 后端返回的是流文件
      // const params = {
      //   companyName: '',
      //   serialNumber: '',
      //   sideAccount: '',
      //   sideAccountName: '',
      // };
      // const url = common.bankWaterDownUrl;
      // axios2.get(url, params, {
      //   responseType: 'blob'
      // })
      //   .then(res => {
      //     // res为后台返回的流数据信息
      //     const filename = res.filename ||  '银行流水单.xlsx';
      //     this.fileDownload(res, filename);
      //   })
      //   .catch(() => {
      //     this.$message.error('导出错误！请重新导出');
      //   });
      

      // 后台生成Excel,前端直接获取并下载Excel
      // 方式一：通过Form表单方式请求后台，直接下载excel文件
      /**
       * input标签主要用来传递请求所需的参数：
       *
       * 1.name属性是传递请求所需的参数名.
       * 2.value属性是传递请求所需的参数值.
       *
       * 3.当为get类型时，请求所需的参数用input标签来传递，直接写在URL后面是无效的。
       * 4.当为post类型时，queryString参数直接写在URL后面，formData参数则用input标签传递
       *       有多少数据则使用多少input标签
       *
  　　　*/
      // let form = document.createElement("form");//定义一个form表单
      // form.style = "display:none";
      // form.target = ""; 
      // form.method = "get"; 
      // form.action = '/api' + common.bankWaterDownUrl; 
      // document.body.appendChild(form); //将表单放置在web中

      // //创建隐藏表单
      // let newElement = document.createElement("input");
      // newElement.setAttribute("name","companyName");
      // newElement.setAttribute("type","hidden");
      // newElement.setAttribute("value", this.formData.companyName || '');
      // form.appendChild(newElement);
      // form.submit();//表单提交
      
      // 方式二：get方式请求后台，直接使用window.location.href 或 window.open()打开请求结果。
      // /api/bankStatemntExcel/exportBankStatement.do
      // window.location.href = `/api/${common.bankWaterDownUrl}?companyName=${
      //   this.formData.companyName ? this.formData.companyName : ''
      // }&serialNumber=${this.formData.serialNumber ? this.formData.serialNumber : ''}&sideAccount=${
      //   this.formData.sideAccount ? this.formData.sideAccount : ''
      // }&sideAccountName=${this.formData.sideAccountName ? this.formData.sideAccountName : ''}`;


      // const arr = [
      //   {id: '123'},
      //   {id: '456'},
      //   {id: '789'},
      // ];
      // const aa = JSON.stringify(arr);
      // // escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。可以使用 unescape() 对 escape() 编码的字符串进行解码。
      // window.open(`/api/${common.bankWaterDownUrl}?${escape(aa)}`, '_parent')
    },
    // 确定下载
    downSubmit() {
      this.exportLoading = true;
      
      // window.open(`/api/${common.bankWaterDownUrl}?companyName=${
      // this.formData.companyName ? this.formData.companyName.trim() : ''
      // }&serialNumber=${
      //   this.formData.serialNumber ? this.formData.serialNumber.trim() : ''
      // }&sideAccount=${
      //   this.formData.sideAccount ? this.formData.sideAccount.trim() : ''
      // }&sideAccountName=${
      //   this.formData.sideAccountName ? this.formData.sideAccountName.trim() : ''
      // }&verState=${
      //   this.formData.verState ? this.formData.verState : ''
      // }&startTradeDate=${
      //   this.formData.startTradeDate ? this.formData.startTradeDate : ''
      // }&endTradeDate=${
      //   this.formData.endTradeDate ? this.formData.endTradeDate : ''}`, '_parent')
      // // .addEventListener('beforeunload', (e) => {
      // //   console.log(1223333);
      // //   this.exportLoading = false;
      // // })

      this.download();
    },
    // 取消下载
    downCancelBack() {
      this.showDownBox = false;
      this.exportLoading = false;
    },

    fileDownload(data, fileName) {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
      });
      const filename = fileName;
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        const blobURL = window.URL.createObjectURL(blob); // 创建下载的链接
        // 通过创建a标签下载
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename); // 下载后文件名
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink); // 下载完成移除元素
        window.URL.revokeObjectURL(blobURL); // 释放内存 释放掉blob对象
      }
    },

    // 核销
    handleContract(row) {
      // trim() 方法会删除一个字符串两端的空白字符。
      this.$router.push({
        path: '/contractListNper',
        query: {
          serialNumber: row.serialNumber,
          companyName: row.companyName,
          name: row.sideAccountName.trim(),
        },
      })
    },
    // 核销详情
    handleDetail(row) {
      this.$router.push({
        path: '/writeOffDetail',
        query: {
          serialNumber: row.serialNumber,
        },
      })
    },

    // 删除
    handleDelete(row) {
      this.showDeleteBox = true;
      this.deleteId = row.serialNumber;
    },

    // 删除提交
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
          this.getBankWaterListData();
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

    // 退款弹框
    handleRefund(row) {
      this.refundForm.serialNumber = row.serialNumber;
      this.refundForm.sideAccountName = row.sideAccountName;
      this.refundForm.sideAccount = row.sideAccount;
      this.refundForm.notVerLines = row.notVerLines || 0;
      // this.refundForm.refund = row.refund;
      // this.refundForm.remark = row.remark;
      this.notVerLines = row.notVerLines * 1 || 0;
      this.$refs.refundDialog.isShow(true);
    },

    // 退款确定
    formDataSubmit(obj) {
      const url = common.bankStatementRefundUrl;
      const params = obj.data;
      if (this.notVerLines < params.refund * 1) {
        this.$notify.warning({
          title: '温馨提示！',
          message: '退款金额不能大于未核销金额！'
        });
        return false
      }
      this.status.loading = true;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          this.$notify.success({
            title: '温馨提示！',
            message: '退款成功！'
          });
          this.status.loading = false;
          this.$refs.refundDialog.isShow(false);
          this.refundForm.refund = '';
          this.getBankWaterListData();
        } else {
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '退款失败！'
          });
          this.status.loading = false;
        }
      }).catch((err) => {
        this.status.loading = false;
        this.$notify.error({
            title: '温馨提示！',
            message: err.em || '退款失败！'
          });
      })
      
    },
  },
  filters: {
    function() {

    },
  },
};
</script>

<style scoped lang="scss">
</style>

