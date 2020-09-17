<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 10:54:14
 * @LastEditTime: 2020-09-16 13:46:03
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
        label-width="80px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="经销店:" prop="name">
          <el-input maxlength="50" v-model="formData.name" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="逾期天数:" prop="systemCode">
          <el-input maxlength="5" v-model="formData.date1" clearable placeholder style="width: 130px"></el-input> -
          <el-input maxlength="5" v-model="formData.date2" clearable placeholder style="width: 130px"></el-input> 天
        </el-form-item>
        <el-form-item label="逾期金额:" prop="systemName">
          <el-input maxlength="10" v-model="formData.money1" clearable placeholder style="width: 130px"></el-input> -
          <el-input maxlength="10" v-model="formData.money2" clearable placeholder style="width: 130px"></el-input> 元
        </el-form-item>
        <el-form-item label="电催日期:" prop="systemName">
          <el-date-picker
            v-model="formData.value1"
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

        <el-form-item label>
          <el-button type="primary" @click="importButton" v-show="rightControl.import">导入</el-button>
          <el-button type="primary" @click="exportButton" v-show="rightControl.export">导出</el-button>
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
        <el-table-column prop label="经销店" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop label="逾期开始日期" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop label="逾期天数" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="id" label="应还租金总额（含牌照费）" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop label="已发支援金/未付租金" show-overflow-tooltip width="160"></el-table-column>
        <el-table-column prop label="已发未付对应月份" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column prop label="未发支援金/未付租金" show-overflow-tooltip width="160"></el-table-column>
        <el-table-column prop label="未发未付对应月份" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column prop="" label="应还罚息金额" width="120"></el-table-column>
        <el-table-column prop label="应还金额合计" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop label="店总姓名" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop label="店总联系方式" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop label="售后经理姓名" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop label="售后经理联系方式" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column prop label="催收记录查询" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click="queryRecord(scope.row)" v-show="rightControl.entry">查看催收记录</el-link>
          </template>
        </el-table-column>
        <el-table-column prop label="电催日期" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop label="逾期原因" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop label="电催情况" show-overflow-tooltip fixed="right">
          <template slot-scope="scope">
            <el-link type="primary" @click="entryRecord(scope.row)" v-show="rightControl.entry">录入</el-link>
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


    <!-- // 导入逾期记录 -->
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
        date1: '',
        date2: '',
        money1: '',
        money2: '',
      },

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
  watch: {},
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

    // 导入开票明细
    importButton() {
      this.$refs.uploadDialog.isShow(true);
    },

    // 导出
    exportButton() {},

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

    // 查看催收记录
    queryRecord(row) {
      this.$router.push({
        path: '/collectionRecord',
        query: {
          id: row.id,
        },
      })
    },
    // 录入
    entryRecord(row) {
      this.$router.push({
        path: '/collectionRecord',
        query: {
          id: row.id,
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

}
</style>
