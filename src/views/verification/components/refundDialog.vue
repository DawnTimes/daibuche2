<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 13:38:39
 * @LastEditTime: 2020-11-04 17:00:39
 * @LastEditors: your name
 * @Description: 退款弹框
 * @FilePath: \webcode2\src\views\verification\components\refundDialog.vue
-->
<template>
  <div class="refundDialog">
    <el-dialog
      width="30%"
      :close-on-click-modal="false"
      title="退款"
      :visible.sync="refundFormVisible"
      :destroy-on-close="true"
    >
      <el-form
        :model="refundForm"
        ref="refundForm"
        :rules="rules"
        label-width="120px"
        size="medium"
      >
        <el-form-item label="银行单据号" prop>
          <el-input v-model="refundForm.serialNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="汇款账户名称" prop>
          <el-input v-model="refundForm.sideAccountName" disabled></el-input>
        </el-form-item>
        <el-form-item label="汇款账号" prop>
          <el-input v-model="refundForm.sideAccount" disabled></el-input>
        </el-form-item>
        <el-form-item label="最大可退金额" prop>
          <el-input v-model="refundForm.notVerLines" disabled></el-input>
        </el-form-item>
        <el-form-item label="退款金额" prop="refund">
          <el-input v-model="refundForm.refund"></el-input>
        </el-form-item>
        <!-- <el-form-item label="备注">
          <el-input v-model="refundForm.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundFormVisible = false" size="medium" plain>取 消</el-button>
        <el-button
          type="primary"
          @click="refundSubmit('refundForm')"
          :loading="loading"
          size="medium"
        >退 款</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    refundForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 不要在props定义弹框的显示，不然取消、关闭的时候不会报错，在data里定义，然后利用父组件调用子组件函数的方法显示弹框
    // refundFormVisible: {
    //   type: Boolean,
    //   default: false,
    // },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    // 验证数字且最多2位小数
    const checkNumber = (rule, value, callback) => {
      const reg = /^\d+(\.\d{1,2})?$/;
      if (!value) {
        return callback(new Error('退款金额不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('退款金额格式错误'));
      } else {
        callback();
      }
    };
    return {
      refundFormVisible: false,
      rules: {
        refund: [
          {
            required: true,
            validator: checkNumber,
            trigger: 'blur',
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
    // 核销提交
    refundSubmit(formName) {
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
        data: this.refundForm,
      });
    },

    // 关闭
    // handleColse() {
    //   this.refundFormVisible = false;
    // },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.refundFormVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.refundDialog {
  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 0px 20px 0px 10px;
  }
}
</style>