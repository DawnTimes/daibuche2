<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 10:58:18
 * @LastEditTime: 2020-10-20 09:19:10
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\invoiceNotice\unInvoiceNoticeList.vue
-->

<template>
  <div class="unInvoiceNoticeList">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="120px"
        size="small"
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
        <el-form-item label="购方名称:" prop="buyName">
          <el-input maxlength="50" v-model="formData.buyName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="购方税号:" prop="buyCreditCode">
          <el-input maxlength="30" v-model="formData.buyCreditCode" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input maxlength="200" v-model="formData.remark" clearable placeholder></el-input>
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
          width="80"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <!-- <el-table-column prop="billingNo" label="单据号" show-overflow-tooltip width="100"></el-table-column> -->
        <el-table-column prop="createTime" label="生成时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{ scope.row.createTime | timeFormatTemp }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="buyName" label="购方名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="buyCreditCode" label="购方税号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="buyAddTel" label="购方地址电话" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="buyBankNameNo" label="购方银行帐号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="sellName" label="销方地址电话" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="sellBankNameNo" label="销方银行帐号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" width="300" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tradeName" label="商品名称" show-overflow-tooltip width="100"></el-table-column>
        <!-- <el-table-column prop="" label="规格" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="" label="商品编码" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="" label="计量单位" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="num" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="amount" label="金额" show-overflow-tooltip width="100">
          <template slot-scope="scope">
          <span>{{ scope.row.amount | moneyFormat }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="tax" label="税率" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="" label="复核人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="收款人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="折扣金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="" label="扣除额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="" label="特殊票种" show-overflow-tooltip width="100"></el-table-column> -->

        <el-table-column prop="receiverAddr" label="接收人邮件" show-overflow-tooltip width="100"></el-table-column>
        <!-- <el-table-column prop="invoiceNumber" label="发票号码" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="invoiceDate" label="开票时间" show-overflow-tooltip width="100"></el-table-column> -->
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

  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import moment from 'moment';
import { mapState } from 'vuex';


export default {
  name: '',
  props: {},
  components: {

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
    this.getUninvoiceNoticeListData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getUninvoiceNoticeListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getUninvoiceNoticeListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getUninvoiceNoticeListData() {
      const url = common.queryNotInvoiceNoticeDetailUrl;
      const params = {
        buyCreditCode   : this.formData.buyCreditCode,
        buyName         : this.formData.buyName,
        remark          : this.formData.remark,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum : this.formData.pageSize,
      };
      this.tableLoading = true;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.invoiceList;
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
      this.getUninvoiceNoticeListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getUninvoiceNoticeListData();
    },

  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.unInvoiceNoticeList {
  .batchBtn {
    padding-bottom: 10px;
    padding-top: 10px;
  }
}
</style>

