<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 16:47:59
 * @LastEditTime: 2020-09-04 09:30:05
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\supportGoldApprovalList.vue
-->

<template>
  <div class="supportGoldApprovalList">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="90px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="支援金月份:" prop="systemName">
          <el-date-picker
            v-model="formData.value1"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="期数:" prop="interfaceName">
          <el-input maxlength="50" v-model="formData.interfaceName" clearable placeholder></el-input>
        </el-form-item> -->
        <el-form-item label="批次号:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
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
        <el-table-column align="center" prop="month" label="支援金月份" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="期数" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="批次号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="batch" label="批次" show-overflow-tooltip></el-table-column>
        
        <el-table-column align="center" prop="" label="店数" show-overflow-tooltip></el-table-column> -->
        <el-table-column align="center" prop="" label="车辆数" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="审批状态" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="申请人" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="申请时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="备注" show-overflow-tooltip></el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click="handleApproval(scope.row)" v-show="rightControl.approval">审批</el-button> -->
            <el-button type="primary" size="mini" @click="handleApproval(scope.row)">审批</el-button>
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

export default {
  name: '',
  props: {

  },
  components: {
    
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        
      },

      tableData: [
        { month: '2020-07', batch: '第一批' },
        { month: '2020-08', batch: '第三批' },
      ],
      tableHeight: 100,
      appravolStatus: [],
      
      // 按钮权限
      rightArray: [9631, 9632], // 会计初级审批、资管负责人审批
      rightControl: {
        approval: false,
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
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 120
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

    // 审批
    handleApproval(row) {
      this.$router.push({
        path: '/supportGoldApprovaled',
        query: {
          month: row.month,
          batch: row.batch,
        },
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
  .supportGoldApprovalList {
    
  }
</style>
