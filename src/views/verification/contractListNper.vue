<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-12 10:02:45
 * @LastEditTime: 2020-08-14 18:26:54
 * @LastEditors: your name
 * @Description: 查询合同下所有期数
 * @FilePath: \webcode2\src\views\verification\contractListNper.vue
-->
<template>
  <div class="contractListNper">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="100px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="经销店名称:" prop="systemName">
          <el-input maxlength="30" clearable v-model="formData.systemName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="牌照商名称:" prop="systemName">
          <el-input maxlength="30" clearable v-model="formData.systemName" placeholder=""></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
        <el-form-item label="">
          <el-button @click="backButton" plain>返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
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
          fixed
        ></el-table-column>
        <el-table-column align="center" prop="id" label="合同编号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="经销店名称" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="牌照商名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="上牌地" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="是否限牌" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="期数" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="车辆数量" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="支付日" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="租赁方式" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="核销状态" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span
            :class="{greenStatus: scope.row.approvalStatus == '', redStatus: scope.row.approvalStatus == '', blueColor: scope.row.approvalStatus == '',
            yellowColor: scope.row.approvalStatus == ''}"
            >{{ formatStatus(scope.row.approvalStatus, dictTemp) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="支援金状态" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span
            :class="{greenStatus: scope.row.approvalStatus == '', redStatus: scope.row.approvalStatus == '', blueColor: scope.row.approvalStatus == '',
            yellowColor: scope.row.approvalStatus == ''}"
            >{{ formatStatus(scope.row.approvalStatus, dictTemp) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="应收金额" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="应收本金" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="应收利息" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="应收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="应收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="已收金额" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="已收本金" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="已收利息" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="已收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="已收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="未收金额" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="未收本金" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="未收利息" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="未收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="未收手续费" show-overflow-tooltip width="120"></el-table-column>  
        <el-table-column align="center" prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="200"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleWriteOff(scope.row)">核销</el-button>
            <el-button size="mini" plain @click="handleNper(scope.row)">车辆清单</el-button>
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

    <writeOff-dialog ref="writeOffDialog" :writeOffForm="writeOffForm" :loading='status.loading' v-on:formDataSubmit="formDataSubmit"></writeOff-dialog>
    <nperCarList ref="nperCarListDialog" ></nperCarList>
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import writeOffDialog from './components/writeOffDialog';
import nperCarList from './components/nperCarList';

export default {
  name: '',
  props: {

  },
  components: {
    writeOffDialog,
    nperCarList,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        
      },
      tableData: [
        {id: '111', }
      ],

      // 数据字典
      dictTemp: [],
      tableHeight: 0,

      writeOffForm: {},
      status: {
        loading: false,
      }
    };
  },
  computed: {

  },
  watch: {

  },
  created() {
    
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

    // 返回
    backButton() {
      this.$router.push({
        path: '/bankWaterList',
      })
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

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    },

    // 返回
    handleBack() {
      this.$router.push({
        path: '/writeOffContractList',
      });
    },

    // 核销弹框
    handleWriteOff(row) {
      this.$refs.writeOffDialog.isShow(true);
    },

    // 车辆清单
    handleNper(row) {
      // this.$router.push({
      //   path: '/nperCarList',
      // });
      this.$refs.nperCarListDialog.isShow(true);
    },

    // 核销确定
    formDataSubmit(data) {
      this.$refs.writeOffDialog.isShow(false);
    },
  },
  filters: {
    function() {

    },
  },
};
</script>

<style scoped lang="scss">
  .contractListNper {
    .backButton {
      padding: 20px;
    }
  }
</style>
