<!--
 * @Author: 廖亿晓
 * @Date: 2020-11-26 17:59:31
 * @LastEditTime: 2020-12-02 15:02:34
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\invoiceNotice\components\invoiceContractInfo.vue
-->

<template>
  <div class="invoiceContractInfo">
    <el-dialog width="90%" destroy-on-close :close-on-click-modal="false" title :visible.sync="invoiceFormVisible">
      <el-form :model="paramForm" :inline="true" size="mini">
        <el-form-item label="备注" prop="remark">
          <el-input maxlength="200" v-model="paramForm.remark" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryForm">查 询</el-button>
        </el-form-item>
      </el-form>
      <div class="table">
      <el-table
        :data="incioceTableData"
        v-loading="tableLoading" 
        element-loading-text="拼命加载中"
        border
        stripe
        ref="tableChirld"
        style="width: 100%"
        max-height="430px"
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
        <el-table-column prop="billingNo" label="单据号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="applyDate" label="生成时间" show-overflow-tooltip width="100">
          <template slot-scope="scope">
          <span>{{ scope.row.applyDate | timeFormat }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="380" show-overflow-tooltip></el-table-column>
        <el-table-column prop="buyName" label="购方名称" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="buyCreditCode" label="购方税号" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="buyAddTel" label="购方地址电话" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="buyBankNameNo" label="购方银行帐号" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="sellName" label="销方名称" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="sellBankNameNo" label="销方银行帐号" show-overflow-tooltip width="200"></el-table-column>
        
        <el-table-column prop="tradeName" label="商品名称" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="num" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="amount" label="金额" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.amount | moneyFormat }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="tax" label="税率" show-overflow-tooltip></el-table-column>
        <el-table-column prop="receiverAddr" label="接收人邮件" show-overflow-tooltip width="160"></el-table-column>
        <el-table-column
          prop="isOpen"
          label="是否开票"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span :class="{ greenStatus: scope.row.isOpen == 'Y' , redStatus: scope.row.isOpen == 'N' }">{{ scope.row.isOpen | isOpenStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="invoiceNumber"
          label="发票号码"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          prop="invoiceDate"
          label="发票开具时间"
          show-overflow-tooltip
          width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              :disabled="scope.row.isOpen == 'Y'"
              v-show="rightControl.delete"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
    </div>
      <div class="page-layer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="invoiceFormVisible = false" size="small" plain>关 闭</el-button>
        <!-- <el-button type="primary" @click="invoiceSubmit" size="small">确 定</el-button> -->
      </div>
    </el-dialog>

    <!-- 删除提示 -->
    <deleteConfirmBox
      v-if="showDeleteBox"
      :msgConfirBox="deleteInfoText"
      :loading="status.deleteLoading"
      v-on:submitForm="deleteSubmit"
      v-on:cancelbox="cancelBack"
    ></deleteConfirmBox>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import moment from 'moment';
import { mapState } from 'vuex';
import deleteConfirmBox from '@/components/confirmBox';  // 删除弹框


export default {
  name: 'invoiceContractInfo',
  props: {
    oldContractId: {
      type: String,
      default: '',
    },
    // incioceTableData: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // },
    // tableLoading: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  components: {
    deleteConfirmBox,
  },
  data() {
    return {
      pageSize: 5,
      pageNum: 1,
      total: 0,
      paramForm: {
        oldContractId: '',
        remark: '',
        pageSize: 5,
        pageNum: 1,
      },

      invoiceFormVisible: false,
      incioceTableData: [],
      tableLoading: false,

      registerForm: {},
      status: {
        deleteLoading: false,
      },

      // 按钮权限
      rightArray: [9931],
      rightControl: {
        delete: false,
      },

      // 删除提示文本
      deleteInfoText: {
        icon: 'icon-jinggao',
        confirst: '确认删除该开票明细？',
        consecond: '警告：删除后不可恢复！'
      },
      // 删除框显示
      showDeleteBox: false,
      // 删除的系统ID
      deleteId: null,

    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
    }),
  },
  watch: {
    invoiceFormVisible(val) {
      if (val) {
        this.getInvoiceContractInfoListData();
      }
    }
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
    // this.getInvoiceContractInfoListData();
  },
  methods: {
    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.invoiceFormVisible = isVisible;
    },
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.paramForm.pageNum = 1;
      this.getInvoiceContractInfoListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getInvoiceContractInfoListData() {
      this.incioceTableData = [];
      const url = common.queryDeleteInvoicetUrl;
      const params = {
        oldContractId   : this.oldContractId,
        remark          : this.paramForm.remark.trim(),
        turnPageBeginPos: this.paramForm.pageNum,
        turnPageShowNum : this.paramForm.pageSize,
      };
      this.tableLoading = true;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.incioceTableData = data.invoiceList;
          this.total = data.turnPageTotalNum * 1;
          this.tableLoading = false;
          // 经租直租默认税率13%
          if (!_.isEmpty(this.incioceTableData)) {
            this.incioceTableData.forEach((item) => {
              item.tax = 0.13
            })
          }
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
      this.paramForm.pageNum = 1;
      this.pageSize = val;
      this.paramForm.pageSize = val;
      this.getInvoiceContractInfoListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.paramForm.pageNum = (val - 1) * this.pageSize + 1;
      this.getInvoiceContractInfoListData();
    },

    // 删除弹框
    handleDelete(row) {
      this.showDeleteBox = true;
      this.deleteId = row.id;
    },

    // 确定删除
    deleteSubmit() {
      this.status.deleteLoading = true;
      const url = common.invoceDeleteUrl;
      const data = {
        id: this.deleteId
      };
      axios.post(url, data).then(res => {
        if (res.ec === '0') {
          this.$notify.success({
            title: '温馨提示！',
            message: '删除成功！'
          });
          this.status.deleteLoading = false;
          this.showDeleteBox = false;
          this.getInvoiceContractInfoListData();
        } else {
          this.status.deleteLoading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '删除失败！'
          });
        }
      }).catch((err) => {
        this.status.deleteLoading = false;
        this.$notify.error({
          title: '温馨提示！',
          message: err.em || err.message || err.error || '删除失败！'
        });
      });
    },

    // 取消删除
    cancelBack() {
      this.showDeleteBox = false;
    },

  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.invoiceContractInfo {
  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 20px 10px 10px 10px;
  }

  .el-dialog__header {
    padding: 0;
  }
  
}

.invoiceContractInfo .el-form-item--mini.el-form-item {
    margin-bottom: 10px;
}

.invoiceContractInfo .el-dialog__footer {
  padding: 0px 0px 20px;
}

// .invoiceContractInfo .el-table td {
//   padding: 6px 0;
// }

// .invoiceContractInfo .el-table .cell {
//   font-size: 10px;
// }
</style>
