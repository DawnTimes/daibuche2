<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-10 15:57:36
 * @LastEditTime: 2020-09-17 09:33:39
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
        label-width="100px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="银行单据号:" prop="serialNumber">
          <el-input maxlength="30" v-model="formData.serialNumber" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="汇款名称:" prop="sideAccountName">
          <el-input maxlength="50" v-model="formData.sideAccountName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="汇款账号:" prop="sideAccount">
          <el-input maxlength="30" v-model="formData.sideAccount" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="收款名称:" prop="companyName">
          <el-input maxlength="30" v-model="formData.companyName" clearable placeholder></el-input>
        </el-form-item>
        <!-- <el-form-item label="收款账号:" prop="companyName">
          <el-input maxlength="30" v-model="formData.companyName" clearable placeholder></el-input>
        </el-form-item> -->

        <!-- <el-form-item label="核销状态:" prop="systemName">
          <el-select v-model="formData.value" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in appravolStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <!-- <el-form-item label="交易日期:" prop="interfaceCode">
          <el-date-picker
            v-model="formData.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item> -->

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
          <el-button type="primary" @click="importButton" v-show="rightControl.import">导入银行流水单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportButton" v-show="rightControl.export">导出银行流水单</el-button>
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
        <el-table-column prop="tradeDate" label="交易时间" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.tradeDate | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="serialNumber" label="银行单据号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="income" label="收款金额" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="companyName" label="收款名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="bankAccountNo" label="收款账号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="bankAccountName" label="收款开户行" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="sideAccount" label="汇款名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="sideAccountName" label="汇款账号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="abstract" label="摘要" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="是否代付" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="[scope.row.status == 'Y' ? 'greenStatus' : 'redStatus']"
            >{{ formatStatus(scope.row.status, paidTemp) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paidLogo" label="代付标志" show-overflow-tooltip></el-table-column>
        <el-table-column prop="projectCategory" label="项目类别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="是否虚拟收款" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="verState" label="核销状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
            :class="{greenStatus: scope.row.verState == '全部核销', blueColor: scope.row.verState == 'PART' || scope.row.verState == '未核销'}"
            >{{ scope.row.verState }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="haveVerLines" label="已核销额" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.haveVerLines || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="notVerLines" label="未核销额" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.notVerLines || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="refund" label="退款金额" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.refund || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="newLedgerLogo" label="新台账标志" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleContract(scope.row)"
              v-if="rightControl.writeOff && scope.row.verState == '未核销'"
            >核销</el-button>
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.row)"
              v-if="rightControl.detail && scope.row.verState == '全部核销'"
            >核销详情</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleRefund(scope.row)"
              v-if="rightControl.refund && (scope.row.verState == 'PART' || scope.row.verState == '未核销')"
            >退款</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              v-if="rightControl.delete && scope.row.verState == '未核销'"
            >删除</el-button>
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

    <!-- // 退款 -->
    <refund-dialog
      ref="refundDialog"
      :refundForm="refundForm"
      :loading="status.loading"
      v-on:formDataSubmit="formDataSubmit"
    ></refund-dialog>

    <confirmBox
      v-if="showDeleteBox"
      :msgConfirBox="deleteInfoText"
      v-on:submitForm="deleteSubmit"
      v-on:cancelbox="cancelBack"
    ></confirmBox>

    <!-- // 导入银行流水单 -->
    <upload-dialog ref="uploadDialog"></upload-dialog>
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import refundDialog from './components/refundDialog'; // 退款弹框
import confirmBox from '@/components/confirmBox';  // 删除弹框
import uploadDialog from '@/components/uploadDialog';  // 上传弹框

export default {
  name: '',
  props: {

  },
  components: {
    refundDialog,
    confirmBox,
    uploadDialog,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        companyName: '',
        serialNumber: '',
        sideAccount: '',
        sideAccountName: '',
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

      tableData: [{
        serialNumber: '123'
      }],
      tableHeight: 100,
      // 数据字典
      paidTemp: [],
      
      refundForm: {
        serialNumber: '',
        sideAccountName: '',
        sideAccount: '',
        refund: '',
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
    };
  },
  computed: {

  },
  watch: {

  },
  created() {
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
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 120;
      
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 120;
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
      this.getBankWaterListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 查询分页列表
    getBankWaterListData() {
      const url = common.queryBankStatementUrl;
      const params = {
        companyName: this.formData.companyName,
        serialNumber: this.formData.serialNumber,
        sideAccount: this.formData.sideAccount,
        sideAccountName: this.formData.sideAccountName,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };

      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.bankStatementList;
          this.total = data.turnPageTotalNum * 1;
        }
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
      this.$refs.uploadDialog.isShow(true);
    },

    // 导出银行流水单
    // exportButton() {},

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

    // 数据导出下载文件
    exportButton() {
      const params = {
        
      };
      const url = common.bankWaterDownUrl;
      axios.get(url, params, {
        responseType: 'arraybuffer'
      })
        .then(res => {
          const filename = res.filename || '银行流水单.xlsx';
          this.fileDownload(res, filename);
        })
        .catch(() => {
          this.$message.error('导出错误！请重新导出');
        });
    },

    fileDownload(data, fileName) {
      const blob = new Blob([data], {
        type: 'application/octet-stream'
      });
      const filename = fileName;
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        const blobURL = window.URL.createObjectURL(blob);
        // 通过创建a标签下载
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL); // 释放内存
      }
    },

    // 核销
    handleContract(row) {
      this.$router.push({
        path: '/contractListNper',
        query: {
          serialNumber: row.serialNumber,
          name: row.sideAccountName,
        },
      })
    },
    // 核销详情
    handleDetail(row) {
      this.$router.push({
        path: '/writeOffDetail'
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

