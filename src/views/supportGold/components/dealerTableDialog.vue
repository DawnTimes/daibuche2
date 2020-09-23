<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-18 11:23:35
 * @LastEditTime: 2020-09-22 17:30:34
 * @LastEditors: your name
 * @Description: 经销店弹窗
 * @FilePath: \webcode2\src\views\supportGold\components\dealerTableDialog.vue
-->


<template>
  <div class="dealerTableDialog">
    <el-dialog width="80%" :close-on-click-modal="false" title :visible.sync="dealerFormVisible">
      <el-form :model="paramForm" label-width="100px" :inline="true" size="medium">
        <el-form-item label="经销店名称">
          <el-input v-model="paramForm.agentName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dealerQuery" size="medium">查 询</el-button>
        </el-form-item>

        <div class="table">
          <el-table
            :data="dealerTableData"
            border
            stripe
            max-height="430"
            @selection-change="handleSelectionChange"
            :row-key="getRowKeys"
            ref="table"
            style="width: 100%"
            :header-cell-style="{
              'text-align':'center',
              'font-weight':'bold',  
              'background':'#627CAF',    
              'color': '#fff',
            }"
          >
            <el-table-column width="50" align="center" label type="selection" :reserve-selection="true" fixed></el-table-column>
            <el-table-column width="50" align="center" label="序号" type="index" fixed></el-table-column>
            <el-table-column
              prop="agentCode"
              label="经销店代码"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="agentShortName" label="经销店简称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="agentFullName" label="经销店名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isGacShop" label="是否商贸" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.isGacShop | flagValue }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="" label="车辆数量" show-overflow-tooltip></el-table-column> -->
            <!-- <el-table-column
              prop
              :label="getMonthTotal(2)"
              show-overflow-tooltip
              width="140"
            ></el-table-column>
            <el-table-column
              prop
              :label="getMonthTotal(3)"
              show-overflow-tooltip
              width="140"
            ></el-table-column>
            <el-table-column
              prop
              :label="getMonth(2)"
              show-overflow-tooltip
              width="120"
            ></el-table-column>
            <el-table-column
              prop
              :label="getMonth(3)"
              show-overflow-tooltip
              width="120"
            ></el-table-column>
            <el-table-column
              prop
              :label="getMonth(4)"
              show-overflow-tooltip
              width="120"
            ></el-table-column>
            <el-table-column
              prop
              :label="getMonth(5)"
              show-overflow-tooltip
              width="120"
            ></el-table-column> -->
          </el-table>
        </div>
      </el-form>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dealerFormVisible = false" size="medium" plain>取 消</el-button>
        <el-button type="primary" @click="dealerSubmit" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';

export default {
  name: '',
  props: {
    dealerForm: {
      type: Object,
      default: () => {
        return {};
      },

      currentMonth: {
        type: String,
        default: null,
      },

      selectDealerArr: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
  },
  components: {},
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      dealerFormVisible: false,
      dealerTableData: [],
      tableHeight: 100,
      multipleSelection: [],
      paramForm: {
        agentCode2: '',
        agentName: '',
        isGacShop: '',
        socialCreditCode: '',
        status: '',
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getDealerListData();
  },
  methods: {
    getMonthTotal(num) {
      // 判断this.currentMonth - num 是否小于等于 0，小于等于则是上一年，需 +12
      return this.dealerForm.currentMonth
        ? '截止' +
            (this.dealerForm.currentMonth - num <= 0
              ? this.dealerForm.currentMonth - num + 12
              : this.dealerForm.currentMonth - num) +
            '月总欠款'
        : `截止n-${num}月总欠款`;
    },

    // 设置欠款月份
    getMonth(num) {
      // 判断this.currentMonth - num 是否小于等于 0，小于等于则是上一年，需 +12
      return this.dealerForm.currentMonth
        ? (this.dealerForm.currentMonth - num <= 0
            ? this.dealerForm.currentMonth - num + 12
            : this.dealerForm.currentMonth - num) + '月欠款'
        : `n-${num}月欠款`;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 选择经销店确定
    dealerSubmit() {
      this.handleEmitData();
    },

    // 获取row的key值, element-ui多选框reserve-selection指定row-key保留数据更新之前的数据(切换页码，保留选中的选项)
    getRowKeys(row) {
      return row.agentId;
    },

    // 组件通讯
    handleEmitData() {
      const params = [];
      if (this.multipleSelection) {
        this.multipleSelection.forEach((item) => {
          params.push({
            agId: item.agentId,
            agentCode: item.agentCode,
            agentShortName: item.agentShortName,
            agentFullName: item.agentFullName,
            isGacShop: item.isGacShop,
          })
        });
      }
      // const params = this.multipleSelection;
      console.log(params);
      this.$emit('formDataSure', {
        data: params,
      });
    },

    // 关闭
    // handleColse() {
    //   this.dealerFormVisible = false;
    // },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.dealerFormVisible = isVisible;
      this.getMonthTotal();
    },

    // 查询
    dealerQuery() {
      this.getDealerListData();
    },

    // 经销店分页
    getDealerListData() {
      const url = common.agentListUrl;
      const params = {
        agentCode2: this.paramForm.agentCode2,
        agentName: this.paramForm.agentName,
        isGacShop: this.paramForm.isGacShop,
        socialCreditCode: this.paramForm.socialCreditCode,
        status: this.paramForm.status,
        turnPageBeginPos: this.paramForm.pageNum,
        turnPageShowNum: this.paramForm.pageSize,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.dealerTableData = data.agentList;
          this.total = data.turnPageTotalNum * 1;
        }
      })
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.paramForm.pageNum = 1;
      this.pageSize = val;
      this.paramForm.pageSize = val;
      this.getDealerListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.paramForm.pageNum = (val - 1) * this.pageSize + 1;
      this.getDealerListData();
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.dealerTableDialog {
  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 10px 10px 10px 10px;
  }

  .el-dialog__header {
    padding: 0;
  }
}
</style>