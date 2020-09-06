<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 15:27:34
 * @LastEditTime: 2020-08-19 16:15:49
 * @LastEditors: your name
 * @Description: 登记弹窗
 * @FilePath: \webcode2\src\views\supportGold\components\registerDialog.vue
-->


<template>
  <div class="registerDialog">
    <el-dialog
      width="30%"
      :close-on-click-modal="false"
      title="支援金支付登记"
      :visible.sync="registerFormVisible"
    >
      <el-form :model="registerForm" label-width="100px" size="medium">
        <el-form-item label="批次号">
          <el-input v-model="registerForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="支付登记人">
          <el-input v-model="registerForm.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="支付登记时间">
          <el-date-picker
            v-model="registerForm.currentTime"
            value-format="yyyy-MM-dd"
            style="width: 100%"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="registerForm.name"
            type="textarea"
            maxlength="300"
            :autosize="{ minRows: 3, maxRows: 4}"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerFormVisible = false" plain size="medium">取 消</el-button>
        <el-button type="primary" @click="registerSubmit" :loading="loading" size="medium">登 记</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'registerDialog',
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
      registerFormVisible: false,
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
      this.registerFormVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.registerDialog {
  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 10px 20px 0px 10px;
  }
}
</style>
