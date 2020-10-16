<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 10:54:14
 * @LastEditTime: 2020-10-16 15:27:00
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\overdueCollection\overduceCollectionList.vue
-->

<template>
  <div class="overduceCollectionList">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        size="small"
        label-width="90px"
        ref="ruleForm"
      >
        <el-form-item label="经销店名称:" prop="name">
          <el-input maxlength="50" v-model="formData.name" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="逾期天数:" prop="beginDay">
          <el-input maxlength="5" v-model="formData.beginDay" clearable placeholder="请输入整数" style="width: 130px"></el-input> -
          <el-input maxlength="5" v-model="formData.endDay" clearable placeholder="请输入整数" style="width: 130px"></el-input> 天
        </el-form-item>

        <el-form-item label="逾期金额:" prop="beginAmount">
          <el-input maxlength="10" v-model="formData.beginAmount" clearable placeholder="请输入整数" style="width: 130px"></el-input> -
          <el-input maxlength="10" v-model="formData.endAmount" clearable placeholder="请输入整数" style="width: 130px"></el-input> 元
        </el-form-item>

        <!-- <el-form-item label="电催日期:" prop="systemName">
          <el-date-picker
            v-model="formData.value1"
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

        <el-form-item label>
          <!-- <el-button type="primary" @click="importButton" v-show="rightControl.import">导入</el-button> -->
          <el-button type="primary" @click="exportButton" v-show="rightControl.export">导出逾期记录</el-button>
        </el-form-item>
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
          width="60"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column prop="name" label="经销店名称" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="payDate" label="逾期开始日期" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.payDate | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="maxdate" label="逾期天数" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="dueAmount" label="应还租金总额（含牌照费）" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="yfwh" label="已发支援金/未付租金" show-overflow-tooltip width="160"></el-table-column>
        <el-table-column prop="yfwfday" label="已发未付对应月份" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column prop="wfwh" label="未发支援金/未付租金" show-overflow-tooltip width="160"></el-table-column>
        <el-table-column prop="wfwfday" label="未发未付对应月份" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column prop="" label="应还罚息金额" width="120"></el-table-column>
        <el-table-column prop="outstandingAmount" label="应还金额合计" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="storeManagerName" label="店总姓名" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="storeManagerTel" label="店总联系方式" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="sellName" label="售后经理姓名" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="sellTel" label="售后经理联系方式" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column label="催收记录查询" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click="queryRecord(scope.row)" v-show="rightControl.entry">查看催收记录</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="electricDate" label="电催日期" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.electricDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueReason" label="逾期原因" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="electricCatalysis" label="电催情况" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip fixed="right" width="100">
          <template slot-scope="scope">
            <!-- <el-link type="primary" @click="queryRecord(scope.row)" v-if="rightControl.entry">查看催收记录</el-link> -->
            <el-link type="primary" @click="entryRecord(scope.row)" v-if="rightControl.entry">录入催收记录</el-link>
            <!-- <el-button size="mini" @click="queryRecord(scope.row)" v-if="rightControl.entry">查看催收记录</el-button>
            <el-button size="mini" @click="entryRecord(scope.row)" v-if="rightControl.entry">录入</el-button> -->
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


    <!-- // 导入催收记录 -->
    <upload-dialog ref="uploadDialog"></upload-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import moment from 'moment';
import { mapState } from 'vuex';

import uploadDialog from '@/components/uploadDialog';  // 上传弹框

export default {
  name: '',
  props: {},
  components: {
    uploadDialog,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        name: '',
        beginDay: '',
        endDay: '',
        beginAmount: '',
        endAmount: '',
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

      // 按钮权限
      rightArray: [9011, 9012, 9013],
      rightControl: {
        import: false,
        export: false,
        entry: false,
      },
    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
    }),
  },
  watch: {
    'formData.beginDay'(newVal, oldVal) {
      var reg = /^(0|[1-9][0-9]*)$/;
      if (newVal != '') {
        if (!reg.test(newVal)) {
          this.formData.beginDay = oldVal;
        }
      }
    },

    'formData.endDay'(newVal, oldVal) {
      var reg = /^(0|[1-9][0-9]*)$/;
      if (newVal != '') {
        if (!reg.test(newVal)) {
          this.formData.endDay = oldVal;
        }
      }
    },
    'formData.beginAmount'(newVal, oldVal) {
      var reg = /^(0|[1-9][0-9]*)$/;
      if (newVal != '') {
        if (!reg.test(newVal)) {
          this.formData.beginAmount = oldVal;
        }
      }
    },
    'formData.endAmount'(newVal, oldVal) {
      var reg = /^(0|[1-9][0-9]*)$/;
      if (newVal != '') {
        if (!reg.test(newVal)) {
          this.formData.endAmount = oldVal;
        }
      }
    },
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
    this.getOverduceCollectionListData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getOverduceCollectionListData();
    },

    // 重置
    resetForm(formName) {
      this.formData.beginAmount = '';
      this.formData.endAmount = '';
      this.formData.beginDay = '';
      this.formData.endDay = '';
      this.$refs[formName].resetFields();
      this.getOverduceCollectionListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getOverduceCollectionListData() {
      const url = common.collectionListUrl;
      const params = {
        name            : this.formData.name,
        beginAmount     : this.formData.beginAmount,
        endAmount       : this.formData.endAmount,
        beginDay        : this.formData.beginDay,
        endDay          : this.formData.endDay,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum : this.formData.pageSize,
      };
      this.tableLoading = true;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.collectionList;
          this.total = data.turnPageTotalNum * 1;
          this.tableLoading = false;
        } else {
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },

    // 导入
    importButton() {
      this.$refs.uploadDialog.isShow(true);
    },

    // 导出
    exportButton() {
      window.location.href = `/api/${common.exportCollectionUrl}?name=${
        this.formData.name ? this.formData.name : ''
      }&beginDay=${
        this.formData.beginDay ? this.formData.beginDay : ''
      }&endDay=${
        this.formData.endDay ? this.formData.endDay : ''
      }&beginAmount=${
        this.formData.beginAmount ? this.formData.beginAmount : ''
      }&endAmount=${
        this.formData.endAmount ? this.formData.endAmount : ''
      }`;
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
      this.getOverduceCollectionListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getOverduceCollectionListData();
    },

    // 查看催收记录
    queryRecord(row) {
      this.$router.push({
        path: '/collectionRecord',
        query: {
          soldId: row.soldId,
        },
      })
    },
    // 录入
    entryRecord(row) {
      this.$router.push({
        path: '/collectionRecord',
        query: {
          soldId: row.soldId,
        },
      })
    },

  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.overduceCollectionList {
  // .el-form--inline .el-form-item {
  //   margin-right: 0 !important;
  // }
}
</style>
