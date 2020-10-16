<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 16:16:09
 * @LastEditTime: 2020-10-15 18:03:11
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\supportGoldTotalList.vue
-->

<template>
  <div class="supportGoldTotalList">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="100px"
        size="small"
        ref="ruleForm"
      >
        <!-- <el-form-item label="支援金月份:" prop="systemName">
          <el-date-picker
            v-model="formData.value1"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item label="经销店名称:" prop="agentName">
          <el-input maxlength="50" v-model="formData.agentName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="车架号:" prop="frameNumber">
          <el-input maxlength="50" v-model="formData.frameNumber" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="批次号:" prop="batchNumber">
          <el-input maxlength="50" v-model="formData.batchNumber" clearable placeholder></el-input>
        </el-form-item>
        <!-- <el-form-item label="期数:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item> -->
        <el-form-item label="支付状态:" prop="payStatus">
          <el-select v-model="formData.payStatus" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in this.$options.filters.payStatus([])"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-show="rightControl.export" @click="exportButton">导出</el-button>
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
        <el-table-column prop="agentCode" label="经销店编码" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="agentName" label="经销店名称" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="frameNumber" label="车架号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="plateNumber" label="车牌号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="modelName" label="车型" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="cityName" label="上牌地" show-overflow-tooltip></el-table-column>
        <el-table-column prop="batchNumber" label="批次号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="batch" label="批次" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.batch | batchFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payStatus" label="支付状态" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span :class="{greenStatus: scope.row.payStatus == 'HAVEGRANT', redStatus: scope.row.payStatus == 'NOT', blueColor: scope.row.payStatus == '2' }">{{ scope.row.payStatus | payStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="monthlyRent" label="租金" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rentCardFee" label="牌照费" show-overflow-tooltip></el-table-column>
        <el-table-column prop="totalMonthlyRent" label="租金合计" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="supportFund" label="车型支援金" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="licenceFund" label="牌照支援金" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="totalFund" label="总支援金" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="currentTotal" label="当期/总期数" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="surplus" label="剩余期数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="payer" label="支付登记人" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="payDate" label="支付时间" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.payDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="remark" label="备注" show-overflow-tooltip ></el-table-column> -->
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
        agentName: '',
        batchNumber: '',
        frameNumber: '',
        payStatus: '',
        pageSize: 10,
        pageNum: 1,
      },

      tableData: [],
      tableLoading: false,
      tableHeight: 100,
      limitStatus: [
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ],

      // 按钮权限
      rightArray: [9611],
      rightControl: {
        export: false,
      },

    };
  },
  computed: {

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
    this.getSupportGoldTotalListData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getSupportGoldTotalListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getSupportGoldTotalListData();
    },


    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getSupportGoldTotalListData() {
      this.tableLoading = true;
      const url = common.supportCarListUrl;
      const params = {
        agentName: this.formData.agentName,
        batchNumber: this.formData.batchNumber,
        frameNumber: this.formData.frameNumber,
        payStatus: this.formData.payStatus,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.supportCarList;
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
      this.getSupportGoldTotalListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getSupportGoldTotalListData();
    },

    // 导出
    exportButton() {
      window.location.href = `/api/${
        common.supportOutputExcelUrl
      }?agentName=${
        this.formData.agentName ? this.formData.agentName : ''
      }&frameNumber=${
        this.formData.frameNumber ? this.formData.frameNumber : ''
      }&batchNumber=${
        this.formData.batchNumber ? this.formData.batchNumber : ''
      }&payStatus=${
        this.formData.payStatus ? this.formData.payStatus : ''}`;
    },

  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.supportGoldTotalList {

}
</style>
