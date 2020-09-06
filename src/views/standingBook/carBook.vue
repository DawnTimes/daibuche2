<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-17 15:04:15
 * @LastEditTime: 2020-09-03 17:42:46
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\standingBook\carBook.vue
-->

<template>
  <div class="carBook">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="80px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="经销店:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="牌照商:" prop="interfaceName">
          <el-input maxlength="30" v-model="formData.interfaceName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="合同编号:" prop="systemCode">
          <el-input maxlength="30" v-model="formData.systemCode" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="期数:" prop="systemName">
          <el-input maxlength="10" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="车型:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="车架号:" prop="systemName">
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

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" @click="exportButton" v-show="rightControl.export">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table" v-loading="tableLoading" element-loading-text="拼命加载中">
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
        <el-table-column align="center" prop="" label="所属期间" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="经销店" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="牌照商" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="id" label="合同编号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="车型" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="车架号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="车牌号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="发动机号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="期数" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="是否限牌" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="上牌地" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="租赁方式" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="起租日" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="支付日" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="核销状态" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span
              :class="{greenStatus: scope.row.approvalStatus == '', redStatus: scope.row.approvalStatus == '', blueColor: scope.row.approvalStatus == ''}"
            >{{ formatStatus(scope.row.status, paidTemp) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="核销人" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="核销时间" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="是否足额" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="支援金状态" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="反冲状态" show-overflow-tooltip width="100"></el-table-column>

        <el-table-column align="center" prop="" label="本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="管理费" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="手续费" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="应收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="已收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="未收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="应收租金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="应收本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="应收利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="应收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="应收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="已收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="已收本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="已收利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="已收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="已收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="收到日期" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="未收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="未收本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="未收利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="未收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="未收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="融资额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="尾款" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="利率" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="收款账户" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="收款开户行" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="收款账号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="支援金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="差额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="支援金批次" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="支援金申请日期" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <div class="page-layer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 50, 100, 200, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableLoading: false,
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

      // 按钮权限控制
      bankPermission: {
        add: true,
        edit: true,
        detail: true,
        delete: true,
      },
      tableData: [
        { id: 123456, status: '未核销' },
        { id: 123456, status: '全部核销' },
      ],
      tableHeight: 0,
      // 数据字典
      paidTemp: [],

      limitStatus: [
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ],

      // 按钮权限
      rightArray: [9821],
      rightControl: {
        export: false,
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
    queryForm() {
      this.tableLoading = true;
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 导出车辆台账
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
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
</style>

