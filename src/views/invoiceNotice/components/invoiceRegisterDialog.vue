<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 11:28:29
 * @LastEditTime: 2020-08-25 10:08:15
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\invoiceNotice\components\invoiceRegisterDialog.vue
-->

<template>
  <div class="invoiceRegisterDialog">
    <el-dialog
      width="30%"
      :close-on-click-modal="false"
      title="发票登记"
      :visible.sync="invoiceRegisterFormVisible"
    >
      <el-form :model="registerForm" label-width="80px" size="medium">
        <el-form-item label="购方名称">
          <el-input v-model="registerForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="购方税号">
          <el-input v-model="registerForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="registerForm.remark"
            type="textarea"
            maxlength="200"
            disabled
            :autosize="{ minRows: 2, maxRows: 4}"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="开票时间">
          <el-date-picker
            v-model="registerForm.currentTime"
            value-format="yyyy-MM-dd"
            style="width: 100%"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="invoiceRegisterFormVisible = false" plain size="medium">取 消</el-button>
        <el-button type="primary" @click="registerSubmit" :loading="loading" size="medium">登 记</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'invoiceRegisterDialog',
  props: {
    registerForm: {
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
      invoiceRegisterFormVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 登记提交
    registerSubmit() {
      // 防止重复提交
      if (this.loading === false) {
        this.handleEmitData();
      }
    },

    // 组件通讯
    handleEmitData() {
      this.$emit('formDataSubmit', {
        data: this.registerForm,
      });
    },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.invoiceRegisterFormVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.invoiceRegisterDialog {
  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 10px 20px 0px 10px;
  }
}
</style>