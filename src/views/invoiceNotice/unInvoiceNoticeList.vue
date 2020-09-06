<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 10:58:18
 * @LastEditTime: 2020-09-03 18:00:43
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
        <el-form-item label="经销店/牌照商:" prop="interfaceName">
          <el-input maxlength="50" v-model="formData.interfaceName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="合同编号:" prop="systemCode">
          <el-input maxlength="30" v-model="formData.systemCode" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="对应期数:" prop="systemName">
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
        <el-table-column align="center" prop label="经销店/牌照商编号" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column align="center" prop label="经销店/牌照商名称" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column align="center" prop="id" label="合同编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="合同状态" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="上牌地" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="是否限牌" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="是否广汽租赁" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="是否商贸" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="租赁方式" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop label="对应期数" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="remark" label="不开通知原因" width="300" show-overflow-tooltip></el-table-column>

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

