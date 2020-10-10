<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-17 16:49:12
 * @LastEditTime: 2020-10-10 15:45:31
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\supportGoldHistory.vue
-->

<template>
  <div class="supportGoldHistory">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="90px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="支援金月份:" prop="month">
          <el-date-picker
            v-model="formData.month"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月份"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="期数:" prop="interfaceName">
          <el-input maxlength="50" v-model="formData.interfaceName" clearable placeholder></el-input>
        </el-form-item> -->
        <el-form-item label="批次号:" prop="batchNumber">
          <el-input maxlength="30" v-model="formData.batchNumber" clearable placeholder></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
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
          width="50"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column prop="" label="支援金月份" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.year + '-' + scope.row.month }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop label="期数" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="batchNumber" label="批次号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="batch" label="批次" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="店数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="carNum" label="车辆数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rentCount" label="支援金" show-overflow-tooltip></el-table-column>
        <el-table-column prop="LicenceFee" label="牌照费" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rentTotalCount" label="支援金合计" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="approvalStatus" label="审批状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.approvalStatus | supportApprovalStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creater" label="申请人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="申请时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payStatus" label="支付状态" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.payStatus }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="支付登记人" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="" label="支付登记时间" show-overflow-tooltip width="120"></el-table-column> -->
        <!-- <el-table-column prop="" label="备注" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.row)" v-show="rightControl.detail">详情</el-button>
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

  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import { mapState } from 'vuex';
import moment from 'moment';

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
        month: '',
        batchNumber: '',
        year: '',
        pageSize: 10,
        pageNum: 1,
      },

      tableData: [],
      tableHeight: 100,
      tableLoading: false,
      appravolStatus: [],

      // 删除提示文本
      deleteInfoText: {
        icon: 'icon-jinggao',
        confirst: '确认删除该租金修改任务？',
        consecond: '警告：删除后不可恢复！',
      },
      // 删除框显示
      showDeleteBox: false,
      // 删除的系统ID
      deleteId: null,

      registerForm: {
        currentTime: '',
        userId: '',
        id: '',
      },

      // 按钮权限
      rightArray: [9641],
      rightControl: {
        detail: false,
      },
    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
    }),
    // ...mapState('menu', {
    //   userId: store => store.userId
    // }),
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

  mounted() {
    // moment().format('YYYY-MM-DD HH:mm:ss')
    this.getSupportGoldHistoryListData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getSupportGoldHistoryListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getSupportGoldHistoryListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getSupportGoldHistoryListData() {
      this.tableLoading = true;
      const url = common.supporFundHisListUrl;
      const params = {
        month: this.formData.month ? moment(this.formData.month).format('MM') : '',
        batchNumber: this.formData.batchNumber,
        year: this.formData.month ? moment(this.formData.month).format('YYYY') : '',
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.applyList;
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
      this.getSupportGoldHistoryListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getSupportGoldHistoryListData();
    },

    // 详情
    handleDetail(row) {
      sessionStorage.setItem('supportGoldDeatilPath', this.$route.path);
      this.$router.push({
        path: '/supportGoldDetail',
        query: {
          id         : row.id,
          year       : row.year,
          month      : row.month,
          batch      : row.Batch,
          applyDate  : moment(row.creater).format('YYYY-MM-DD'),
          type       : this.userApprovalType,
          carNum     : row.carNum,
          batchNumber: row.batchNumber,
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
.supportGoldHistory {
}
</style>
