<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-17 16:49:12
 * @LastEditTime: 2020-10-10 15:44:24
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\supportGoldApply.vue
-->

<template>
  <div class="supportGoldApply">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="90px"
        size="small"
        ref="ruleForm"
      >
        <!-- <el-form-item label="支援金月份:" prop="systemName">
          <el-date-picker
            v-model="formData.value1"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月份"
          ></el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="期数:" prop="interfaceName">
          <el-input maxlength="50" v-model="formData.interfaceName" clearable placeholder></el-input>
        </el-form-item> -->
        <el-form-item label="批次号:" prop="batchNumber">
          <el-input maxlength="30" v-model="formData.batchNumber" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="审批状态:" prop="approvalStatus">
          <el-select v-model="formData.approvalStatus" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in appravolStatus"
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
          <el-button type="primary" @click="handleCreate" v-show="rightControl.add" >申请支援金</el-button>
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
        <el-table-column prop="Batch" label="批次" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="店数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="carNum" label="车辆数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="month" label="审批状态" show-overflow-tooltip>
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
        <el-table-column prop="" label="支付状态" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.payStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="支付登记人" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="" label="支付登记时间" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleRegister(scope.row)" v-if="rightControl.register">登记</el-button>
            <el-button size="mini" @click="handleDetail(scope.row)" v-if="rightControl.detail">详情</el-button>
            <!-- <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
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

    <confirmBox
      v-if="showDeleteBox"
      :msgConfirBox="deleteInfoText"
      v-on:submitForm="deleteSubmit"
      v-on:cancelbox="cancelBack"
    ></confirmBox>

    <!-- 登记弹框 -->
    <register-dialog
      ref="registerDialog"
      :registerForm="registerForm"
      :loading="status.loading"
      @formDataSubmit="formDataSubmit"
    ></register-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import confirmBox from '@/components/confirmBox'; // 删除弹框
import registerDialog from './components/registerDialog'; // 登记弹框

import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: '',
  props: {},
  components: {
    confirmBox,
    registerDialog,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        batchNumber: '',
        approvalStatus: '',
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
      status: {
        loading: false,
      },

      // 按钮权限
      rightArray: [9621, 9622, 9623],
      rightControl: {
        add: false,
        register: false,
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
    this.getSupportGoldApplyListData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getSupportGoldApplyListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getSupportGoldApplyListData();
    },

    // 申请支援金
    handleCreate() {
      this.$router.push({
        path: '/createSupportGoldApply',
      });
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getSupportGoldApplyListData() {
      this.tableLoading = true;
      const url = common.supportApplyListUrl;
      const params = {
        batchNumber: this.formData.batchNumber,
        approvalStatus: this.formData.approvalStatus,
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
      this.getSupportGoldApplyListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getSupportGoldApplyListData();
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

    // 删除
    handleDelete(row) {
      this.showDeleteBox = true;
      this.deleteId = row.id;
    },

    // 删除提交
    deleteSubmit() {
      // const url = common.systemDeleteUrl;
      // const data = {
      //   id: this.deleteId
      // };
      // axios.post(url, data).then(res => {
      //   if (res.code === '0') {
      //     this.$notify.success({
      //       title: '温馨提示！',
      //       message: '删除成功！'
      //     });
      //     this.showDeleteBox = false;
      //     this.getSystemListData();
      //   } else {
      //     this.$notify.error({
      //       title: '温馨提示！',
      //       message: '删除失败！'
      //     });
      //   }
      // });
    },

    // 取消删除
    cancelBack() {
      this.showDeleteBox = false;
    },

    // 登记弹窗
    handleRegister(row) {
      this.registerForm.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.registerForm.userId = this.userId;
      this.registerForm.id = row.id;
      this.$refs.registerDialog.isShow(true);
    },

    // 登记确定
    formDataSubmit(obj) {
      const data = obj.data;
      const url = common.supportRegisterUrl;
      this.status.loading = true;
      axios.post(url, data).then((res) => {
        if (res.ec === '0') {
          this.status.loading = true;
          this.$notify.success({
            title: '温馨提示！',
            message: '登记成功',
          });
          this.$refs.registerDialog.isShow(false);
        } else {
          this.status.loading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '登记失败',
          });
        }
      }).catch((err) => {
        this.status.loading = false;
        this.$notify.error({
          title: '温馨提示！',
          message: err ? err.em : '登记失败'
        });
      })
      
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.supportGoldApply {
}
</style>
