<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-10 15:57:36
 * @LastEditTime: 2020-09-07 11:37:16
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\writeOffQuery\carWriteOffQuery.vue
-->
<template>
  <div class="carWriteOffQuery">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="110px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="经销店/牌照商:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>
        <!-- <el-form-item label="牌照商:" prop="interfaceName">
          <el-input maxlength="50" v-model="formData.interfaceName" clearable placeholder></el-input>
        </el-form-item>-->
        <el-form-item label="合同编号:" prop="systemCode">
          <el-input maxlength="30" v-model="formData.systemCode" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="期数:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>

        <el-form-item label="是否限牌:" prop="interfaceName">
          <el-select v-model="formData.value" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in limitStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="车型:" prop="systemCode">
          <el-input maxlength="30" v-model="formData.systemCode" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="车架号:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

        <el-form-item label>
          <el-button type="primary" @click="exportButton" v-show="rightControl.export">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="batchBtn">
      <el-button type="primary" size="small" @click="batchRecoil" v-show="rightControl.recoil">批量反冲</el-button>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        :max-height="tableHeight"
        ref="table"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        :cell-style="{'text-align': 'center', 'height': '40px'}"
        :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
      }"
      >
        <el-table-column width="50" align="center" type="selection" fixed></el-table-column>
        <el-table-column
          width="50"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column align="center" prop label="经销店/牌照商" show-overflow-tooltip width="120"></el-table-column>
        <!-- <el-table-column align="center" prop="" label="牌照商" show-overflow-tooltip width="100"></el-table-column> -->
        <el-table-column align="center" prop="id" label="合同编号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="车型" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="车架号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="车牌号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="发动机号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="期数" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="是否限牌" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="上牌地" show-overflow-tooltip width="100"></el-table-column>
        <!-- <el-table-column align="center" prop="" label="车辆数量" show-overflow-tooltip width="100"></el-table-column> -->
        <el-table-column align="center" prop label="租赁方式" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="支付日" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="核销状态" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span
              :class="{greenStatus: scope.row.approvalStatus == '', redStatus: scope.row.approvalStatus == '', blueColor: scope.row.approvalStatus == ''}"
            >{{ formatStatus(scope.row.status, paidTemp) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop label="核销人" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="核销时间" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="银行单据号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="支援金状态" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="反冲状态" show-overflow-tooltip width="100"></el-table-column>

        <el-table-column align="center" prop label="应收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="应收本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="应收利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="应收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="应收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="已收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="已收本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="已收利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="已收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="已收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="未收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="未收本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="未收利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop label="未收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop label="未收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注" show-overflow-tooltip></el-table-column>

        <el-table-column align="center" label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleRecoil(scope.row)" v-show="rightControl.recoil">反冲</el-button>
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

    <recoilModule
      ref="recoilModule"
      :recoilForm="recoilForm"
      :loading="status.loading"
      v-on:formDataSubmit="formDataSubmit"
    ></recoilModule>
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import recoilModule from '@/components/recoilModule';

export default {
  name: '',
  props: {},
  components: {
    recoilModule,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {},
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
        { id: 123456, status: '未核销' },
        { id: 123456, status: '全部核销' },
      ],
      tableHeight: 100,
      // 数据字典
      paidTemp: [],

      limitStatus: [
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ],

      // 反冲
      recoilForm: {},
      status: {
        loading: false,
      },
      recoilFormVisible: false,

      multipleSelection: [], // 批量选择

      // 按钮权限
      rightArray: [9731, 9732],
      rightControl: {
        export: false,
        recoil: false,
      },
    };
  },
  computed: {},
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

    // 导出车辆核销清单
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
      });
    },

    // 格式化状态
    formatStatus(type, dictTemp = []) {
      let columnValueDesc = '';
      dictTemp.forEach((v) => {
        if (type === v.columnValueCode) {
          return (columnValueDesc = v.columnValueDesc);
        }
      });
      return columnValueDesc;
    },

    // 反冲
    handleRecoil(row) {
      // this.recoilFormVisible = true;
      this.$refs.recoilModule.isShow(true);
    },
    // 反冲提交
    formDataSubmit() {
      // this.status.loading = true;
      this.$refs.recoilModule.isShow(false);
    },

    // 批量选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量反冲
    batchRecoil() {
      if (_.isEmpty(this.multipleSelection)) {
        this.$notify.warning({
          title: '温馨提示',
          message: '请选择需要反冲的车辆',
        });
        return false
      }
      this.$confirm('是否确定反冲选中的车辆?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {})
        .catch(() => {});
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.carWriteOffQuery {
  .batchBtn {
    padding: 0 0 5px 10px;
  }
}
</style>

