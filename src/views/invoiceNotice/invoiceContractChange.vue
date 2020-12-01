<!--
 * @Author: 廖亿晓
 * @Date: 2020-11-26 10:33:44
 * @LastEditTime: 2020-11-30 14:03:20
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\invoiceNotice\invoiCecontractChange.vue
-->


<template>
  <div class="invoiceContractChange">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        size="mini"
        ref="ruleForm"
      >
        <!-- <el-form-item label="生成时间:" prop="systemName">
          <el-date-picker
            v-model="formData.value1"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item label="原合同编号" prop="oldContractNumber">
          <el-input maxlength="50" v-model="formData.oldContractNumber" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="新合同编号" prop="newContractNumber">
          <el-input maxlength="50" v-model="formData.newContractNumber" clearable placeholder></el-input>
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
        <el-table-column prop="oldContractNumber" label="原合同编号" show-overflow-tooltip min-width="160"></el-table-column>
        <el-table-column prop="oldParentNumber" label="原主合同编号" show-overflow-tooltip min-width="160"></el-table-column>
        <el-table-column prop="newContractNumber" label="新合同编号" show-overflow-tooltip min-width="160"></el-table-column>
        <el-table-column prop="newParentNumber" label="新主合同编号" show-overflow-tooltip min-width="160"></el-table-column>
        <!-- <el-table-column prop="buyCreditCode" label="合同名称" show-overflow-tooltip min-width="160"></el-table-column> -->
        <el-table-column prop="validDate" label="生效日期" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.validDate | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="counts" label="开票明细数量" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">
            <el-tooltip content="点击查询" placement="top" effect="light">
              <el-link type="primary" @click="queryCounts(scope.row)">{{ scope.row.counts }}</el-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="isDis" label="是否已删" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.isDis | flagValue }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isRead" label="是否已读" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.isRead | flagValue }}</span>
          </template>
        </el-table-column> -->
        
        <el-table-column prop="oldDueamount" label="变更前金额" show-overflow-tooltip min-width="160">
          <template slot-scope="scope">
          <span>{{ scope.row.oldDueamount | moneyFormat }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="newDueamount" label="变更后金额" show-overflow-tooltip min-width="160">
          <template slot-scope="scope">
          <span>{{ scope.row.newDueamount | moneyFormat }}</span>
        </template>
        </el-table-column>
        
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | timeFormat }}</span>
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
    
    <!-- <invoiceInfoDialog ref="invoiceInfoDialog" :oldContractId="oldContractId" :incioceTableData="incioceTableData" :tableLoading="invioceTableLoading"></invoiceInfoDialog> -->
    <invoiceInfoDialog ref="invoiceInfoDialog" :oldContractId="oldContractId"></invoiceInfoDialog>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import moment from 'moment';
import { mapState } from 'vuex';
import invoiceInfoDialog from './components/invoiceContractInfo';


export default {
  name: 'invoiceContractChange',
  props: {},
  components: {
    invoiceInfoDialog,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        newContractNumber: '',
        oldContractNumber: '',
        pageSize: 10,
        pageNum: 1,
      },

      tableData: [],
      tableHeight: 100,
      tableLoading: false,

      registerForm: {},
      status: {
        loading: false,
        createLoading: false,
      },
      invoiceForm: {},

      oldContractId: '',
      incioceTableData: [],
      invioceTableLoading: false,

    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
    }),
  },
  watch: {},
  created() {
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
    this.getInvoiceContractChangeData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getInvoiceContractChangeData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getInvoiceContractChangeData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getInvoiceContractChangeData() {
      this.tableData = [];
      const url = common.queryHaveInvoceContractUrl;
      const params = {
        newContractNumber: this.formData.newContractNumber.trim(),
        oldContractNumber: this.formData.oldContractNumber.trim(),
        turnPageBeginPos : this.formData.pageNum,
        turnPageShowNum  : this.formData.pageSize,
      };
      this.tableLoading = true;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.changeContract;
          this.total = data.turnPageTotalNum * 1;
          this.tableLoading = false;
        } else {
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },


    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
      this.getInvoiceContractChangeData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getInvoiceContractChangeData();
    },

    // 查询开票数量
    queryCounts(row) {
      this.oldContractId = row.oldContractId;
      this.$refs.invoiceInfoDialog.isShow(true);
    },

  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.invoiceContractChange {
  .batchBtn {
    padding-bottom: 10px;
    padding-top: 10px;
  }
}
</style>