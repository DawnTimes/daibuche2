<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-10 15:57:36
 * @LastEditTime: 2020-09-03 17:51:39
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
        <el-form-item label="银行单据号:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="汇款名称:" prop="interfaceName">
          <el-input maxlength="50" v-model="formData.interfaceName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="汇款账号:" prop="systemCode">
          <el-input maxlength="30" v-model="formData.systemCode" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="收款名称:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="收款账号:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>

        <el-form-item label="核销状态:" prop="systemName">
          <el-select v-model="formData.value" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in appravolStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易日期:" prop="interfaceCode">
          <el-date-picker
            v-model="formData.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="importButton" v-show="rightControl.import">导入银行流水单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportButton" v-show="rightControl.export">导出银行流水单</el-button>
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
        :cell-style="{'text-align': 'center', 'height': '40px'}"
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
        <el-table-column align="center" prop label="交易时间" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="id" label="银行单据号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="收款金额" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="收款名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="收款账号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="收款开户行" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="汇款名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="汇款账号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="摘要" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="是否代付" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="[scope.row.status == 'Y' ? 'greenStatus' : 'redStatus']"
            >{{ formatStatus(scope.row.status, paidTemp) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop label="代付标志" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="项目类别" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="是否虚拟收款" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="status" label="核销状态" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            <span
            :class="{greenStatus: scope.row.approvalStatus == '', redStatus: scope.row.approvalStatus == '', blueColor: scope.row.approvalStatus == '',
            yellowColor: scope.row.approvalStatus == ''}"
            >{{ formatStatus(scope.row.approvalStatus, paidTemp) }}</span>
          </template>-->
        </el-table-column>
        <el-table-column align="center" prop label="已核销额" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="未核销额" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="退款金额" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="新台账标志" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleContract(scope.row)"
              v-show="rightControl.writeOff && scope.row.status == '未核销'"
            >核销</el-button>
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.row)"
              v-show="rightControl.detail && scope.row.status == '全部核销'"
            >核销详情</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleRefund(scope.row)"
              v-show="rightControl.refund && scope.row.status == '未核销'"
            >退款</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              v-show="rightControl.delete && scope.row.status == '未核销'"
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

      tableData: [
        { id: 123456, status: '未核销'},
        { id: 123456, status: '全部核销'},
      ],
      tableHeight: 100,
      // 数据字典
      paidTemp: [],
      
      refundForm: {},
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
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
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
        path: '/contractListNper'
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
      this.deleteId = row.id;
    },

    // 删除提交
    deleteSubmit() {
      // const url = common.systemDeleteUrl;
      // const data = {
      //   id: this.deleteId
      // };
      // axios.post(url, data).then(res => {
      //   if (res.code === '0') {
      //     this.$notify.success({
      //       title: '温馨提示！',
      //       message: '删除成功！'
      //     });
      //     this.showDeleteBox = false;
      //     this.getSystemListData();
      //   } else {
      //     this.$notify.error({
      //       title: '温馨提示！',
      //       message: '删除失败！'
      //     });
      //   }
      // });
    },

    // 取消删除
    cancelBack() {
      this.showDeleteBox = false;
    },

    // 退款弹框
    handleRefund(row) {
      this.$refs.refundDialog.isShow(true);
    },

    // 退款确定
    formDataSubmit(data) {
      this.$refs.refundDialog.isShow(false);
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

