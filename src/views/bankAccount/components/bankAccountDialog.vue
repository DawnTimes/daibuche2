<!--
 * @Author: 廖亿晓
 * @Date: 2020-09-02 15:05:50
 * @LastEditTime: 2020-09-02 17:20:11
 * @LastEditors: your name
 * @Description: 银行账号弹框
 * @FilePath: \webcode2\src\views\bankAccount\components\bankAccountDialog.vue
-->

<template>
  <div class="bankAccountDialog">
    <el-dialog
      width="30%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :title="title"
      :visible.sync="bankAccountFormVisible"
    >
      <el-form
        :model="bankAccountForm"
        ref="bankAccountForm"
        label-width="80px"
        :rules="rules"
        size="medium"
      >
        <el-form-item label="账户名称" prop="bankAccountName">
          <el-input
            maxlength="30"
            v-model="bankAccountForm.bankAccountName"
            :disabled="$formAtReadonly('bankAccountName', formReadonly.readonly)"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="bankAccountNo">
          <el-input
            maxlength="30"
            v-model="bankAccountForm.bankAccountNo"
            :disabled="$formAtReadonly('bankAccountNo', formReadonly.readonly)"
          ></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="bankAccountAddr">
          <el-input
            maxlength="30"
            v-model="bankAccountForm.bankAccountAddr"
            :disabled="$formAtReadonly('bankAccountAddr', formReadonly.readonly)"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            maxlength="200"
            v-model="bankAccountForm.remark"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            :disabled="$formAtReadonly('remark', formReadonly.readonly)"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bankAccountFormVisible = false" size="medium" plain>取 消</el-button>
        <el-button
          type="primary"
          @click="bankAccountSubmit('bankAccountForm')"
          :loading="loading"
          size="medium"
          v-show="!$formAtReadonly('saveBtn', formReadonly.hide)"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'bankAccountDialog',
  props: {
    bankAccountForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formReadonly: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 不要在props定义弹框的显示，不然取消、关闭的时候不会报错，在data里定义，然后利用父组件调用子组件函数的方法显示弹框
    // bankAccountFormVisible: {
    //   type: Boolean,
    //   default: false,
    // },
    loading: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: '',
    },
  },
  components: {},
  data() {
    // 匹配银行卡号
    const checkBankCode = (rule, value, callback) => {
      const reg = /^([1-9]{1})[0-9]+$/;
      if (!value) {
        return callback(new Error('银行账号不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('银行账号格式错误'));
      } else {
        callback();
      }
    };
    return {
      bankAccountFormVisible: false,
      rules: {
        bankAccountName: [
          {
            required: true,
            message: '账户名称不能为空',
            trigger: 'blur',
          },
        ],
        bankAccountAddr: [
          {
            required: true,
            message: '开户行不能为空',
            trigger: 'blur',
          },
        ],
        bankAccountNo: [
          {
            required: true,
            validator: checkBankCode,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.$formAtReadonly('*', this.formReadonly.readonly)) this.rules = {};
  },
  mounted() {},
  methods: {
    // 核销提交
    bankAccountSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 防止重复提交
          if (this.loading === false) {
            this.handleEmitData();
          }
        } else {
          return false;
        }
      });
    },

    // 组件通讯
    handleEmitData() {
      this.$emit('formDataSubmit', {
        data: this.bankAccountForm,
      });
    },

    // 关闭
    // handleColse() {
    //   this.bankAccountFormVisible = false;
    // },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.bankAccountFormVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.bankAccountDialog {
  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 0px 20px 0px 10px;
  }
}
</style>