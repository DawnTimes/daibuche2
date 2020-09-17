<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-18 11:23:35
 * @LastEditTime: 2020-09-16 13:49:04
 * @LastEditors: your name
 * @Description: 经销店弹窗
 * @FilePath: \webcode2\src\views\supportGold\components\dealerTableDialog.vue
-->


<template>
  <div class="dealerTableDialog">
    <el-dialog width="80%" :close-on-click-modal="false" title :visible.sync="dealerFormVisible">
      <el-form :model="dealerForm" label-width="100px" :inline="true" size="medium">
        <el-form-item label="经销店名称">
          <el-input v-model="dealerForm.name" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dealerSubmit" size="medium">查 询</el-button>
        </el-form-item>

        <div class="table">
          <el-table
            :data="dealerTableData"
            border
            stripe
            height="500"
            @selection-change="handleSelectionChange"
            ref="table"
            style="width: 100%"
            :header-cell-style="{
              'text-align':'center',
              'font-weight':'bold',  
              'background':'#627CAF',    
              'color': '#fff',
            }"
          >
            <el-table-column width="50" align="center" label type="selection" fixed></el-table-column>
            <el-table-column width="50" align="center" label="序号" type="index" fixed></el-table-column>
            <el-table-column
              align="center"
              prop="id"
              label="经销店代码"
              show-overflow-tooltip
              width="120"
            ></el-table-column>
            <el-table-column prop label="经销店名称" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop label="经销店类型" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop label="期数" show-overflow-tooltip></el-table-column>
            <el-table-column prop label="车辆数量" show-overflow-tooltip></el-table-column>
            <el-table-column
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
            ></el-table-column>
          </el-table>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dealerFormVisible = false" size="medium" plain>取 消</el-button>
        <el-button type="primary" @click="dealerSubmit" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      dealerFormVisible: false,
      dealerTableData: [{ id: '123' }, { id: '56523' }, { id: '1266543' }],
      tableHeight: 100,
      multipleSelection: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
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

    // 组件通讯
    handleEmitData() {
      const params = this.multipleSelection;
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
    padding: 20px 10px 10px 10px;
  }

  .el-dialog__header {
    padding: 0;
  }
}
</style>