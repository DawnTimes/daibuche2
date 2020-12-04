<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 15:15:46
 * @LastEditTime: 2020-12-02 12:55:16
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\invoiceNotice\components\createInvoiceDialog.vue
-->


<template>
  <div class="createInvoiceDialog">
    <el-dialog
      width="30%"
      :close-on-click-modal="false"
      title="生成开票明细"
      :visible.sync="createInvoiceFormVisible"
      :destroy-on-close="true"
    >
      <el-form
        :model="invoiceForm"
        ref="invoiceForm"
        :rules="rules"
        label-width="80px"
        size="medium"
      >
        <!-- <el-form-item label="登记人">
          <el-input v-model="invoiceForm.userId" disabled></el-input>
        </el-form-item>-->
        <el-form-item label="申请日期" prop="applyDate">
          <el-date-picker
            v-model="invoiceForm.applyDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 80%"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="生成日期" prop="applyDate">
          <el-date-picker
            v-model="invoiceForm.applyDate"
            value-format="yyyy-MM-dd"
            type="date"
            :picker-options="pickerOptionsDate"
            placeholder="选择日期"
            style="width: 80%"
          ></el-date-picker>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createInvoiceFormVisible = false" plain size="medium">取 消</el-button>
        <el-button
          type="primary"
          @click="invoiceFormSubmit('invoiceForm')"
          :loading="loading"
          size="medium"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'createInvoiceDialog',
  props: {
    invoiceForm: {
      type: Object,
      default: () => {
        return {};
      },
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      createInvoiceFormVisible: false,
      pickerOptionsDate: {
        disabledDate: (time) => {
          var date = new Date(time);
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          var currentDate = new Date();
          var currentMonth = currentDate.getMonth() + 1;
          var currentYear = currentDate.getFullYear();
          // 只能选择每月5号,并且大于当前月的不能选
          // return day != 5

          if (year > currentYear) {
            return true;
          } else if ((year = currentYear)) {
            if (month <= currentMonth) {
              if (day != 5) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          }
        },
      },
      rules: {
        applyDate: [
          {
            required: true,
            message: '请选择生成日期',
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 登记提交
    invoiceFormSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$notify.warning({
            title: '温馨提示',
            message: '请正确填写表单',
          });
          return;
        }

        // 防止重复提交
      if (this.loading === false) {
        this.handleEmitData();
      }
      });
    },

    // 组件通讯
    handleEmitData() {
      this.$emit('createInvoiceSubmit', {
        data: this.invoiceForm,
      });
    },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.createInvoiceFormVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.createInvoiceDialog {
  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 10px 20px 0px 10px;
  }
}
</style>